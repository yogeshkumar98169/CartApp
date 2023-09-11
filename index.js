import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-b6d6b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function () {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
    // updateItemsList(inputValue)   //!it is to update the value of the items when no fetching from database
})

onValue(shoppingListInDB, function (snapshot) {
    // console.log(snapshot.val())     //!one method to get
    // let itemsValue=Object.values(snapshot.val())
    if (snapshot.exists()) {
        let itemsValue = Object.entries(snapshot.val())
        shoppingListEl.innerHTML = ""             //!To clear the shooping list empty before fetching
        for (let i = 0; i < itemsValue.length; i++) {
            let currentItem = itemsValue[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            updateItemsList(currentItem)

        }
        console.log(itemsValue)
    }
    else {
        shoppingListEl.innerHTML = "Please Enter items... "
    }
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
function updateItemsList(item) {
    // shoppingListEl.innerHTML += `<li>${inputValue}</li>`  //!for normal 

    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    shoppingListEl.append(newEl)
}
