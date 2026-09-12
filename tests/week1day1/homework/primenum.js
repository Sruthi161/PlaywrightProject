function isPrime(ipnum) {
    let flag = true
    for (let i = 2; i <= ipnum / 2; i++) {
        if (ipnum % i == 0) {
            flag = false
        }
    }
    return flag
}

function printPrimeNum(limit) {
    for (i = 2; i <= limit; i++) {
        if (isPrime(i)) {
            console.log(i)
        }
    }
}

let limit = 100
printPrimeNum(limit)