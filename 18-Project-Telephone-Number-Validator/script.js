//- Variables
const checkButton = document.getElementById("check-btn")
const clearButton = document.getElementById("clear-btn")
const userInput = document.getElementById("user-input")
const resultDiv = document.getElementById("results-div")

//- Functions
const validatePhoneNumber = (input) => {
  if (isEmpty(input)) {
    alert("Please provide a phone number")
    return
  }

  const phoneNumRegex = /^[1]?(?:\s?\(\d{3}\)|\s?\d{3})(?:[-\s]?)\d{3}[-\s]?\d{4}$/
  const isNumValid = phoneNumRegex.test(input)

  const resultObj = {
    number: input,
    isValid: isNumValid,
  }

  saveResult(resultObj)
  appendResultToDOM(resultObj)
}

const isEmpty = (input) => input === ""

const appendResultToDOM = (result) => {
  const spanEl = document.createElement("span")
  spanEl.className = "result-num"
  spanEl.classList.add(result.isValid ? "valid" : "invalid")
  const spanText = document.createTextNode(`${result.isValid ? "Valid" : "Invalid"} US number: ${result.number}`)
  spanEl.appendChild(spanText)
  resultDiv.appendChild(spanEl)
}

const saveResult = (result) => {
  let results = JSON.parse(localStorage.getItem("phoneResults")) || []
  results.push(result)
  localStorage.setItem("phoneResults", JSON.stringify(results))
}

const loadResultsFromLocalStorage = () => {
  let results = JSON.parse(localStorage.getItem("phoneResults")) || []
  results.forEach((result) => appendResultToDOM(result))
}

const clearResults = () => {
  resultDiv.innerHTML = ""
  localStorage.removeItem("phoneResults")
}

//- Event Listeners
checkButton.addEventListener("click", () => {
  validatePhoneNumber(userInput.value)
  userInput.value = ""
})

clearButton.addEventListener("click", () => {
  clearResults()
  userInput.value = ""
})

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    validatePhoneNumber(userInput.value)
    userInput.value = ""
  }
  if (e.key === "Escape") userInput.value = ""
})

window.onload = () => {
  loadResultsFromLocalStorage()
}
