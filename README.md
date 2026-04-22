# DjangoAIPractice

A Django-based task management application with a clean, maintainable frontend architecture.

## Frontend Structure

### Static Files Organization
```
Django Project/tasks/static/tasks/
├── css/
│   └── tasks.css          # Main stylesheet for task-related components
└── js/
    ├── htmx-config.js     # HTMX configuration and CSRF setup
    ├── task-manager.js    # Alpine.js component for task statistics
    └── task-item.js       # Alpine.js component for individual task items
```

### Templates Structure
```
Django Project/tasks/templates/tasks/
├── index.html             # Main task list page
└── partials/
    └── task_item.html     # Reusable task item component
```

## Technologies Used

### Backend
- Django 6.0+
- SQLite database

### Frontend
- **HTMX**: For seamless AJAX interactions
- **Alpine.js**: Lightweight reactive framework for component state
- **CSS**: Clean, responsive styling

## Key Features

### Task Management
- ✅ Add new tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Edit task titles (double-click to edit)
- ✅ Delete tasks with confirmation
- ✅ Real-time statistics updates

### Maintainable Code Structure
- **Separated concerns**: CSS, JavaScript, and HTML are in separate files
- **Modular JavaScript**: Each component has its own file
- **Reusable components**: Task items are in partial templates
- **Static file organization**: Logical grouping by type and component

## Development

### Running the Server
```bash
cd "Django Project"
poetry run python manage.py runserver
```

### Static Files
Static files are served automatically in development mode from the `static/` directories within each app.