let tasks = [];
let deleteAllConfirm = false;

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = "";
    deleteAllConfirm = false; // reset delete all confirmation
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = "task-item" + (task.completed ? " completed" : "");
        
        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "task-actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => toggleComplete(task.id);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(task.id);

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(taskSpan);
        li.appendChild(actionsDiv);

        taskList.appendChild(li);
    });
}

function toggleComplete(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
    );
    deleteAllConfirm = false;
    renderTasks();
}

function editTask(taskId) {
    const newTaskText = prompt("Edit your task:");
    if (newTaskText !== null) {
        tasks = tasks.map(task =>
            task.id === taskId ? {...task, text: newTaskText.trim()} : task
        );
        deleteAllConfirm = false;
        renderTasks();
    }
}

function deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
        tasks = tasks.filter(task => task.id !== taskId);
        deleteAllConfirm = false;
        renderTasks();
    }
}

function deleteAllTasks() {
    if (!deleteAllConfirm) {
        alert("Click again to confirm deleting ALL tasks!");
        deleteAllConfirm = true;

        setTimeout(() => {
            deleteAllConfirm = false;
        }, 3000); // confirmation expires after 3 seconds

    } else {
        tasks = [];
        deleteAllConfirm = false;
        renderTasks();
        alert("All tasks deleted!");
    }
}

// Initialize
renderTasks();
