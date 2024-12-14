const changedueElement = document.getElementById("change-due")
const cashInput = document.getElementById("cash")
const purchaseBtn = document.getElementById("purchase-btn")
const priceElement = document.getElementById("price")
const changeInDrawElements = document.querySelectorAll("label ~ p > span")
let cashDrawer

let price = 3.26
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]
const currencyValues = [
  ["Penny", 0.01],
  ["Nickel", 0.05],
  ["Dime", 0.1],
  ["Quarter", 0.25],
  ["One", 1],
  ["Five", 5],
  ["Ten", 10],
  ["Twenty", 20],
  ["One Hundred", 100],
]

class Currency {
  constructor(name, amount, faceValue) {
    this.name = name
    this._faceValue = faceValue
    this.amount = amount || 0
  }
  getFaceValue() {
    return this._faceValue
  }
  hasSufficientAmount() {
    return parseFloat((this.amount - this._faceValue).toFixed(2)) > 0
  }
}

class CashDrawer {
  constructor(cid, currencyValues) {
    this.currencies = []
    for (let i = 0; i < cid.length; i++) {
      this.currencies.push(
        new Currency(currencyValues[i][0], cid[i][1], currencyValues[i][1])
      )
    }
  }

  getTotalAmount() {
    let total = 0
    this.currencies.forEach((currency) => {
      total += currency.amount
    })
    return parseFloat(total.toFixed(2))
  }

  getCurrencyArray() {
    return this.currencies
  }

  calculateChange(cashReceived, itemPrice) {
    let changeNeeded = parseFloat((cashReceived - itemPrice).toFixed(2))
    console.log("changeNeeded: $", changeNeeded)

    //- "Status: INSUFFICIENT_FUNDS" if cash-in-drawer is less than the change due
    console.log("total change amount in the drawer: $" + this.getTotalAmount())
    if (this.getTotalAmount() < changeNeeded) {
      return { canBreakChange: false, status: "INSUFFICIENT_FUNDS" }
    }

    let changeArray = []
    let currencies = this.getCurrencyArray()

    for (let i = currencies.length - 1; i >= 0; i--) {
      let currency = currencies[i]
      let faceValue = currency.getFaceValue()
      let currencyName = currency.name
      let currencyTotalAmount = 0

      while (changeNeeded >= faceValue && currency.amount >= faceValue) {
        // console.log(`ChangeNeeded: ${changeNeeded} - ${faceValue}`)
        changeNeeded = parseFloat((changeNeeded - faceValue).toFixed(2))
        currency.amount = parseFloat((currency.amount - faceValue).toFixed(2))
        currencyTotalAmount = parseFloat(
          (currencyTotalAmount + faceValue).toFixed(2)
        )
      }
      if (currencyTotalAmount > 0) {
        changeArray.push([currencyName, currencyTotalAmount])
      }
    }

    if (changeNeeded > 0) {
      return { canBreakChange: false, status: "INSUFFICIENT_FUNDS" }
    }
    if (this.getTotalAmount() === 0) {
      return { canBreakChange: true, status: "CLOSED", changeArray }
    }
    return { canBreakChange: true, status: "OPEN", changeArray }
  }
}

// window.onload = () => init()

const resetCashInput = () => (cashInput.value = "")

const updateChangeInDrawer = () => {
  for (let i = 0; i < cid.length; i++) {
    changeInDrawElements[i].textContent = `$${
      cashDrawer.getCurrencyArray()[i].amount
    }`
  }
}

const updateStatus = (text) => {
  changedueElement.innerHTML = `<p>${text}</p>`
  changedueElement.style.display = "block"
}

const updateChangeDue = (changeArray) => {
  for (let i = 0; i < changeArray.length; i++) {
    changedueElement.innerHTML += `<p>${changeArray[i][0].toUpperCase()}: $${
      changeArray[i][1]
    }</p>`
  }
  changedueElement.style.display = "block"
}

const resetChangeDueElement = () => {
  changedueElement.innerHTML = ""
  changedueElement.style.display = "none"
}

const isCashInputValid = (cash) => {
  if (cash === 0) {
    alert("Please enter a valid number")
    resetCashInput()
    return false
  } else if (cash < price) {
    alert("Customer does not have enough money to purchase the item")
    resetCashInput()
    return false
  } else if (cash === price) {
    updateStatus("No change due - customer paid with exact cash")
    resetCashInput()
    return false
  } else {
    return true
  }
}

const purchase = (cash) => {
  console.log(
    "Customer handed $" + Number(cash) + "\nItem price is:  $" + price
  )

  resetChangeDueElement()
  cash = Number(cash)

  if (!isCashInputValid(cash)) {
    return
  }

  // Reinstantiate cashDrawer with the current cid and currencyValues
  const cashDrawer = new CashDrawer(cid, currencyValues)
  const result = cashDrawer.calculateChange(cash, price)
  console.log(result)

  if (!result.canBreakChange) {
    updateStatus(`Status: ${result.status}`)
    return
  }

  updateStatus(`Status: ${result.status}`)
  updateChangeDue(result.changeArray)
  updateChangeInDrawer()

  return
}

purchaseBtn.addEventListener("click", () => {
  purchase(cashInput.value)
  resetCashInput()
})

cashInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    purchase(cashInput.value)
    resetCashInput()
  }
  if (e.key === "Escape") {
    resetCashInput()
  }
})

cashDrawer = new CashDrawer(cid, currencyValues)
priceElement.textContent = `$${price}`
updateChangeInDrawer()
