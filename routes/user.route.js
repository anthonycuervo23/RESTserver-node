const { Router } = require('express');
const { check, query } = require('express-validator');

const { isValidRole, 
        checkEmailExist, 
        checkUserIdExist, 
        checkQueryLimit,
        checkQueryFrom } = require('../helpers/db-validators');

const { isAdminRole, 
        validRole, 
        validateField, 
        validateJWT} = require('../middlewares');   
             
const { usersGet, 
        usersPost, 
        usersPatch, 
        usersDelete,
        usersDeleteDB, 
        usersPut } = require('../controllers/user.controller');

const router = Router();

router.get('/', [
        query('limit').custom(checkQueryLimit),
        query('from').custom(checkQueryFrom),
        validateField
], usersGet);

router.post('/', [
        check('email', 'Email not valid').isEmail(),
        check('email').custom(checkEmailExist),
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required and must have at least 6 characters').isLength({min: 6}),
        // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']),
        check('role').custom(isValidRole),
        validateField
] ,usersPost);

router.put('/:id', [
        check('id', 'user ID not valid').isMongoId(),
        check('id').custom(checkUserIdExist),
        check('role').custom(isValidRole),
        validateField
], usersPut);

router.patch('/', usersPatch);

router.delete('/:id', [
        validateJWT,
        isAdminRole,
        validRole('ADMIN_ROLE', 'SALES_ROLE'),
        check('id', 'user ID not valid').isMongoId(),
        check('id').custom(checkUserIdExist),
        validateField
], usersDelete);

router.delete('/delete/:id', [
        validateJWT,
        isAdminRole,
        check('id', 'user ID not valid').isMongoId(),
        check('id').custom(checkUserIdExist),
        validateField
], usersDeleteDB);






module.exports = router;