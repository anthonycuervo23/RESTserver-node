const { Router } = require('express');
const { check, query } = require('express-validator');

const { createCategory,
        getCategories,
        getCategoryByID,
        updateCategory,
        removeCategory,
        deleteCategoryDB } = require('../controllers/categories.controller');

const { validateField, 
        validateJWT, 
        isAdminRole, 
        validRole} = require('../middlewares/');

const { checkQueryFrom, 
        checkQueryLimit, 
        checkCategoryIdExist } = require('../helpers/db-validators')

const router = Router();

//Get all the categories - public path
router.get('/', [
    query('limit').custom(checkQueryLimit),
    query('from').custom(checkQueryFrom),
    validateField
], getCategories);

//Get specific category by ID - public
router.get('/:id', [
    check('id', 'Category ID not valid').isMongoId(),
    check('id').custom(checkCategoryIdExist),
    validateField
], getCategoryByID);

//Create category - private - only with JWT and ADMIN or SALES roles
router.post('/', [
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'Category name is required').not().isEmpty(),
    validateField,
], createCategory);

//Update category by ID - private - only with JWT and ADMIN or SALES roles
router.put('/:id', [ 
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Category ID not valid').isMongoId(),
    check('id').custom(checkCategoryIdExist),
    check('name', 'Category name is required').not().isEmpty(),
    validateField
], updateCategory);

//Remove category by ID - private - only with JWT and ADMIN or SALES roles
router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Category ID not valid').isMongoId(),
    check('id').custom(checkCategoryIdExist),
    validateField
], removeCategory);

//Delete category by ID from DB - private - only with JWT and ADMIN role
router.delete('/delete/:id', [
    validateJWT,
    isAdminRole,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Category ID not valid').isMongoId(),
    check('id').custom(checkCategoryIdExist),
    validateField
], deleteCategoryDB);


module.exports = router;