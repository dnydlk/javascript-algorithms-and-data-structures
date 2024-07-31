const textInput = document.getElementById("text-input")
const checkButton = document.getElementById("check-btn")
const resultText = document.getElementById("result")

// let text;

const checkEmptyInput = () => {
  console.log("🚀 ~ checkInput ~ textInput.value:\n", textInput.value)
  if (textInput.value.length === 0) {
    alert("Please input a value")
    return false
  } else {
    return true
  }
}

const setResultText = (isOrNot) => {
  resultText.textContent = `${textInput.value} ${isOrNot ? "is" : "is not"} a palindrome`
  textInput.value = ""
  resultText.classList.remove("hide")
}

const cleanInputText = () => {
  const regex = /[^a-zA-Z0-9]/g
  return textInput.value.replace(regex, "").toLowerCase()
}

const checkPalindrome = () => {
  const value = cleanInputText()
  const length = value.length

  if (length === 1) {
    setResultText(true)
    return
  }

  let left = 0
  let right = length - 1

  while (left < right) {
    if (value[left] !== value[right]) {
      setResultText(false)
      return
    }
    left++
    right--
  }
  setResultText(true)
}

checkButton.addEventListener("click", () => {
  if (checkEmptyInput()) {
    checkPalindrome()
  }
})
