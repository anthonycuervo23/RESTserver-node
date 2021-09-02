const getUsers = require('./get-users');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');

module.exports = {
    paths:{
        '/users':{
            ...getUsers,
            ...createUser
        },
        '/users/{id}':{
            ...updateUser,
            ...deleteUser
        }
    }
}