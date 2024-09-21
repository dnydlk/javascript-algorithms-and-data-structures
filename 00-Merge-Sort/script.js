function mergeSort(array) {
  if (array.length <= 1) {
    return array
  }

  const middle = Math.floor(array.length / 2)
  const leftArray = array.slice(0, middle)
  const rightArray = array.slice(middle)

  return merge(mergeSort(leftArray), mergeSort(rightArray))
}

function merge(leftArray, rightArray) {
  let sortedArray = []
  let i = 0,
    l = 0,
    r = 0

  // Merge the two arrays while comparing elements
  while (l < leftArray.length && r < rightArray.length) {
    if (leftArray[l] < rightArray[r]) {
      sortedArray[i] = leftArray[l]
      l++
    } else {
      sortedArray[i] = rightArray[r]
      r++
    }
    i++
  }

  // Append remaining elements from leftArray, if any
  while (l < leftArray.length) {
    sortedArray[i] = leftArray[l]
    l++
    i++
  }

  // Append remaining elements from rightArray, if any
  while (r < rightArray.length) {
    sortedArray[i] = rightArray[r]
    r++
    i++
  }

  return sortedArray
}

// Example usage
const array = [8, 2, 5, 3, 4, 7, 6, 1]
const sortedArray = mergeSort(array)
console.log("Sorted array:", sortedArray)
