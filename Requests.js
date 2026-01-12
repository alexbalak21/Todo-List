// Requests.js - LocalStorage implementation
class Connection {
    constructor() {
        this.STORAGE_KEY = 'todoTasks';
    }

    // Get all tasks
    async getAll() {
        try {
            const tasks = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
            return Array.isArray(tasks) ? tasks : [];
        } catch (error) {
            console.error('Error getting tasks:', error);
            return [];
        }
    }

    // Add a new task
    async addOne(taskText) {
        try {
            const tasks = await this.getAll();
            const newTask = {
                id: `task-${Date.now()}`,
                title: taskText,
                done: false
            };
            tasks.push(newTask);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
            return newTask;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    }

    // Toggle task completion
    async update(taskId) {
        try {
            const tasks = await this.getAll();
            const updatedTasks = tasks.map(task => 
                task.id === taskId ? { ...task, done: !task.done } : task
            );
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
            return updatedTasks.find(task => task.id === taskId);
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    }

    // Delete a task
    async deleteOne(taskId) {
        try {
            const tasks = await this.getAll();
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedTasks));
            return taskId;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    }
}

export default Connection;