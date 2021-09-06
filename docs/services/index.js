const getUsers = require('./get-users');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');
const removeUser = require('./remove-user');

const getCategories = require('./get-categories');
const getCategory = require('./get-category');
const createCategory = require('./create-category');
const updateCategory = require('./update-category');
const removeCategory = require('./remove-category');
const deleteCategory = require('./delete-category');

const getProducts = require('./get-products');
const getProduct = require('./get-product');
const createProduct = require('./create-product');
const updateProduct = require('./update-product');
const removeProduct = require('./remove-product');
const deleteProduct = require('./delete-product');



module.exports = {
    paths:{
        '/users':{
            ...getUsers,
            ...createUser
        },
        '/users/{id}':{
            ...updateUser,
            ...deleteUser
        },
        '/users/delete/{id}':{
            ...removeUser
        },
        '/categories':{
            ...getCategories,
            ...createCategory,
        },
        '/categories/{id}':{
            ...getCategory,
            ...updateCategory,
            ...removeCategory,
        },
        '/categories/delete/{id}':{
            ...deleteCategory
        },
        '/products':{
            ...getProducts,
            ...createProduct,
        },
        '/products/{id}':{
            ...getProduct,
            ...updateProduct,
            ...removeProduct,
        },
        '/products/delete/{id}':{
            ...deleteProduct
        },
    }
}

