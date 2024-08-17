//- Variables
const checkButton = document.getElementById("check-btn")
const clearButton = document.getElementById("clear-btn")
const userInputEl = document.getElementById("user-input")
const resultDiv = document.getElementById("results-div")
const phoneNumRegex =
  /^[1]?(?:\s|[(]|\s[(])?\d{3}(?:-|[)]|\s|[)]\s)?\d{3}(?:\s|-)?\d{4}$/
let numberVal
let phoneNumbers = []
/*
1 555-555-5555
1 (555) 555-5555
1(555)555-5555
1 555 555 5555
5555555555
555-555-5555
(555)555-5555
*/

//- Functions
const validatePhoneNumber = () => {
  if (isEmpty()) {
    alert("Please provide a phone number")
    return
  }

  update()
}

const update = () => {
  saveInputNumber()
  clearInputVal()
  phoneNumbers = JSON.parse(localStorage.getItem("phoneNumbers"))
  const HTMLString = (isValid, number) => `
        <span class="result-title">${
          isValid
            ? "Valid US number: " + number
            : "Invalid US number: " + number
        }</span>
      `

  clearResultDiv()
  phoneNumbers.forEach((el) =>
    phoneNumRegex.test(el)
      ? resultDiv.insertAdjacentHTML(
          "beforeend",
          HTMLString(true, el)
        )
      : resultDiv.insertAdjacentHTML(
          "beforeend",
          HTMLString(false, el)
        )
  )
}

const clearResultDiv = () => (resultDiv.innerHTML = "")

const saveInputNumber = () => {
  numberVal = userInputEl.value
  phoneNumbers.push(numberVal)
  console.log("List: " + phoneNumbers)
  localStorage.setItem("phoneNumbers", JSON.stringify(phoneNumbers))
  console.log(
    "localStorage: " +
      JSON.parse(localStorage.getItem("phoneNumbers"))
  )
}

const deleteNumObj = () => {
  clearResultDiv()
  phoneNumbers = []
  localStorage.removeItem("phoneNumbers")
  console.log(JSON.parse(localStorage.getItem("phoneNumbers")))
}

const isValidNumber = () => phoneNumRegex.test(numberVal)

const isEmpty = () => userInputEl.value.trim() === ""

const clearInputVal = () => (userInputEl.value = "")

window.onload = () => {
  update()
}

//- Event Listners
checkButton.addEventListener("click", validatePhoneNumber)

clearButton.addEventListener("click", deleteNumObj)

userInputEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter") validatePhoneNumber()
  if (e.key === "Escape") clearInputVal()
})

//todo: load from the localstorage window.onload?
//todo: remove the border of result container
/*
Valid US number: 1 (555) 555-5555
Valid US number: 1 (555) 555-5555
*/