/*
    *  -----------------------------------------------------------  *
    *  -----  app-04-express.ts  --  /src/app-04-express.ts  -----  *
    *  -----------------------------------------------------------  *
*/


import { envs } from './config/envs.js';
import { Server } from './presentation/server.js';



const main = () => {

    console.log('Hello Express!');
    
    /** -----  `Crear una instancia del servidor`  ----- */
    const server = new Server({ 
        port: envs.PORT,
        publicPath: envs.PUBLIC_PATH,
    });
    

    //  -----  Iniciar el servidor  ----- */
    server.start();
    
}


(async() => main())();
