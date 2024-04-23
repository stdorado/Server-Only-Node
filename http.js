const http = require('http');
const taskRouter = require('./router/task.routes');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    taskRouter.handleRequest(req, res);
});

server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});