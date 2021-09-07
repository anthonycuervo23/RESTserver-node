const { Router } = require('express');
const { check, query, body } = require('express-validator');

const { getProducts,
        getProductByID,
        createProduct,
        updateProduct,
        removeProduct,
        deleteProduct,
         } = require('../controllers/products.controller');

const { checkCategoryIdExist, 
        checkQueryLimit, 
        checkQueryFrom, 
        checkProductIdExist} = require('../helpers/db-validators');

const { validateField,
        validateJWT,
        validRole,
        isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', [
    query('limit').custom(checkQueryLimit),
    query('from').custom(checkQueryFrom),
    validateField
], getProducts);

router.get('/:id', [
    check('id', 'Product ID not valid').isMongoId(),
    check('id').custom(checkProductIdExist),
    validateField
], getProductByID);

router.post('/', [
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'Product name is required').not().isEmpty(),
    body('category', 'Category ID not valid').isMongoId(),
    body('category').custom(checkCategoryIdExist),
    validateField,
], createProduct);

router.put('/:id', [
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Product ID not valid').isMongoId(),
    check('id').custom(checkProductIdExist),
    validateField
], updateProduct);

router.delete('/:id', [
    validateJWT,
    //isAdminRole,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Product ID not valid').isMongoId(),
    check('id').custom(checkProductIdExist),
    validateField
], removeProduct);

router.delete('/delete/:id', [
    validateJWT,
    isAdminRole,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Category ID not valid').isMongoId(),
    check('id').custom(checkProductIdExist),
    validateField
], deleteProduct);




module.exports = router;