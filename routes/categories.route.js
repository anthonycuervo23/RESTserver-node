const { Router } = require('express');
const { check, query } = require('express-validator');
const { createCategory,
        getCategories,
        getCategoryByID } = require('../controllers/categories.controller');

const { validateField, validateJWT, } = require('../middlewares/');
const { checkQueryFrom, checkQueryLimit, checkCategoryIdExist } = require('../helpers/db-validators')

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

//Create category - private - only with JWT
router.post('/', [
    validateJWT,
    check('name', 'Category name is required').not().isEmpty(),
    validateField,
], createCategory);

//Update category by ID - private - only with JWT
router.put('/:id', (req, res) => {
    res.json({
        msg: 'category Put'
    })
});

//Remove category by ID - private - only Admin or Sales
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'category Remove'
    })
});

//Delete category by ID from DB - private - only Admin
router.delete('/delete/:id', (req, res) => {
    res.json({
        msg: 'category Delete'
    })
});


module.exports = router;