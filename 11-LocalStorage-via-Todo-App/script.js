const taskForm = document.getElementById("task-form")
const confirmCloseDialog = document.getElementById("confirm-close-dialog")
const openTaskFormBtn = document.getElementById("open-task-form-btn")
const closeTaskFormBtn = document.getElementById("close-task-form-btn")
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn")
const cancelBtn = document.getElementById("cancel-btn")
const discardBtn = document.getElementById("discard-btn")
const tasksContainer = document.getElementById("tasks-container")
const titleInput = document.getElementById("title-input")
const dateInput = document.getElementById("date-input")
const descriptionInput = document.getElementById("description-input")

const taskData = JSON.parse(localStorage.getItem("data")) || []
let currentTask = {}

//- -------------- Methods -------------- -
const removeSpecialChars = (val) => {
  return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "")
}

const addOrUpdateTask = () => {
  // Check for existing tasks
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id)
  // Getting the object from input
  const taskObj = {
    id: `${removeSpecialChars(titleInput.value)
      .toLowerCase()
      .split(" ")
      .join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  }
  // Add the new object if the object is not found in objects list
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj)
  } else {
    taskData[dataArrIndex] = taskObj
  }

  localStorage.setItem("data", JSON.stringify(taskData))
  updateTaskContainer()
  reset()
}

const reset = () => {
  addOrUpdateTaskBtn.innerText = "Add Task"
  titleInput.value = ""
  dateInput.value = ""
  descriptionInput.value = ""
  taskForm.classList.toggle("hidden")
  currentTask = {}
}

const updateTaskContainer = () => {
  tasksContainer.innerHTML = ""
  // Rerender
  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
    <div class="task" id="${id}">
      <p><strong>Title:</strong>${title}</p>
      <p><strong>Date:</strong>${date}</p>
      <p><strong>Description:</strong>${description}</p>
      <button type="button" class="btn" onclick="editTask(this)">Edit</button>
      <button type="button" class="btn" onclick="deleteTask(this)">Delete</button>
    </div>
    `
  })
}

const deleteTask = (buttonEl) => {
  // Find the task to delete from taskData array
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  )
  // buttonEl.parentElement.id = deleteButton.parentElement.id = taskItem.id

  // Remove from DOM
  buttonEl.parentElement.remove()

  // Remove from taskData array
  taskData.splice(dataArrIndex, 1)
  // Start from the dataArrIndex index in taskData array, remove the first element from there

  localStorage.setItem("data", JSON.stringify(taskData))
  // Don't need to use removeItem() since this is an update on already existing data object on localStorage
}

const editTask = (buttonEl) => {
  // Find the task to edit from taskData array
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  )

  // Set as currentTask
  currentTask = taskData[dataArrIndex]

  // Update DOM: Stage the currentTask to each their Input elements
  titleInput.value = currentTask.title
  dateInput.value = currentTask.date
  descriptionInput.value = currentTask.description

  // Change the button text to Update
  addOrUpdateTaskBtn.innerText = "Update Task"

  // Display the Dialog Modal
  taskForm.classList.toggle("hidden")
}

if (taskData.length) {
  updateTaskContainer()
}

//- --------- Event Listeners --------- -
openTaskFormBtn.addEventListener("click", () => {
  taskForm.classList.toggle("hidden")
})

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value

  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal()
  } else {
    reset()
  }
})

cancelBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
})

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close()
  reset()
})

taskForm.addEventListener("submit", (e) => {
  e.preventDefault()

  addOrUpdateTask()
})
