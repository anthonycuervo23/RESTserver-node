const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { response, request } = require('express');
const { uploadFileHelper } = require('../helpers/upload-file');
const { Product, User } = require('../models/index');


const uploadFile = async(req = request, res = response) => {
    
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

//We use this locally 
const updateImage = async(req = request, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not user with ID: ${id}`
                });
            }
        break;
    
        case 'products':
            model = await Product.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not product with ID: ${id}`
                });
            }
        break;
        
        default:
            return res.status(500).json({
                msg: 'Something has been forgotten to validate in the server'
            });
    }

    //Limpiar imagenes previas
        if(model.img){
            //we need to delete image from server
            const pathImg = path.join(__dirname, '../uploads', collection, model.img);
            if(fs.existsSync(pathImg)){
                fs.unlinkSync(pathImg);
            }
        }


    model.img = await uploadFileHelper(req.files, undefined, collection);

    await model.save();

    res.json({
        model
    });

}

const updateImageCloudinary = async(req = request, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not user with ID: ${id}`
                });
            }
        break;
    
        case 'products':
            model = await Product.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not product with ID: ${id}`
                });
            }
        break;
        
        default:
            return res.status(500).json({
                msg: 'Something has been forgotten to validate in the server'
            });
    }

    //Limpiar imagenes previas
    if(model.img){
        //we need to delete image from cloudinary
        const splitName = model.img.split('/');
        const fileName = splitName[splitName.length - 1];
        //desestructuramos el array y obtenemos el primer elemento
        //que es el id del file.
        const [ public_id ] = fileName.split('.')
        cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);


    model.img = secure_url;

    await model.save();

    res.json({
        model
    });

}


const showImage = async(req = request, res = response) => {

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not user with ID: ${id}`
                });
            }
        break;
    
        case 'products':
            model = await Product.findById(id);
            
            if(!model){
                return res.status(400).json({
                    msg: `There is not product with ID: ${id}`
                });
            }
        break;
        
        default:
            return res.status(500).json({
                msg: 'Something has been forgotten to validate in the server'
            });
    }

    //check if we have an image
        if(model.img){
            const pathImg = path.join(__dirname, '../uploads', collection, model.img);
            //Return the image if exist
            if(fs.existsSync(pathImg)){
               return res.sendFile(pathImg)
            }
        }

    // if there is not image we return placeholder.   
    const pathPlaceholder = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathPlaceholder)
}

module.exports = {
    uploadFile,
    updateImage,
    showImage,
    updateImageCloudinary
}
