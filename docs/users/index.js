const getUsers = require('./get-users');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');
const removeUser = require('./remove-user');

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
        }
    }
}