import { auth, db, app, doc, getDoc, collection, addDoc, getDocs } from "../firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";


const logoutBtn = document.getElementById("logout")
const getUser = document.getElementById("getUser")

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("productForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
window.addEventListener("load", loginUser)
const productParent = document.getElementById("productParent")
function loginUser() {
    if (localStorage.getItem("user") === null) {
        window.location.replace("../index.html")
        return
    }
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            getUser.textContent = `${userData.fullName}`;
        }
    }
})

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log(doc.data())
        const getData = doc.data();
        console.log(getData)
        productParent.innerHTML += `<div class="card mt-5">
        <div class="card-body">
          <h5 class="card-title">${getData.name}</h5>
          <p class="card-text">${getData.desc}</p>
          <button class="edit-button btn btn-primary">Edit</button>
          <button class="delete-button btn btn-danger">Delete</button>
        </div>
      </div>
        
        `
    })

}

async function addproduct(e) {
    e.preventDefault();
    try {
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value

        if(!productName || !productDesc){
            swal("ERROR","Please Add Some Text")
            return
        }
        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
        }
        console.log("Add", productObj)

        await addDoc(productCollection, productObj)
        alert("Product Added Successfully")


    } catch (error) {
        alert(error.message)
    }

}

document.addEventListener('click', function () {
    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');
  
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const itemText = this.parentNode.querySelector('.card-text');
        const newText = prompt('Edit the item:', itemText.textContent);
        if (newText !== null) {
          itemText.textContent = newText;
        }
      });
    });

    deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
    const listItem = button.parentNode;
    listItem.remove();
  });
});;
});
  


logoutBtn.addEventListener("click", function(){
    localStorage.removeItem("user")
    window.location.replace("../index.html")
})