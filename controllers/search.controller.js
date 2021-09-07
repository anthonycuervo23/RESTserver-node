const {request, response} = require('express');
const {
    searchUsers,
    searchProducts,
    searchCategories,
} = require('../helpers/search-collection');

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles',
]

const search = (req = request, res = response) => {

    const { collection, query } = req.params;

    const { available } = req.query;

    if (!allowedCollections.includes(collection)){
        return res.status(400).json({
            msg: `Search collections allowed: ${allowedCollections}`
        });
    }


    switch (collection) {
        case 'users':
            searchUsers(query, res);
            break;
        case 'categories':
            searchCategories(query, res);
            break;
        case 'products':
            searchProducts(query, available, res)
            break;
        case 'roles':
            break;
            default:
                res.status(500).json({
                    msg: 'something went wrong in the server'
                });

    }
}


module.exports = {
    search,
}