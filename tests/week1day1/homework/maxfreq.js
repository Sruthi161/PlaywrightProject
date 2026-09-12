// JavaScript program to find the most frequent element in an array 
let arr = [40, 50, 30, 40, 50, 30, 30];
let n = arr.length;

function mostFrequent(arr, n) {

    let maxcount = 0;
    let element_having_max_freq;
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = 0; j < n; j++) {
            if (arr[i] == arr[j])
                count++;
        }

        if (count > maxcount) {
            maxcount = count;
            element_having_max_freq = arr[i];
        }
    }

    return element_having_max_freq;
}

console.log(mostFrequent(arr, n)); 