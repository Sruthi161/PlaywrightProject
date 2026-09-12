//function callbacks

function userinfo(cb,db) {
    console.log(`Print user info`)
    cb(db)
}

function pushtodb(whichDb) {
    console.log(`adding user to ${whichDb}`)
}

userinfo(pushtodb, "sql")


let browsers = ["chrome", "safari", "firefox", "edge"]

// callback used on forEach loops in Js
browsers.forEach(function(val,ind,strarr) {
    console.log(`Launching ${val} on index number ${ind} from ${strarr}`)
})

//using fat arrow
browsers.forEach((val, ind) => {
    console.log(`Launching ${val} on index number ${ind}`)
})