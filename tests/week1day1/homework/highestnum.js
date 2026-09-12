let numarr = [9, 2, 5, 8, 4, 3]

let highNum = arr => {
    let bigNum = arr[0]
    arr.forEach((val) => {
        if (val > bigNum)
            bigNum = val
    })
    console.log(bigNum)
}

highNum(numarr)