console.log(Math.min())

const nodupes = (nums) => {
    const object = {}
    nums.map((num) => object[num] = (object[num] | 0) + 1)
    return Object.keys(object).map((n) => parseInt(n))
  }

console.log(nodupes([1,1,2,2,3]));