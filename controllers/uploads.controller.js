const { response, request } = require('express');
const { uploadFileHelper } = require('../helpers/upload-file');



const uploadFile = async(req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({
            msg: 'No files to upload'
        });
        return;
    }
    
    try {
        //we can do it like this to change the folder name, and if we also want
        //to change the extensiones we pass an array with extensions where it says undefined.
        //const fileName = await uploadFileHelper(req.files, undefined, 'imgs');
        const fileName = await uploadFileHelper(req.files);

        res.json({
            uploadedFile: fileName
        });
        
    } catch (error) {
        
        res.status(400).json({
            msg: error
        })
    }


}

module.exports = {
    uploadFile,
}
