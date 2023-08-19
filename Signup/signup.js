import { auth, db, app, doc, setDoc } from "../firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),
formCloseBtn = document.querySelector(".form_close"),
pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach(icon => {
    icon.addEventListener("click", () => {
        let getPwInput = icon.parentElement.querySelector("input");
        if(getPwInput.type === "password") {
            getPwInput.type = "text";
            icon.classList.replace("uil-eye-slash","uil-eye");
        }
        else{
            getPwInput.type = "password";
            icon.classList.replace("uil-eye","uil-eye-slash");
        }
    })
})

const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const fullName = document.getElementById("fullName").value
        const lastName = document.getElementById("lastName").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const repeatPassword = document.getElementById("passwordRepeat").value

        if (!fullName || !lastName || !email || !password || !repeatPassword) {
            swal("Please fill All Required Field")
            return
        }

        if(password !== repeatPassword){
            swal("Password Does Not Match")
            return false
        }

        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)
        const uid = userAuth.user.uid
        const userObj = {
            fullName,
            lastName,
            email,
            accountActivate: true,
            uid
        }
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        window.location.assign("../index.html")
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
    }
}