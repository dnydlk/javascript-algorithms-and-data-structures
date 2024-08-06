const numberInputEl = document.getElementById("number")
const convertBtn = document.getElementById("convert-btn")
const outputPEl = document.getElementById("output")
const resultContainerEl = document.getElementById("result-container")
const romanMap = [
  { romanValue: "M", arabicValue: 1000 },
  { romanValue: "CM", arabicValue: 900 },
  { romanValue: "D", arabicValue: 500 },
  { romanValue: "CD", arabicValue: 400 },
  { romanValue: "C", arabicValue: 100 },
  { romanValue: "XC", arabicValue: 90 },
  { romanValue: "L", arabicValue: 50 },
  { romanValue: "XL", arabicValue: 40 },
  { romanValue: "X", arabicValue: 10 },
  { romanValue: "IX", arabicValue: 9 },
  { romanValue: "V", arabicValue: 5 },
  { romanValue: "IV", arabicValue: 4 },
  { romanValue: "I", arabicValue: 1 },
]

const displayErrorMsg = (msg) => {
  outputPEl.innerText = msg
  resultContainerEl.classList.add("error-msg")
  resultContainerEl.classList.remove("hide")
}

const displayResult = (result) => {
  console.log("displaying result: " + result)
  outputPEl.innerText = result
  resultContainerEl.classList.remove("error-msg")
  console.log("removed error-msg")
  resultContainerEl.classList.remove("hide")
  console.log("removed hide")
}

const isInputValid = (number) => {
  console.log("isInputValid()")

  if (number === 0 || !Number.isInteger(number)) {
    displayErrorMsg("Please enter a valid number")
    return
  } else if (number < 0) {
    displayErrorMsg("Please enter a number greater than or equal to 1")
  } else if (number > 3999) {
    displayErrorMsg("Please enter a number less than or equal to 3999")
  } else {
    return true
  }
}

const convertToRomanNumeric = (input, index = 0) => {
  if (input === 0) {
    return ""
  }
  const { romanValue, arabicValue } = romanMap[index]
  if (input >= arabicValue) {
    return romanValue + convertToRomanNumeric(input - arabicValue, index)
  } else {
    return convertToRomanNumeric(input, index + 1)
  }
}

convertBtn.addEventListener("click", () => {
  const number = Number(numberInputEl.value)
  console.log("convertBtn Clicked \n Number is \n", number)
  // const number = parseInt(numberInputEl.value)
  if (isInputValid(number)) {
   const result = convertToRomanNumeric(number)
   displayResult(result)
  }
})
