let input = document.querySelector(".input");
let jonatish = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks")
let otaDiv = document.querySelector(".container")
let hammasiniOchirish = document.querySelector(".delete-all");
let malumotlarListi = [];

if (window.localStorage.getItem("tasks")) {
  malumotlarListi = JSON.parse(window.localStorage.getItem("tasks"))
}
getTaskFromLocalStorage();

jonatish.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
}

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    complated: false,
  };
  malumotlarListi.push(task);
  addTaskToPage(malumotlarListi);

  addTaskToLocalStorage(malumotlarListi);
}

function addTaskToPage(malumotlarListi) {
  tasksDiv.innerHTML = "";

  malumotlarListi.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.complated) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("o'chirish"))
    div.appendChild(span);
    tasksDiv.appendChild(div)
  });
}


function addTaskToLocalStorage(malumotlarListi) {
  window.localStorage.setItem("tasks", JSON.stringify(malumotlarListi));
}
function getTaskFromLocalStorage() {
  let data = window.localStorage.getItem("tasks")
  if (data) {
    let tasks = JSON.parse(data);
    addTaskToPage(tasks);
  }
}

function addElementsToPageFrom(malumotlarListi) {
  tasksDiv.innerHTML = "";
  malumotlarListi.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("o'chirish"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

tasksDiv.onclick = ((e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
    updateStatusInLocalStorage(e.target.getAttribute("data-id"));
  }
})


function deleteTaskFromLocalStorage(taskId) {
  malumotlarListi = malumotlarListi.filter((task) => task.id != taskId);
  addTaskToLocalStorage(malumotlarListi);
}
function updateStatusInLocalStorage(taskId) {
  malumotlarListi.forEach((task) => {
    if (task.id == taskId)
      task.complated == false ? task.complated = true : task.complated = false;
  });

  addTaskToLocalStorage(malumotlarListi);
}

hammasiniOchirish.onclick = function (e) {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks")
}
