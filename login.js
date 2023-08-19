import { auth, db,app, doc, getDoc } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

const formOpenBtn = document.querySelector("#open-form"),
home = document.querySelector(".home"),
formCloseBtn = document.querySelector("#close_form"),
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
 const loginBtn = document.getElementById("loginBtn")
 loginBtn.addEventListener("click",login)

 async function login(e){
    try {
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        console.log(email, password)
        loginBtn.innerHTML = `<div class="spinner-border text-light" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const userLogin = await signInWithEmailAndPassword(auth, email, password)
        console.log(userLogin)
        
        const docRef = doc(db,"users", userLogin.user.uid)
        const  docSnap = await getDoc(docRef)

        if(!docSnap.exists()){
            console.log("No Such Document")
            swal("Invalid user","Please First Signup")
            return
        }
        const userData = docSnap.data()
        localStorage.setItem("user", JSON.stringify(userData))

        window.location.replace("./Dashboard/dashboard.html")
    }
    catch (error) {
        console.log("error", error.message)
        loginBtn.className = "btn btn-danger"
        loginBtn.innerHTML = `Login`
        loginBtn.style.width = "100%"
        loginBtn.style.marginTop = "30px"
        loginBtn.style.padding = "10px 0"
        loginBtn.style.borderRadius = "10px"
        alert(error.message)
    }
 }