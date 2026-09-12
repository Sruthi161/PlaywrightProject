let age = 26
console.log(age,"--",typeof(age))

let name = "Manoj"
console.log(name,"--",typeof(name))

let checkboolean = true
console.log(checkboolean,"--",typeof(checkboolean))

let decimal = 285.674
console.log(decimal, "--", typeof (decimal))

//modifying
age = 28.5
console.log("modified age variable", age, "--", typeof (age))

const abc = 267
console.log("const var", abc)

let browsers = ["chrome", "safari", "firefox"]
console.log(browsers, "type-",typeof (browsers), "length of browsers-", browsers.length)

browsers.push("edge")
console.log(browsers, "--", typeof (browsers), "length of browsers-", browsers.length)

console.log(`My preferred browser is ${browsers[0]}`)

browsers[3] = "webkit"
console.log(browsers)

browsers.pop()
console.log(browsers, "--", typeof (browsers))


//anonymous function declaration

let add = function sum(a,b) {
    return a+b
}

console.log(add(3,4))

// function expression
// fat arrow function with return
let newfunc = (a, b) => {
    return a + b
}

console.log(newfunc(4, 5))

// fat arrow function without return

let sum = (a, b) => a + b

console.log(sum(6, 7))