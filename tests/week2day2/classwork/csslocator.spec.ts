

/*
Css selector ways

# - find by id
. - find by class
^= starts with
$= ends with
*= contains (substring)

1st ele selector + tag name - immediate sibling
1st ele selector ~ tag name - all siblings

Parent selector space descendant selector
*/

// // url - https://www.saucedemo.com/v1/index.html

// input[id = 'user-name'] or input#user-name

// input[class= 'form_input'] or input.form_input

// input[placeholder = 'Username']

// //sibling

// input[class= 'form_input'] + input

// // All add to cart buttons - starts with

// button[class^= 'btn_primary']

// // link with href ends with ".html"

// a[href$ = '.html']

// // contains

// a[href *= 'saucelabs.com']