const {request, response} = require('express');

const isAdminRole = (req = request, res = response, next)=> {

    if(!req.user){
        return res.status(500).json({
            msg: 'Trying verify the role without validating the token first'
        });
    }

    const {role, name} = req.user;

    if(role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `Not Authorized - ${name} is not an Admin`
        });
    }

    next();

};

// ...roles will save all the arguments the user pass in a list
const validRole = ( ...roles )=> {

    return (req = request, res = response, next) =>{

        if(!req.user){
            return res.status(500).json({
                msg: 'Trying verify the role without validating the token first'
            });
        }    

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `Not Authorized - only for: ${roles}`
            });
        }

        next();
    }
};

module.exports = {isAdminRole, validRole}