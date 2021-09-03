const jwt = require("jsonwebtoken");

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) =>{

        const payload = { uid };

        //firmamos el token
        jwt.sign(payload, process.env.PRIVATE_KEY, {
            expiresIn: '4h'
        },(err, token)=> {

            if (err){
                console.log(err);
                reject('The token cannot be generated')
            }else{
                resolve(token);
            }

        });

    });

}

module.exports = {generateJWT}