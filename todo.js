document.addEventListener('DOMContentLoaded', () => {
    // State Management
    let tasks = [];
    let currentFilter = 'all';

    // DOM Elements Cache
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const todoList = document.getElementById('todo-list');
    const taskCount = document.getElementById('task-count');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const emptyState = document.getElementById('empty-state');

    // 1. Initialize Application
    const initApp = () => {
        loadTasks();
        renderTasks();
        setupEventListeners();
    };

    // 2. Load and Save State (localStorage)
    const loadTasks = () => {
        try {
            const storedTasks = localStorage.getItem('portfolio-tasks');
            if (storedTasks) {
                tasks = JSON.parse(storedTasks);
            }
        } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
            tasks = [];
        }
    };

    const saveTasks = () => {
        try {
            localStorage.setItem('portfolio-tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks to localStorage:', error);
        }
    };

    // 3. Render Tasks
    const renderTasks = () => {
        // Clear current list safely
        todoList.replaceChildren();

        // Apply filters without modifying source of truth
        let filteredTasks = tasks;
        if (currentFilter === 'active') {
            filteredTasks = tasks.filter(t => !t.completed);
        } else if (currentFilter === 'completed') {
            filteredTasks = tasks.filter(t => t.completed);
        }

        // Handle empty state visibility
        if (filteredTasks.length === 0) {
            emptyState.classList.add('visible');
        } else {
            emptyState.classList.remove('visible');
            // Generate DOM nodes safely
            filteredTasks.forEach(task => {
                const li = createTaskElement(task);
                todoList.appendChild(li);
            });
        }

        updateStatusCount();
    };

    // 4. Create Task DOM Element
    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        li.dataset.taskId = task.id;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'todo-content';

        // Checkbox accessible input
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = task.completed;
        checkbox.dataset.action = 'toggle';
        checkbox.dataset.taskId = task.id;
        checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);

        // Safe text injection
        const textSpan = document.createElement('span');
        textSpan.className = 'todo-text';
        textSpan.textContent = task.text;

        contentDiv.appendChild(checkbox);
        contentDiv.appendChild(textSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'icon-btn edit-btn';
        editBtn.dataset.action = 'edit';
        editBtn.dataset.taskId = task.id;
        editBtn.textContent = 'Edit';
        editBtn.setAttribute('aria-label', `Edit task "${task.text}"`);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'icon-btn delete-btn';
        deleteBtn.dataset.action = 'delete';
        deleteBtn.dataset.taskId = task.id;
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('aria-label', `Delete task "${task.text}"`);

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(contentDiv);
        li.appendChild(actionsDiv);

        return li;
    };

    // 5. CRUD Operations
    const createTask = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        const newTask = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 5), // unique ID
            text: trimmedText,
            completed: false,
            createdAt: Date.now()
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
    };

    const toggleTask = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    };

    const updateTask = (id, newText) => {
        const trimmedText = newText.trim();
        if (!trimmedText) return; // Ignore empty edits

        tasks = tasks.map(task => 
            task.id === id ? { ...task, text: trimmedText } : task
        );
        saveTasks();
        renderTasks();
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    const clearCompleted = () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    };

    // 6. UI Helpers
    const applyFilter = (filter) => {
        currentFilter = filter;
        
        filterBtns.forEach(btn => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive.toString());
        });

        renderTasks();
    };

    const updateStatusCount = () => {
        const activeTasks = tasks.filter(t => !t.completed).length;
        const completedTasks = tasks.length - activeTasks;

        taskCount.textContent = `${activeTasks} task${activeTasks !== 1 ? 's' : ''} remaining`;
        clearCompletedBtn.disabled = completedTasks === 0;
    };

    // 7. Inline Editing Mode
    const enterEditMode = (li, taskId) => {
        const task = tasks.find(t => t.id === taskId);
        if (!task) return;

        const contentDiv = li.querySelector('.todo-content');
        const actionsDiv = li.querySelector('.todo-actions');

        // Hide normal view
        contentDiv.style.display = 'none';
        actionsDiv.style.display = 'none';

        // Create edit form
        const editForm = document.createElement('form');
        editForm.className = 'edit-form';
        editForm.style.display = 'flex';
        editForm.style.flex = '1';
        editForm.style.gap = 'var(--space-sm)';

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = task.text;
        editInput.setAttribute('aria-label', 'Edit task text');

        const saveBtn = document.createElement('button');
        saveBtn.type = 'submit';
        saveBtn.className = 'btn';
        saveBtn.textContent = 'Save';

        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'btn-secondary';
        cancelBtn.textContent = 'Cancel';
        
        // Re-render to exit edit mode without saving
        cancelBtn.addEventListener('click', () => renderTasks());

        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            updateTask(taskId, editInput.value);
        });

        editForm.appendChild(editInput);
        editForm.appendChild(saveBtn);
        editForm.appendChild(cancelBtn);

        li.appendChild(editForm);
        
        // Ensure input is focused and cursor is at the end of text
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    };

    // 8. Event Delegation Handler
    const handleTaskAction = (e) => {
        const target = e.target;
        
        // Find closest button or checkbox using standard DOM methods
        const actionEl = target.closest('button, input[type="checkbox"]');
        if (!actionEl) return;

        const action = actionEl.dataset.action;
        const taskId = actionEl.dataset.taskId;

        if (!action || !taskId) return;

        if (action === 'toggle') {
            toggleTask(taskId);
        } else if (action === 'delete') {
            deleteTask(taskId);
        } else if (action === 'edit') {
            const li = actionEl.closest('.todo-item');
            if (li) enterEditMode(li, taskId);
        }
    };

    // 9. Setup Event Listeners
    const setupEventListeners = () => {
        // Form submission
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            createTask(taskInput.value);
            taskInput.value = ''; // clear input
            taskInput.focus();
        });

        // Event delegation on task list
        todoList.addEventListener('click', handleTaskAction);

        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                applyFilter(btn.dataset.filter);
            });
        });

        // Clear completed
        clearCompletedBtn.addEventListener('click', clearCompleted);
    };

    // Boot up
    initApp();
});
