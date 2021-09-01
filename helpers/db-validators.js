const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async(role = '') =>{
    const roleExist = await Role.findOne({role: role});

    if(role === '') throw new Error('Role is required');

    if (!roleExist) throw new Error(`${role} is not a valid role`);
    
}

const checkEmailExist = async(email = '') =>{
    const emailExist = await User.findOne({email: email});
    if (emailExist) throw new Error(`${email} already registered`);
}

const checkUserIdExist = async(id) =>{
    const idExist = await User.findById(id);
    if ( !idExist ) {
        throw new Error(`User ID does not exist ${id}`);
    }
}

module.exports = {isValidRole, checkEmailExist, checkUserIdExist}