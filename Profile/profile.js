import { auth, db, app, collection, getDocs, doc, updateDoc } from "../firebase.js";

const logoutBtn = document.getElementById("logout")
const profile = document.getElementById("profile")

window.addEventListener("load",getAllUser)

async function getAllUser() {

    const docsRef = await getDocs(collection(db, "users"))
    docsRef.forEach((doc) => {
        const user = doc.data()
            console.log("docs", doc.id, user)
            const rowUi = `<div class="card mt-5 container" style="width: 18rem;">
            <img src="${user.imageUrl}" class="card-img-top" alt="...">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${user.fullName}</li>
              <li class="list-group-item">${user.lastName}</li>
              <li class="list-group-item">${user.email}</li>
            </ul>
          </div>`

            profile.innerHTML = rowUi
    })
}
logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})