const { request, response } = require('express');
const { Category } = require('../models');

//Get Categories - paginated - total - populate - public
const getCategories = async(req = request, res = response ) => {

    const { limit = 10, from = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({status: true}),
        Category.find({status: true})
            .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({
      total: total,
        categories: categories
    });

}
//Get Category by ID - populate
const getCategoryByID = async(req = request, res = response) => {
    
    const { id } = req.params;

    try {
        
        const category = await Category.findById(id);
        res.json({
            category
        });
        
    } catch (error) {
        res.status(500).json({
            msg: 'Something went wrong!'
        });
    }
}
const createCategory = async(req = request, res = response ) => {

    const { name } = req.body;

    const categoryDB = await Category.findOne({ name });

    if ( categoryDB ) {
        return res.status(400).json({
            msg: `A Category named ${ categoryDB.name }, already exist in DB`
        });
    }

    // Generar la data a guardar
    const data = {
        name: name,
        createdBy: req.user._id
    }

    const category = new Category( data );

    // Guardar DB
    await category.save();

    // await category
    //     .populate('usuario', 'nombre')
    //     .execPopulate();

    res.status(201).json(category);

}

//Update Category by ID

// Remove Category - changing status to False

// Delete Category from DB

module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
}