const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');
const searchCollection = require('./search-collection');
const uploadFile = require('./upload-file');


module.exports = {
    ...dbValidators,
    ...generateJWT,
    ...googleVerify,
    ...searchCollection,
    ...uploadFile,
}