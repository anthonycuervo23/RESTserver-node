const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // PATHS
        this.usersPath = '/api/users';

        //Connect to database
        this.connectDB();
        
        // Middlewares (funciones que se ejecutan cuando levantamos el servidor)
        this.middlewares();

        // Rutas de mi aplicaciones
         this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        // CORS
        this.app.use(cors());

        // Read and Parse Body
        this.app.use(express.json());

        //directorio publico 
        this.app.use(express.static('public'));

    }

    routes(){

        this.app.use(this.usersPath, require('../routes/user.route'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('server running in port: ', this.port);
        });

    }

}

module.exports = Server;