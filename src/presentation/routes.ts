/*
    *  --------------------------------------------------------  *
    *  -----  routes.ts  --  /src/presentation/routes.ts  -----  *
    *  --------------------------------------------------------  *
*/

import { Router } from "express";
import { TodoRoutes } from "./todos/routes.js";


export class AppRoutes {


    static get Routes(): Router {

        /** -----  `Instancia del enrutador de la aplicación`  ----- */
        const router = Router();

        //*  -----  Middleware para las rutas de todos  ----- */
        router.use('/api/todos', TodoRoutes.Routes);

        return router;

    }

}
