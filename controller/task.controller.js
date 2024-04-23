const Task = require("../models/task.models")

function getAllTasks(req,res){
    const tasks = Task.getAllTasks()
    //el metodo senJsonResponse permite enviar una respuesta json al router 
    sendJsonResponse(res,tasks)
}

function getTaskById(req,res){
    //aca sacamos el id de los parametros y lo parseamos para luego usarlo
    const taskId = parseInt(req.params.id)
    const tasks = Task.getTaskById(taskId)
    if(!task){
        sendJsonResponse(res,tasks)
    }
}

function createTask(req, res) {
    //sacamos los atributos del body de la peticion y la usamos
    const { title, descripcion, completed } = req.body;
    //el metodo date now sirve para sacar la fecha actual
    const newTask = new Task(Date.now(), title, descripcion, completed);
    Task.saveTask(newTask);
    //enviamos una respuesta y un codigo 201
    sendJsonResponse(res, newTask, 201);
}

function updateTaskById(req, res) {
    //mismo formato parseamos el id obtenido de los parametros
    const taskId = parseInt(req.params.id);
    // la data a actualizar del body y luego lo usamos
    const updatedTaskData = req.body;
    const success = Task.updateTaskById(taskId, updatedTaskData);
    if (success) {
        sendJsonResponse(res, { message: 'Tarea actualizada correctamente' });
    } else {
        notFound(res);
    }
}

function deleteTaskById(req, res) {
    //parseamos id
    const taskId = parseInt(req.params.id);
    const success = Task.deleteTaskById(taskId);
    if (success) {
        sendJsonResponse(res, { message: 'Tarea eliminada correctamente' });
    } else {
        notFound(res);
    }
}

function notFound(res) {
    //el metodo writeHead permite escribir en el head de la peticion
    res.writeHead(404, { 'Content-Type': 'application/json' });
    //el metodo stringiFy pasa un formato json a un string
    res.end(JSON.stringify({ error: 'Tarea no encontrada' }));
}

function sendJsonResponse(res, data, statusCode = 200) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTaskById,
    deleteTaskById
};