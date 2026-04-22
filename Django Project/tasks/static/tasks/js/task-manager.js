function taskManager(initialTotal = 0, initialCompleted = 0) {
    return {
        totalTasks: initialTotal,
        completedTasks: initialCompleted,

        updateStats() {
            this.totalTasks = document.querySelectorAll('.task-item').length;
            this.completedTasks = document.querySelectorAll('.task-checkbox:checked').length;
        }
    }
}