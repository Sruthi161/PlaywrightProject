const { reverse } = require("dns")

let a = 12321

let rev = parseInt(String(a).split("").reverse().join(""))

if (a === rev) {
    console.log(`${a} is a palindrome`)
} else {
    console.log(`${a} is not a palindrome`)
}