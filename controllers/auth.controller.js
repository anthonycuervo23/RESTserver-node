const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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
            msg: 'Login Successful',
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

const googleSignIn = async(req = request, res = response) => {

    const {id_token} = req.body;

    try {
        const {email, name, img} = await googleVerify(id_token);

        //check if email already exist in DB
        let googleUser = await User.findOne({email});

        if(!googleUser){
            //create new user
            const data = {
                name,
                email,
                img,
                password: 'NotNecessary',
                google: true
            };
            googleUser = new User(data);
            await googleUser.save();
        }

        // user in DB status is false
        if(!googleUser.status){
            return res.status(401).json({
                msg: 'User is inactive - Please contact admin'
            });
        }

        // Generar JWT
        const token = await generateJWT(googleUser.id);

        res.json({
            msg: 'Google Sign in successful',
            googleUser,
            token: token
        });
        
    } catch (error) {
        res.status(400).json({
            msg: 'Google Token not valid'
        });
    }


}

module.exports = {
    login, googleSignIn
}