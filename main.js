const nameInput = document.querySelector("#name-input")
const priceInput = document.querySelector("#price-input");
const addBtn = document.querySelector("#add-btn");
const listArea = document.querySelector(".list");
const statusChexkBox = document.querySelector("#status-check");
const sumInfo = document.querySelector("#sum-info")
const deleteBtn = document.querySelector("#delete-btn");
const editBtn = document.querySelector("#edit-btn");
const userInfo = document.querySelector("#user-input");
const select = document.querySelector("#select");
const paidInfo = document.querySelector("#paid-info");
const notPaidInfo = document.querySelector("#not-paid-info");


addBtn.addEventListener("click",addExpence);
listArea.addEventListener("click",handleUpdate);
select.addEventListener("change",handeSelect);

let sumPrice = 0;
let paidPrice = 0;
let notPaidPrice = 0;
let listPaid= [];
let listNotPaid = []
let listAll = []

//harcama ekle
function addExpence(event) {
    //sayfayı yenilemeyi engelle
    event.preventDefault();
    if(!nameInput.value || !priceInput.value) {
        alert("Alanlar boş olamaz")
        return
    }

    const expenseDiv = document.createElement("div");
    expenseDiv.classList.add("expence")

    var urun =  {
        name:nameInput.value,
        price: priceInput.value
    }
    listAll.push(urun)

    // ödenip ödenmediğini kontrol et
    if(!statusChexkBox.checked) {
        expenseDiv.classList.add("paid");
        listPaid.push(urun)
        updatePaidPrice(priceInput.value);
        
        
    }else {
        listNotPaid.push(urun)
        updateNotPaidPrice(priceInput.value)
    }
   
    expenseDiv.innerHTML= `
    <h2 class= "name">${nameInput.value}</h2>
    <h2 class= "price">${priceInput.value} &#x20BA;</h2>
    <div class="btns">
         <i id="edit-btn" class="fa-regular fa-credit-card"></i>
         <i id="delete-btn" class="fa-solid fa-trash"></i>
    </div>
    `
    listArea.appendChild(expenseDiv)
    //toplamı değiştir
    updateTotalSum(priceInput.value)
    
    clearInputsAndCheckBox()
}
const  clearInputsAndCheckBox = ()=> {
    nameInput.value =""
    priceInput.value = ""
    statusChexkBox.value=false;
}

const updateTotalSum = (price) => {
    sumPrice += Number(price);

    sumInfo.innerText = sumPrice;
}
const updatePaidPrice = (price) => {
    paidPrice += Number(price);
    paidInfo.innerText = paidPrice;
    
}
const updateNotPaidPrice = (price) => {
    notPaidPrice += Number(price);
    notPaidInfo.innerText = notPaidPrice;
}
function handleUpdate (event) {
    const item =event.target

    const parent = item.parentElement.parentElement

    

    if(item.id == "delete-btn") {
        parent.remove();
        //toplamaı güncelle
        const price = parent.querySelector(".price").textContent
        const name = parent.querySelector(".name").textContent

    
        const numPrice =Number(price.toString().substring(0,2))*-1
        updateTotalSum(numPrice);
       
        //listeden de sil
       for(let i =0; i<listAll.length;i++){
        if(listAll[i].name==name && listAll[i].price) {
            listAll.splice(i,1);
            break;
        }
       }
      

        if(parent.classList.contains("paid")) {  //nakit
            updatePaidPrice(numPrice)
              //listeden de sil
            for(let i =0; i<listPaid.length;i++){
                if(listPaid[i].name==name && listPaid[i].price) {
                    listPaid.splice(i,1);
                    break;
                }
            }

        }else {
           
            updateNotPaidPrice(numPrice)

              //listeden de sil
              for(let i =0; i<listNotPaid.length;i++){
                if(listNotPaid[i].name==name && listNotPaid[i].price) {
                    listNotPaid.splice(i,1);
                    break;
                }
            }
        }
        
       
    }else if(item.id=="edit-btn") {

        parent.classList.toggle("paid");

        //ödenen ve ödenmeyenleri güncelle

        const price = parent.querySelector(".price").textContent

        const numPrice =Number(price.toString().substring(0,2))*-1;

        if(parent.classList.contains("paid")) {
            updatePaidPrice(numPrice*-1);
            updateNotPaidPrice(numPrice)
        }else {
            updateNotPaidPrice(numPrice*-1)
            updatePaidPrice(numPrice)
           
        }
        
    }
}

/* kullanıcıyı locale kaydetme */

function saveUser(event) {
    localStorage.setItem("user",event.target.value)
}

function getUser () {
    const userName = localStorage.getItem("user") || "";

    userInfo.value = userName
}

function handeSelect() {

   
    listArea.innerHTML = ``;
    if(select.value == "paid") {
        listPaid.map(urun => {
            const expenseDiv = document.createElement("div");
            expenseDiv.classList.add("expence")
            expenseDiv.classList.add("paid");
            expenseDiv.innerHTML= `
            <h2 class= "name">${urun.name}</h2>
            <h2 class= "price">${urun.price} &#x20BA;</h2>
            <div class="btns">
                <i id="edit-btn" class="fa-regular fa-credit-card"></i>
                <i id="delete-btn" class="fa-solid fa-trash"></i>
            </div>
            `
            listArea.appendChild(expenseDiv)
        })
    }else if( select.value =="not-paid") {
        listNotPaid.map(urun => {
            const expenseDiv = document.createElement("div");
            expenseDiv.classList.add("expence")
            expenseDiv.innerHTML= `
            <h2 class= "name">${urun.name}</h2>
            <h2 class= "price">${urun.price} &#x20BA;</h2>
            <div class="btns">
                <i id="edit-btn" class="fa-regular fa-credit-card"></i>
                <i id="delete-btn" class="fa-solid fa-trash"></i>
            </div>
            `
            listArea.appendChild(expenseDiv)
        })
    }else {
        listAll.map(urun => {
            const expenseDiv = document.createElement("div");
            expenseDiv.classList.add("expence")
            if(listPaid.includes(urun)) {
                expenseDiv.classList.add("paid");
            }
            expenseDiv.innerHTML= `
            <h2 class= "name">${urun.name}</h2>
            <h2 class= "price">${urun.price} &#x20BA;</h2>
            <div class="btns">
                <i id="edit-btn" class="fa-regular fa-credit-card"></i>
                <i id="delete-btn" class="fa-solid fa-trash"></i>
            </div>
            `
            listArea.appendChild(expenseDiv)
        })
    }
}