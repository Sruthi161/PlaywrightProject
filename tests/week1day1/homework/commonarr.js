//If given two arrays, write a program to find common numbers in them add them to a new array, and return them. 
// If nothing is common, return an empty array

let arr1 = [10, 20, 30, 40, 50]

let arr2 = [15, 25, 35, 45, 50]

let commarr = []

let m = arr1.length
let n = arr2.length

function commonNum(arr1, arr2) {

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (arr1[i] == arr2[j])
                commarr.push(arr1[i])
        }
    }
    return commarr
}

console.log(commonNum(arr1, arr2))