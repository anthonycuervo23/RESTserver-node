const {request, response} = require('express');
const { isValidObjectId } = require('mongoose');
const { User, Category, Product } = require('../models');

const searchUsers = async(query = '', res = response) => {

    const isMongoID = isValidObjectId(query); // TRUE

    if (isMongoID){
        const user = await User.findById(query);
        return res.json({
            results: ( user ) ? [ user ] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}],
    });

    const total = await User.count({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}],
    });

    res.json({
        results: {
            total,
            users
        }
    });
    
}

const searchCategories = async(query = '', res = response) => {

    const isMongoID = isValidObjectId(query); // TRUE

    if (isMongoID){
        const category = await Category.findById(query)
        .populate('category', 'createdBy');
        return res.json({
            results: ( category ) ? [ category ] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const categories = await Category.find({
        name: regex,
        status: true,
    }).populate('category', 'createdBy');

    const total = await Category.count({
        name: regex,
        satus: true,
    });

    res.json({
        results: {
            total,
            categories
        }
    });
    
}

const searchProducts = async(query = '', available, res = response) => {

    const isMongoID = isValidObjectId(query); // TRUE

    if (isMongoID){
        const product = await Product.findById(query);
        return res.json({
            results: ( product ) ? [ product ] : []
        });
    }

    const regex = new RegExp(query, 'i');

    const products = await Product.find({
        $or: [{name: regex}, {description: regex}],
        $and: [{status: true}],
    });

    const total = await Product.count({
        $or: [{name: regex}, {description: regex}],
        $and: [{status: true}],
    });

    res.json({
        results: {
            total,
            products
        }
    });
    
}

module.exports = {
    searchUsers,
    searchCategories,
    searchProducts,   
}