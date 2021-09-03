const {request, response} = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req = request, res = response, next)=> {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'JWT needed in the request'
        });
    }

    try {
        //payload.uid
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY);
        
        //leer el usuario que corresponde al uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'User does not exist'
            });
        }

        //verificar si el uid tiene un status true
        if(!user.status){
            return res.status(401).json({
                msg: 'Invalid Token'
            });
        }

        req.user = user;

        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Invalid JWT'
        });
    }

    next();
}

module.exports = {validateJWT}