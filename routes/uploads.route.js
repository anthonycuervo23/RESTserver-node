const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFile } = require('../controllers/uploads.controller');
const { validateField } = require('../middlewares');

const router = Router();


router.post('/', [], uploadFile);

module.exports = router;