/*
    *  --------------------------------------------------------  *
    *  -----  server.ts  --  /src/presentation/server.ts  -----  *
    *  --------------------------------------------------------  *
*/


import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';


/** -----  `Opciones de configuración del servidor`  ----- */
interface Options {
    
    /**  -----  `Puerto en el que escuchará el servidor`  ----- */
    port: number;

    /**  -----  `Ruta de la carpeta pública a servir (por defecto: 'public')`  ----- */
    publicPath?: string;
}


/**  -----  `Ruta absoluta del archivo actual (equivalente ESM de __filename)`   ----- */
const __filename = fileURLToPath(import.meta.url);

/**  -----  `Directorio del archivo actual (equivalente ESM de __dirname)`  ----- */
const __dirname = path.dirname(__filename);



/**
 * ----------------------------
 * -----  `class Server`  -----
 * ----------------------------
 * @class Server
 * @description Clase que representa un servidor web utilizando Express.js
 * @property {express.Application} app - Instancia de la aplicación Express
 * @property {number} port - Puerto en el que escuchará el servidor
 * @property {string} publicPath - Ruta de la carpeta pública a servir
 * @method start() - Método para iniciar el servidor
 */

export class Server {

    /**  -----  `Instancia de la aplicación Express`  ----- */
    private app = express();

    /**  -----  `Puerto en el que escuchará el servidor`  ----- */
    private readonly port: number;

    /**  -----  `Ruta de la carpeta pública a servir`  ----- */
    private readonly publicPath: string;


    constructor(options: Options) {

        const { port, publicPath = 'public' } = options;
        
        this.port = port;
        this.publicPath = publicPath;

    }
   

    /**
     * -----------------------
     * -----  `start()`  -----
     * -----------------------
     * - Método para iniciar el servidor Express
     * @returns - Promesa que se resuelve cuando el servidor ha iniciado    
     */

    async start(): Promise<void> {

        
        // ----- Middleware -----
        this.app.use(express.json());
        
        //  -----  public folder -----
        this.app.use(express.static(this.publicPath));


        // -----  routes -----
        this.app.get('/{*path}', (req: express.Request, res: express.Response): void => {
            
            console.log('Request URL => ', req.url);

            /** -----  `Ruta del archivo index.html`  ----- */
            const indexPath = path.join(__dirname, '../..', this.publicPath, 'index.html');
            res.sendFile(indexPath);

        });


        //  -----  server listen -----
        this.app.listen(this.port, (): void => {
            console.log(`🔥 Server running on port localhost:${this.port}`);
        });
        
        
    }

}
