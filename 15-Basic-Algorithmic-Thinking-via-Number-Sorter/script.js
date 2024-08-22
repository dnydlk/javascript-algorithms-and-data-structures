const sortButton = document.getElementById("sort")

const sortInputArray = (event) => {
  event.preventDefault()
  const inputValues = [
    ...document.getElementsByClassName("values-dropdown"),
  ].map((dropdown) => Number(dropdown.value))
  // const sortedValues = bubbleSort(inputValues)
  // const sortedValues = selectionSort(inputValues)
  // const sortedValues = insertionSort(inputValues)
  const sortedValues = inputValues.sort((a, b) => a - b)
  updateUI(sortedValues)
}

const updateUI = (array = []) => {
  array.forEach((num, i) => {
    const outputValueNode = document.getElementById(
      `output-value-${i}`
    )
    outputValueNode.innerText = num
  })
}

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j]
        array[j] = array[j + 1]
        array[j + 1] = temp
      }
    }
  }
  return array
}


  const selectionSort = (array) => {
    // Iterate over each element of the array
    for (let i = 0; i < array.length; i++) {
      // Assume the minimum is at the current index
      let minIndex = i

      // Find the minimum element in the unsorted part of the array
      for (let j = i + 1; j < array.length; j++) {
        if (array[j] < array[minIndex]) {
          // Update minIndex with the new minimum element's index
          minIndex = j
        }
      }

      // Swap the found minimum element
      // with the first element of the unsorted section
      if (minIndex != i) {
        // Temporary variable to hold the value at index i
        const temp = array[i]
        // Place minimum element at the start of the unsorted section
        array[i] = array[minIndex]
        // Move the element originally at index i to the position of the minimum
        array[minIndex] = temp
      }
    }
    // Return the sorted array
    return array
  }


const insertionSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currValue = array[i]
    let j = i - 1
    while (j >= 0 && array[j] > currValue) {
      array[j + 1] = array[j]
      j--
    }
    array[j + 1] = currValue
  }
  return array
}

sortButton.addEventListener("click", sortInputArray)
