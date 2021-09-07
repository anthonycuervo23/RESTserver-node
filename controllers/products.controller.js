const { request, response } = require('express');
const { Product, Category } = require('../models');


// Get Products - paginated - populated - public
const getProducts = async(req = request, res = response)=> {
    
    const { limit = 10, from = 0 } = req.query;

    const [total, products] = await Promise.all([
        Product.countDocuments({status: true}),
        Product.find({status: true})
            .populate('createdBy', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
      total: total,
        products: products
    });
}

//Get Product by ID - populated - public
const getProductByID = async(req = request, res = response)=> {

    const { id } = req.params;

    try {
        
        const product = await Product.findById(id)
            .populate('createdBy', 'name')
            .populate('category', 'name');

        res.json({
            product
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong!'
        });
    }
}

//Create new Product - privated - Only with JWT and ADMIN or SALES role
const createProduct = async(req = request, res = response)=> {

    const { status, createdBy, ...body } = req.body

    const productDB = await Product.findOne({name: body.name});

    ///TODO: CORREGIR ESTA FALLA <===================
    if ( productDB) {
        return res.status(400).json({
            msg: `A Product named ${ productDB.name }, already exist in DB`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        createdBy: req.user._id
    }

    const product = new Product( data );

    // Guardar DB
    await product.save();

    res.status(201).json(product);
}

//Update product by ID - private - Only with JWT and ADMIN or SALES role
const updateProduct = async(req = request, res = response)=> {

    try {
        const { id } = req.params;

        const { status, category, ...data} = req.body;
        
        if(data.name){
            data.name = data.name.toUpperCase();
        }
        
        //update the user to get the last person who update a product
        data.createdBy = req.user._id;

        const product = await Product.findByIdAndUpdate(id, data, {new: true});

        res.json({
            msg: 'Product updated Successfully',
            product,
        });

    } catch (error) {
        
        res.status(500).json({
            msg: 'Something went wrong!'
        });
        
    }
}

//Remove product by ID - private - Only with JWT and ADMIN or SALES role
const removeProduct = async(req = request, res = response)=> {

    const { id } = req.params;

    //Delete category in frontend but not in Database
    const product = await Product.findByIdAndUpdate(id, {status: false}, {new: true});

    res.json({
        msg: 'Product removed Successfully',
        product,
    });
}

//Delete product by ID - private - Only with JWT and ADMIN role
const deleteProduct = async(req = request, res = response)=> {
    
    const { id } = req.params;

    //Delete fisicamente category from DB
    const product = await Product.findByIdAndDelete(id);

    res.json({
        msg: 'Product deleted Successfully from DB',
    });
}

module.exports = {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    removeProduct,
    deleteProduct
}