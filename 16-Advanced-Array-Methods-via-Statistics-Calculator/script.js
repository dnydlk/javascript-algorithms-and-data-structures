const getMean = (array) =>
  array.reduce((acc, el) => acc + el, 0) / array.length

const getMedian = (array) => {
  // const sorted = array.slice().sort((a, b) => a - b)
  const sorted = array.toSorted((a, b) => a - b)

  if (sorted.length % 2 === 0) {
    return getMean([
      sorted[sorted.length / 2],
      sorted[sorted.length / 2 - 1],
    ])
  } else {
    return sorted[Math.floor(sorted.length / 2)]
  }
}

const getMode = (array) => {
  // Count the frequency of each element in the array
  // key = number; value = frequency
  const counts = {}
  // array.forEach((el) => (counts[el] = (counts[el] || 0) + 1))
  array.forEach(el => counts[el] = counts[el] ? (counts[el] + 1) : 1);

  // If all elements have the same frequency, return null (no mode)
  if (new Set(Object.values(counts)).size === 1) {
    return null
  }

  // Find the element with the highest frequency
  const highest = Object.keys(counts).sort(
    (a, b) => counts[b] - counts[a]
  )[0]

  // Find all elements that share the highest frequency
  const mode = Object.keys(counts).filter(
    (el) => counts[el] === counts[highest]
  )

  // Return the mode(s) as a comma-separated string
  return mode.join(", ")
}

const getRange = (array) => Math.max(...array) - Math.min(...array)

const getVariance = (array) => {
  const mean = getMean(array)
  // const differences = array.map((el) => el - mean)
  // const squaredDifferences = differences.map((el) => el**2)
  // const sumSquaredDifferences = squaredDifferences.reduce((acc, el) => acc + el, 0)
  const variance =
    array.reduce((acc, el) => {
      const difference = el - mean
      const squared = difference ** 2
      return acc + squared
    }, 0) / array.length
  return variance
}

const getStandardDeviation = (array) => {
  const variance = getVariance(array)
  // const standardDeviation = Math.pow(variance, 1/2)
  const standardDeviation = Math.sqrt(variance)
  return standardDeviation
}

const calculate = () => {
  // Get element's value
  const value = document.querySelector("#numbers").value
  // Remove , and space(s)
  const array = value.split(/,\s*/g)
  // Turn string num into numeric num
  // Filter out not-number items in the array
  const numbers = array
    .map((el) => Number(el))
    .filter((el) => !isNaN(el))
  // Mean
  const mean = getMean(numbers)
  document.querySelector("#mean").textContent = mean
  // Median
  const median = getMedian(numbers)
  document.querySelector("#median").textContent = median
  // Mode
  const mode = getMode(numbers)
  document.querySelector("#mode").textContent = mode
  // Range
  const range = getRange(numbers)
  document.querySelector("#range").textContent = range
  // Variance
  const variance = getVariance(numbers)
  document.querySelector("#variance").textContent = variance
  // StandardDeviation
  const standardDeviation = getStandardDeviation(numbers)
  document.querySelector("#standardDeviation").textContent =
    standardDeviation
}
