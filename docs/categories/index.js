const getCategories = require('./get-categories');

module.exports = {
    paths:{
        '/categories':{
            ...getCategories,
        },
    }
}