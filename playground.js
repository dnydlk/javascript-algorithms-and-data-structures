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
  console.log(counts)
  const frequencies = Object.values(counts)
  console.log(frequencies)
  const sumOfFrequencies = frequencies.reduce((acc, num) => acc + num, 0)
  console.log(sumOfFrequencies)
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
  return numOfStraights
  // if (numOfStraights === 5) {
  //   updateRadioOption(4, 40)
  //   return
  // } else if (numOfStraights === 4) {
  //   updateRadioOption(3, 30)
  //   return
  // } else {
  //   updateRadioOption(5, 0)
  //   return
  // }
}

console.log(checkForStraights([5, 2, 3, 4, 1]))
console.log(checkForStraights([2, 3, 4, 5, 6]))
console.log(checkForStraights([1, 2, 3, 4, 6]))
console.log(checkForStraights([2, 3, 4, 5, 5]))
console.log(checkForStraights([2, 3, 4, 4, 5]))
