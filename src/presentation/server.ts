/*
    *  --------------------------------------------------------  *
    *  -----  server.ts  --  /src/presentation/server.ts  -----  *
    *  --------------------------------------------------------  *
*/



import express, { Router } from 'express';
import path from 'path';


/** -----  `Opciones de configuración del servidor`  ----- */
interface Options {
    
    /**  -----  `Puerto en el que escuchará el servidor`  ----- */
    port: number;

    /** -----  `Ruta de la carpeta pública a servir (por defecto: 'public')`  ----- */
    publicPath?: string;

    /** -----  `Instancia del enrutador de la aplicación`  ----- */
    routes: Router;
}



/**
 * ----------------------------
 * -----  `class Server`  -----
 * ----------------------------
 * @class Server
 * @description Clase que representa un servidor web utilizando Express.js
 * @property {express.Application} app - Instancia de la aplicación Express
 * @property {number} port - Puerto en el que escuchará el servidor
 * @property {string} publicPath - Ruta de la carpeta pública a servir
 * @property {Router} routes - Instancia del enrutador de la aplicación
 * @method start() - Método para iniciar el servidor
 */

export class Server {


    /**  -----  `Instancia de la aplicación Express`  ----- */
    private app = express();

    /**  -----  `Puerto en el que escuchará el servidor`  ----- */
    private readonly port: number;

    /**  -----  `Ruta de la carpeta pública a servir`  ----- */
    private readonly publicPath: string;

    /**  -----  `Instancia del enrutador de la aplicación`  ----- */
    private readonly routes: Router;


    constructor(options: Options) {

        const { port, publicPath = 'public', routes } = options;
        
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;

    }
   

    /**
     * -----------------------
     * -----  `start()`  -----
     * -----------------------
     * - Método para iniciar el servidor Express
     * @returns - Promesa que se resuelve cuando el servidor ha iniciado    
     */

    async start(): Promise<void> {

        
        //* ----- Middleware -----
        
        //  -----  Middleware para parsear JSON en las solicitudes  -----
        this.app.use(express.json());

        //  -----  Middleware para parsear datos de formularios URL-encoded  -----
        this.app.use(express.urlencoded({ extended: true }));
        
        //  -----  Middleware para servir archivos estáticos desde la carpeta pública  -----
        this.app.use(express.static(this.publicPath));

        //  -----  Middleware para usar las rutas definidas en la aplicación  -----        
        this.app.use(this.routes);
        

        //* -----  routes for SPA -----

        this.app.get('/{*path}', (req, res) => {
            
            console.log('Request URL => ', req.url);

            /** -----  `Ruta del archivo index.html`  ----- */
            const indexPath = path.join(process.cwd(), this.publicPath, 'index.html');
            res.sendFile(indexPath, (err) => {
                if (err) {
                    console.error('Error sending index.html:', err);
                    res.status(404).send('index.html not found');
                }
            });

        });


        //*  -----  server listen -----
        this.app.listen(this.port, (): void => {
            console.log(`🔥 Server running on port localhost:${this.port}`);
        });
        
        
    }

}
