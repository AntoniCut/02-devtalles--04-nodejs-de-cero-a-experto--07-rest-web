/*
    *  ----------------------------------------------------------------------  *
    *  -----  controller.ts  --  /src/presentation/todos/controller.ts  -----  *
    *  ----------------------------------------------------------------------  *
*/


import type { Request, Response } from "express";


interface Todo {
    id: number;
    text: string;
    completedAt: Date | null;
}


/**  Lista de tareas (todos) */
const todos: Todo[] = [
    { id: 1, text: 'Buy milk', completedAt: new Date() },
    { id: 2, text: 'Buy bread', completedAt: new Date() },
    { id: 3, text: 'Buy butter', completedAt: new Date() },
];

export class TodosController {


    /** 
     * - `DI  --  Inyección de dependencias (si es necesario)`  ----- 
     */
    constructor() { }


    /**
     * --------------------------
     * -----  `getTodos()`  ----- 
     * --------------------------
     * - controlador para obtener la lista de tareas (todos)
     * @param req - Objeto de solicitud de Express
     * @param res - Objeto de respuesta de Express
     * @returns Respuesta JSON con la lista de tareas
     */

    public getTodos = (req: Request, res: Response) => res.json(todos);




    /**
     * --------------------------
     * -----  `getTodoById()`  ----- 
     * --------------------------
     * - controlador para obtener una tarea por su ID
     * @param req - Objeto de solicitud de Express
     * @param res - Objeto de respuesta de Express
     * @returns Respuesta JSON con la tarea encontrada o un mensaje de error si no se encuentra
     */
    public getTodoById = (req: Request, res: Response) => {

        /** -----  ID que se obtiene de los parámetros de la solicitud  ----- */
        const id: number = +(req.params['id'] ?? NaN);

        ///  -----  Validar que el ID es un número válido  -----
        if (isNaN(id))
            return res.status(400).json({ error: 'ID argument is not a number' });

        /** -----  Buscar la tarea por su ID  ----- */
        const todo = todos.find(todo => todo.id === id);

        //  -----  Responder con la tarea encontrada o un mensaje de error si no se encuentra  -----
        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with ID ${id} not found` });

    };


    /**
     * ----------------------------
     * -----  `createTodo()`  -----
     * ----------------------------
     * - controlador para crear una nueva tarea
     * @param req - Objeto de solicitud de Express
     * @param res - Objeto de respuesta de Express
     * @return Respuesta JSON con la tarea creada o un mensaje de error si los datos son inválidos
     */

    public createTodo = (req: Request, res: Response) => {

        /** -----  Obtener el cuerpo de la solicitud  ----- */
        const body = req.body;

        //  -----  Validar que el cuerpo de la solicitud sea un objeto  -----
        if (typeof body !== 'object' || body === null)
            return res.status(400).json({ error: 'Request body must be an object' });

        //  -----  Obtener el campo `text` del cuerpo de la solicitud  -----
        const { text } = body;

        //  -----  Validar que el campo `text` esté presente y sea una cadena de texto  -----
        if (!text || typeof text !== 'string')
            return res.status(400).json({ error: 'Text field is required and must be a string' });

        /**  -----  Crear una nueva tarea  ----- */
        const newTodo: Todo = {
            id: todos.length + 1,
            text,
            completedAt: null,
        };

        //  -----  Agregar la nueva tarea a la lista de tareas  ----- 
        todos.push(newTodo);

        //  -----  Responder con la tarea creada  -----
        res.json(newTodo);

    }



    /**
     * ----------------------------
     * -----  `updateTodo()`  -----
     * ----------------------------
     * - controlador para actualizar una tarea existente
     * @param req - Objeto de solicitud de Express
     * @param res - Objeto de respuesta de Express
     * @returns Respuesta JSON con la tarea actualizada o un mensaje de error si no se encuentra
     */

    public updateTodo = (req: Request, res: Response) => {

        /** -----  ID que se obtiene de los parámetros de la solicitud  ----- */
        const id: number = +(req.params['id'] ?? NaN);

        //  -----  Validar que el ID sea un número válido  -----
        if (isNaN(id))
            return res.status(400).json({ error: 'ID argument is not a number' });

        /** -----  Buscar la tarea por su ID  ----- */
        const todo = todos.find(todo => todo.id === id);

        if (!todo)
            return res.status(404).json({ error: `Todo with ID ${id} not found` });


        //  -----  Obtener el cuerpo de la solicitud  -----
        const { text, completedAt } = req.body;

        //*  -----  Actualizar texto y estado de completado de la tarea  ----- 
        
        todo.text = text || todo.text;

        (completedAt === null)
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);


        //  -----  barrer todos los ´todos` y Actualizar la tarea en la lista de tareas  -----
        /*
        todos.forEach((todo, index) => {

            if (todo.id === id)
                todos[index] = todo;

        });
        */

        //  -----  Responder con la tarea actualizada  -----
        res.json(todo);

    };



    /**
     * ----------------------------
     * -----  `deleteTodo()`  -----
     * ----------------------------
     * - controlador para eliminar una tarea existente
     * @param req - Objeto de solicitud de Express
     * @param res - Objeto de respuesta de Express
     * @returns Respuesta JSON con la tarea eliminada o un mensaje de error si no se encuentra
     */
    public deleteTodo = (req: Request, res: Response) => {

        /** -----  ID que se obtiene de los parámetros de la solicitud  ----- */
        const id: number = +(req.params['id'] ?? NaN);

        //  -----  Validar que el ID sea un número válido  -----
        if (isNaN(id))
            return res.status(400).json({ error: 'ID argument is not a number' });

        /** -----  Buscar la tarea por su ID  ----- */
        const todoIndex = todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1)
            return res.status(404).json({ error: `Todo with ID ${id} not found` });

        //  -----  Eliminar la tarea de la lista de tareas  -----
        const deletedTodo = todos.splice(todoIndex, 1)[0];

        //  -----  Responder con la tarea eliminada  -----
        res.json(deletedTodo);

    }




    
}
