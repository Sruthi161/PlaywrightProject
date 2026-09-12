let numarr = [1, 2, 3, 4, 5]

let sumOfArray = arr => {
    let sum = 0
    arr.forEach((val) => {
        sum = sum + val
    })
    console.log(sum)
}

sumOfArray(numarr)