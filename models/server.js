const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config.db');
const swaggerUI = require('swagger-ui-express');
const docs = require('../docs');

class Server {

    constructor(){

        this.app = express();

        this.port = process.env.PORT;

        //PATHS
        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            uploads:    '/api/upload',
            users:      '/api/users'
        }

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

        //File upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

        //Create swagger api ui documentation
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

    }

    routes(){

        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.users, require('../routes/user.route'));
        this.app.use(this.paths.categories, require('../routes/categories.route'));
        this.app.use(this.paths.products, require('../routes/products.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'));
        this.app.use(this.paths.search, require('../routes/search.route'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server listening on port: ', this.port);
        });

    }

}

module.exports = Server;