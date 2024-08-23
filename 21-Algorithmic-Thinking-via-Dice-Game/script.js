const listOfAllDice = document.querySelectorAll(".die")
const scoreInputs = document.querySelectorAll("div > input")
const scoreSpans = document.querySelectorAll("label > span")
const roundElement = document.getElementById("current-round")
const rollsElement = document.getElementById("current-round-rolls")
const totalScoreElement = document.getElementById("total-score")
const scoreHistory = document.getElementById("score-history")
const rollDiceBtn = document.getElementById("roll-dice-btn")
const keepScoreBtn = document.getElementById("keep-score-btn")
const rulesContainer = document.querySelector(".rules-container")
const rulesBtn = document.getElementById("rules-btn")

let diceValuesArr = []
let isModalShowing = false
let score = 0
let round = 1
let rolls = 0

const showRules = () => {
  rulesContainer.style.display = isModalShowing ? "none" : "block"
  rulesBtn.textContent = isModalShowing ? "Show rules" : "Hide rules"
  isModalShowing = !isModalShowing
}

const rollDice = () => {
  diceValuesArr = []
  for (let index = 0; index < 5; index++) {
    diceValuesArr[index] = Math.floor(Math.random() * 6 + 1)
  }

  for (let index = 0; index < diceValuesArr.length; index++) {
    listOfAllDice[index].textContent = diceValuesArr[index]
  }
}

const updateStats = () => {
  roundElement.textContent = round
  rollsElement.textContent = rolls
}

const updateScore = (selectedValue, achieved) => {
  score += parseInt(selectedValue, 10)
  totalScoreElement.textContent = score

  const liElement = document.createElement("li")
  liElement.textContent = `${achieved} : ${selectedValue}`
  scoreHistory.appendChild(liElement)
}

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false
  scoreInputs[index].value = score
  scoreSpans[index].textContent = `, score = ${score}`
}

const getHighestDuplicates = (array) => {
  console.log(array)
  const sum = array.reduce((acc, num) => acc + num, 0)
  const counts = {}
  array.forEach((num) => (counts[num] = (counts[num] || 0) + 1))
  const highest = Object.values(counts).sort((a, b) => b - a)[0]
  if (highest === 4) {
    updateRadioOption(1, sum)
    updateRadioOption(0, sum)
    return
  } else if (highest === 3) {
    updateRadioOption(0, sum)
    return
  } else if (highest < 3) {
    updateRadioOption(5, 0)
    return
  }
}

const detectFullHouse = (array) => {
  const counts = {}
  array.forEach((num) => (counts[num] = (counts[num] || 0) + 1))
  const frequencies = Object.values(counts)
  const sumOfFrequencies = frequencies.reduce((acc, num) => acc + num, 0)
  if (Object.values(counts).length === 2 && sumOfFrequencies === 5) {
    updateRadioOption(2, 25)
    return
  } else {
    updateRadioOption(5, 0)
    return
  }
}

const checkForStraights = (array) => {
  let numOfStraights = 1
  const sortedArray = array.slice().sort((a, b) => a - b)
  for (let i = 0; i < sortedArray.length - 1; i++) {
    if (sortedArray[i] + 1 === sortedArray[i + 1]) {
      numOfStraights++
    } else {
      break
    }
  }
  if (numOfStraights === 5) {
    updateRadioOption(4, 40)
    updateRadioOption(3, 30)
    return
  } else if (numOfStraights === 4) {
    updateRadioOption(3, 30)
    return
  } else {
    updateRadioOption(5, 0)
    return
  }
}

const resetRadioOptions = () => {
  scoreInputs.forEach((scoreInput) => {
    scoreInput.disabled = true
    scoreInput.checked = false
  })
  scoreSpans.forEach((scoreSpan) => (scoreSpan.textContent = ""))
}

const resetGame = () => {
  for (const die of listOfAllDice) {
    die.textContent = "0"
  }
  score = 0
  rolls = 0
  round = 1
  totalScoreElement.textContent = score
  scoreHistory.innerHTML = ""
  rollsElement.textContent = rolls
  roundElement.textContent = round
  resetRadioOptions()
}

rulesBtn.addEventListener("click", showRules)

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("You have made three rolls this round. Please select a score.")
  } else {
    rolls++
    rollDice()
    updateStats()
    resetRadioOptions()
    getHighestDuplicates(diceValuesArr)
    detectFullHouse(diceValuesArr)
  }
})

keepScoreBtn.addEventListener("click", () => {
  const checkedInputElement = document.querySelector('#score-options input[type="radio"]:checked')
  const selectedValue = checkedInputElement.value
  const achieved = checkedInputElement.id

  if (checkedInputElement != null) {
    updateScore(selectedValue, achieved)
    resetRadioOptions()
    rolls = 0
    round++
    updateStats()
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`)
        resetGame()
      }, 500)
    }
  } else {
    alert("Please select an option or roll the dice")
  }
})
