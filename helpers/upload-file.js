const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uploadFileHelper = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) => {

        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[ splitName.length - 1 ];
    
        //Validate the file extension    
        if(!validExtensions.includes(extension)){
            return reject(`File Extension ${extension} is not allowed - Valid Extensions: ${validExtensions}`);
        }
    
        const tempFileName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, tempFileName);
    
        file.mv(uploadPath, (err) => {
            if (err){
                return reject(err);
            }
    
            resolve(tempFileName);
        });
    });

}

module.exports = {
    uploadFileHelper
}