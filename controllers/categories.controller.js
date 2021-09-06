const { request, response } = require('express');
const { Category } = require('../models');

//Get Categories - paginated - total - populate - public
const getCategories = async(req = request, res = response ) => {

    const { limit = 10, from = 0 } = req.query;

    const [total, categories] = await Promise.all([
        Category.countDocuments({status: true}),
        Category.find({status: true})
            .populate('createdBy', 'name')
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
        
        const category = await Category.findById(id)
            .populate('createdBy', 'name');

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

    const name = req.body.name.toUpperCase();

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

    res.status(201).json(category);

}

//Update Category by ID
const updateCategory = async(req = request, res = response) => {
    
    try {
        const { id } = req.params;

        const { status, ...data} = req.body;

        data.name = data.name.toUpperCase();
        //update the user to get the last person who update a category
        data.createdBy = req.user._id;

        const category = await Category.findByIdAndUpdate(id, data, {new: true});

        res.json({
            msg: 'Category updated Successfully',
            category
        });

    } catch (error) {
        
        res.status(500).json({
            msg: 'Something went wrong!'
        });
        
    }
}

// Remove Category - changing status to False
const removeCategory = async(req = request, res = response) => {

    const { id } = req.params;

    //Delete category in frontend but not in Database
    const category = await Category.findByIdAndUpdate(id, {status: false});

    res.json({
        msg: 'Category removed Successfully',
        category,
    });
}

// Delete Category from DB
const deleteCategoryDB = async(req = request, res = response) => {
    
    const { id } = req.params;

    //Delete fisicamente category from DB
    const category = await Category.findByIdAndDelete(id);

    res.json({
        msg: 'Category deleted Successfully from DB',
    });
}


module.exports = {
    createCategory,
    getCategories,
    getCategoryByID,
    updateCategory,
    removeCategory,
    deleteCategoryDB
}