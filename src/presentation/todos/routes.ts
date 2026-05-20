/*
    *  --------------------------------------------------------------  *
    *  -----  routes.ts  --  /src/presentation/todos/routes.ts  -----  *
    *  --------------------------------------------------------------  *
*/


import { Router } from "express";
import { TodosController } from "./controller.js";


/**
 * ----------------------------
 * -----  `class TodoRoutes`  -----
 * ----------------------------
 * @class TodoRoutes
 * @description Clase que representa las rutas relacionadas con las tareas (todos)
 * @method Routes - Método estático que devuelve un enrutador con las rutas definidas para los todos
 */
export class TodoRoutes {


    static get Routes(): Router {

        /** -----  `Instancia del enrutador de la aplicación`  ----- */
        const router = Router();

        /**  -----  `Instancia del controlador de todos`  ----- */
        const todosController = new TodosController();

        //*  -----  Definición de las rutas para los todos  ----- */
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo);
        router.put('/:id', todosController.updateTodo);
        router.delete('/:id', todosController.deleteTodo);
        

        return router;

    }

}
