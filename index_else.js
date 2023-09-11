//!import add function from function js file
//!import initializeApp, getDatabase from the URL 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref,onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-e807d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
//!Just to check whether our app is working or not
// console.log(app)                   
const database = getDatabase(app)
const booksInDB = ref(database, "books")
const booksEl=document.getElementById("books")
onValue(booksInDB, function (snapshot) {
    console.log(snapshot.value)
})

function clearBooksListEl() {
    booksEl.value = ""
}
function appendBookToBookListEl(bookValue) {
    booksEl.innerHTML += `<li>${bookValue}</li>`
}
