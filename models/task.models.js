class Task {
    constructor(id, title, descripcion, completed = false) {
        this.id = id;
        this.title = title;
        this.descripcion = descripcion;
        this.completed = completed;
    }

    static getAllTasks() {
        return Task.tasks;
    }

    static getTaskById(id) {
        return Task.tasks.find(task => task.id === id);
    }

    static saveTask(task) {
        Task.tasks.push(task);
    }

    static updateTaskById(id, updatedTaskData) {
        const taskToUpdate = Task.tasks.find(task => task.id === id);
        if (taskToUpdate) {
            taskToUpdate.title = updatedTaskData.title || taskToUpdate.title;
            taskToUpdate.descripcion = updatedTaskData.descripcion || taskToUpdate.descripcion;
            taskToUpdate.completed = updatedTaskData.completed || taskToUpdate.completed;
            return true; 
        }
        return false; 
    }
    static deleteTaskById(id) {
        const initialLength = Task.tasks.length;
        Task.tasks = Task.tasks.filter(task => task.id !== id);
        return Task.tasks.length !== initialLength;
    }
}

Task.tasks = [];

module.exports = Task;
