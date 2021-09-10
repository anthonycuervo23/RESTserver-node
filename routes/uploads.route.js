const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers/db-validators');
const { validateField, 
        validateUploadFile, 
        validateJWT, 
        validRole } = require('../middlewares');

const router = Router();


router.post('/', [
    validateUploadFile, 
    validateJWT, 
    validateField], uploadFile);

router.put('/:collection/:id', [
    validateUploadFile,
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'ID not valid').isMongoId(),
    check('collection').custom((collection) => allowedCollections(collection, ['users', 'products'])),
    validateField,
], updateImageCloudinary)
//], updateImage)

router.get('/:collection/:id', [
    validateJWT,
    validRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'ID not valid').isMongoId(),
    check('collection').custom((collection) => allowedCollections(collection, ['users', 'products'])),
    validateField,
], showImage)

module.exports = router;