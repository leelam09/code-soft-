document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage (if any)
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener("click", function () {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            saveTasks();
            taskInput.value = "";
            renderTasks();
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
