const TaskController = require("../controller/task.controller");


function handleRequest(req, res) {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const { pathname } = parsedUrl;

    // Enrutamiento de las solicitudes
    if (pathname.startsWith('/tasks')) {
        if (method === 'GET' && pathname === '/tasks') {
            TaskController.getAllTasks(req, res);
        } else if (method === 'GET' && pathname.startsWith('/tasks/')) {
            TaskController.getTaskById(req, res);
        } else if (method === 'POST' && pathname === '/tasks') {
            TaskController.createTask(req, res);
        } else if (method === 'PUT' && pathname.startsWith('/tasks/')) {
            TaskController.updateTaskById(req, res);
        } else if (method === 'DELETE' && pathname.startsWith('/tasks/')) {
            TaskController.deleteTaskById(req, res);
        } else {
            notFound(res);
        }
    } else {
        notFound(res);
    }
}

function notFound(res) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Página no encontrada' }));
}

module.exports = {
    handleRequest
};