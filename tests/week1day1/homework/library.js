const { truncate } = require("fs");

let title; // string
let author; // string
let genre; // string
let available; // boolean

let catalog = []

function listbooks() {
    console.log(catalog)
}

function addBook(title, author, genre, available=true) {
    let newbook = []
    newbook[0] = title
    newbook[1] = author
    newbook[2] = genre
    newbook[3] = available
    catalog.push(newbook)
}

addBook("book1", "author1", "love")
addBook("book2", "author2", "crime")
listbooks()

function checkOutBook(title) {
    for (let i = 0; i < catalog.length; i++) {
        if (catalog[i][0] == title) {
            catalog[i][3] = false
        }
    }
}

checkOutBook("book1")
listbooks()

function returnBook(title) {
    for (let i = 0; i < catalog.length; i++) {
        if (catalog[i][0] == title) {
            if (catalog[i][3] == false) {
                catalog[i][3] = true
            } else { 
                console.log("Book is already in library - you can't return it")
            }
        }
    }
}

returnBook("book1")
listbooks()