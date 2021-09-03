const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {
     
        // Verificar si el email existe
        const user = await User.findOne({email: email});
        if (!user){
            return res.status(400).json({
                msg: 'Email is not valid'
            });
        }

        // Verificar si el usuario esta activo
        if (!user.status){
            return res.status(400).json({
                msg: 'This user has been deactivated'
            });
        }

        // verificar que el password sea correcto
        const isValidPassword = bcryptjs.compareSync(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({
                msg: 'Password is incorrect'
            });
        }
        // Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            user: user,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong with the server'
        });
    }
}

module.exports = {
    login
}