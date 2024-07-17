const character = "!"
const count = 10
const rows = []
let inverted = false

function padRow(rowNumber, rowCount) {
  return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber)
}

for (let i = 1; i <= count; i++) {
  if (inverted) {
    rows.unshift(padRow(i, count))
  } else {
    rows.push(padRow(i, count))
  }
}

let result = ""

for (const row of rows) {
  result = result + "\n" + row
}

console.log(result)

// Below are testing codes
// let number = Math.floor(Math.random() * 50) + 51      
// console.log(number)

// let arr = [1, 2, 3];
// let num = arr.push(1);
// console.log(arr); // [1, 2, 3, 1]
// console.log(num); // 4

// let arr = [1, 2, 3];
// let lastElement = arr.pop();
// console.log(arr); // [1, 2]
// console.log(lastElement); // 3

// let arr = [1, 2, 3]
// let firstElement = arr.shift()
// console.log(arr) // [2, 3]
// console.log(firstElement) // 1

// let arr = [2, 3];
// let newLength = arr.unshift(1);
// console.log(arr); // [1, 2, 3]
// console.log(newLength); // 3