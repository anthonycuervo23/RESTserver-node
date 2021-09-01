const { Router } = require('express');
const { check } = require('express-validator');
const { isValidRole, checkEmailExist, checkUserIdExist } = require('../helpers/db-validators');
const {validation} = require('../middlewares/validations');
const { usersGet, 
        usersPost, 
        usersPatch, 
        usersDelete, 
        usersPut } = require('../controllers/user.controller');

const router = Router();

router.get('/', usersGet);

router.post('/', [
        check('email', 'Email not valid').isEmail(),
        check('email').custom(checkEmailExist),
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required and must have at least 6 characters').isLength({min: 6}),
        // check('role', 'This is not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE', 'SALES_ROLE']),
        check('role').custom(isValidRole),
        validation
] ,usersPost);

router.put('/:id', [
        check('id', 'user ID not valid').isMongoId(),
        check('id').custom(checkUserIdExist),
        check('role').custom(isValidRole),
        validation
], usersPut);

router.patch('/', usersPatch);

router.delete('/', usersDelete);






module.exports = router;