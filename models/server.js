const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbconnection } = require('../database/config');
const logger = require('../helpers/logger');
const expressWinston = require('express-winston');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.pahts = {

            auth: '/api/auth',
            buscar: '/api/buscar',
            trabajador: '/api/trabajador',
            reporte: '/api/reporte',
            visitante: '/api/visitante',
            uploads: '/api/uploads',


        }


        this.conectarDb();
        this.middlewares();
        this.routes();

    }

    async conectarDb() {
        await dbconnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

        this.app.use(expressWinston.logger({

            winstonInstance: logger,
            meta: true,
            msg: 'HTTP {{req.method}} {{req.url}}',
            expressFormat: true,
            colorize: true,


        }));

        this.app.use(expressWinston.errorLogger({
            winstonInstance: logger,
            
        }));
    }


    routes() {

        this.app.use(this.pahts.auth, require('../routes/auth'));
        this.app.use(this.pahts.buscar, require('../routes/buscar'));
        this.app.use(this.pahts.trabajador, require('../routes/trabajador'));
        this.app.use(this.pahts.reporte, require('../routes/reporte'));
        this.app.use(this.pahts.visitante, require('../routes/visitante'));
        this.app.use(this.pahts.uploads, require('../routes/uploads'));


    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is listening on port ${this.port}`);
        });
    }
}

module.exports = Server;


