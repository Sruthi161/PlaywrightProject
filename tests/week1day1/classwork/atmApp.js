let availableBal = 10000
let balArr = [availableBal]
let numOfTrans = prompt("Enter how many transactions you wanna do?")

atmApp(numOfTrans)

function atmApp(transCount) {
    let i = 1
    while (i <= numOfTrans) {
        console.log(`Trasanction number ${i}`)
        let cardNumip = prompt("Enter Card Number")
        validateCard(cardNumip)
        i++
    }
    }

function validateCard(cardNum) {
    if (cardNum == 1234) {
        console.log(`Welcome Manoj`)
        let atmPin = prompt("Enter your ATM Pin")
        validatePin(atmPin)
    } else {
        console.log(`Card number doesn't match with our records`)
    }
}

function validatePin(pinNum) {
    if (pinNum == 2345) {
        console.log(`How much money you want to withdraw?`)
        let amttowd = prompt("Enter amount to withdraw")
        withdraw(amttowd)
    } else {
        console.log(`Entered Pin number is incorrect`)
    }
}

function withdraw(wdamt) {
    if (wdamt <= availableBal) {
        availableBal = availableBal - wdamt
        balArr.push(availableBal)
        console.log(`withdrawn balance : ${wdamt}`)
        console.log(`Your current balance after withdrawal : ${availableBal}`)
        let lastBal = prompt("Do you want to see previous balances")
        if (lastBal == "Yes") {
            console.log(balArr)
        } else {
            console.log(`See you next time`)
        }
    } else {
        console.log(`Withdrawl declined due to low balance : Enter less than ${availableBal}`)
    }
}



