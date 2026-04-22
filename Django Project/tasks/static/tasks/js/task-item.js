function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : null;
}

function getCsrfToken() {
    return window.csrfToken || getCookie('csrftoken');
}

function taskItem(id, initialTitle, initialCompleted) {
    return {
        id: id,
        title: initialTitle,
        completed: initialCompleted,
        editing: false,
        editTitle: initialTitle,

        startEdit() {
            this.editing = true;
            this.editTitle = this.title;
            this.$nextTick(() => {
                this.$refs.editInput.focus();
                this.$refs.editInput.select();
            });
        },

        saveEdit() {
            if (this.editTitle.trim()) {
                this.title = this.editTitle.trim();
                this.editing = false;
                this.updateTask();
            }
        },

        cancelEdit() {
            this.editTitle = this.title;
            this.editing = false;
        },

        toggleCompleted() {
            this.updateTask();
        },

        updateTask() {
            fetch(`/update/${this.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCsrfToken()
                },
                body: JSON.stringify({
                    title: this.title,
                    completed: this.completed
                })
            }).then(() => {
                // Dispatch event to update stats
                window.dispatchEvent(new CustomEvent('task-updated'));
            });
        }
    }
}