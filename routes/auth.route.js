const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controller');

const {validateField} = require('../middlewares/validate-fields');

const router = Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateField
], login);

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    validateField
], googleSignIn);

module.exports = router;