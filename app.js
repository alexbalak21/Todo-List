//SERVER CONNECTION
import Connection from "./Requests.js"
const conn = new Connection()

//SELECTORS
const todoInput = document.querySelector(".todoInput")
const todoBtn = document.querySelector(".todoBtn")
const todoList = document.querySelector(".todoList")
const filter = document.querySelector(".options select")

//EVENT LISTENTERS
document.onload = updateTasks()
filter.addEventListener("change", filterTodo)

// displayTasks();
todoBtn.addEventListener("click", addTodo)

//GET ALL TASKS
async function updateTasks() {
  const tasks = await conn.getAll() //GET ALL TASKS FOROM DB Using Connection Class
  console.log(tasks)
  tasks.forEach((task) => {
    //FOR EACH TASK ask function to Display Task
    displayTask(task)
  })
}

//DIPLAY TASK BY TASK
function displayTask(taskData) {
  //CREATE ALL HTML ELEMENTS END FILL THEM
  const task = document.createElement("div")
  task.classList.add("todo")
  if (taskData.done) task.classList.add("done") //CHEKS IF TASK IS done
  const li = document.createElement("li")
  const complete = document.createElement("button")
  const del = document.createElement("button")
  complete.classList.add("complete")
  del.classList.add("delete")
  complete.innerHTML = '<i class="fas fa-check"></i>'
  del.innerHTML = '<i class="fas fa-trash"></i>'
  li.innerText = taskData.title
  task.append(li, complete, del)
  //ADD TASK TO TASK LIST
  todoList.appendChild(task)

  //UPDATE TASK TO COMPLETE/UNCOMPLETE
  complete.addEventListener("click", async () => {
    await conn.update(taskData.id)
    task.classList.toggle("done")
  })
  //DELETE TASK
  del.addEventListener("click", async () => {
    await conn.deleteOne(taskData.id) //DELETE TASK FORM DB

    task.classList.add("fall") //FALL ANIMATION ADD
    task.addEventListener("transitionend", () => task.remove()) //DELETE TASK FORM DISPLAY
  })
}

//ADD TODO
async function addTodo(event) {
  event.preventDefault()
  if (todoInput.value == "") return null
  let input = todoInput.value
  let added = await conn.addOne(input)
  displayTask(added)
  console.log(added)
  todoInput.value = ""
}

//FILTER BY done or UNdone
function filterTodo(e) {
  console.log(e.target.value)
  const todos = document.querySelectorAll(".todo")
  todos.forEach((todo) => {
    if (filter.value == "all") todo.style.display = "flex"
    if (filter.value == "done") {
      if (todo.classList.contains("done")) todo.style.display = "flex"
      else todo.style.display = "none"
    }
    if (filter.value == "uncompleted") {
      if (todo.classList.contains("done")) todo.style.display = "none"
      else todo.style.display = "flex"
    }
  })
}
