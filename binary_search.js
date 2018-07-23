// assume sortedArray is ascending
function binarySearch (sortedArray, target, lowIndex, highIndex) {
  if (sortedArray.length === 0) { return}

  if (lowIndex === undefined) {lowIndex = 0}
  if (highIndex === undefined) {highIndex = sortedArray.length - 1}

  var middleIndex = Math.floor((lowIndex + highIndex) / 2)

  if (sortedArray[middleIndex] === target) {
    return middleIndex
  } else {
    if (sortedArray[middleIndex] > target) {
      highIndex = middleIndex - 1
    } else {
      lowIndex = middleIndex + 1
    }

    if (lowIndex > highIndex) {return }

    return binarySearch(sortedArray, target, lowIndex, highIndex)
  }
}