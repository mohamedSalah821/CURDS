
var productNameInput = document.getElementById('productName'); 
var productPriceInput = document.getElementById('productPrice'); 
var productCategoryInput = document.getElementById('productCategory'); 
var productDescriptionInput = document.getElementById('productDescription'); 
var productImageInput = document.getElementById('productImage'); 
var rowData =document.getElementById('rowData');
var searchTerm = document.getElementById('searchTerm');
var addBtn = document.getElementById('addBtn');
var updateBtn = document.getElementById('updateBtn');
var alertForm = document.getElementById('alertForm');

var temp;

var productItems;

if (localStorage.getItem('productList') != null) {
    productItems=JSON.parse(localStorage.getItem('productList'));
    displayProduct(productItems);
}
else{
    productItems=[];
}


function addProduct(){
   

    var product={
        name: productNameInput.value,
        price: productPriceInput.value,
        category :productCategoryInput.value,
        desc:productDescriptionInput.value,
        im:`images/${productImageInput.files[0]?.name}`
    }
    if (productNameInput.classList.contains('is-valid')&&
    productCategoryInput.classList.contains('is-valid')&&
    productPriceInput.classList.contains('is-valid')&&
    productDescriptionInput.classList.contains('is-valid')) {
        productItems.push(product);
        localStorage.setItem('productList',JSON.stringify(productItems));
        clearProduct();
        displayProduct(productItems);
        alertForm.classList.add('d-none');

}else{
    alertForm.classList.remove('d-none');

}
   
}

function clearProduct(){
    productNameInput.value='';
    productPriceInput.value='';
    productCategoryInput.value='';
    productDescriptionInput.value='';
    productImageInput.value='';

}

function displayProduct(list){
    var cartone='';
    for(var i=0;i<list.length;i++)
        {
            cartone+=`<div class="col-lg-3 col-sm-6">
            <div class="card ">
            <img src="${list[i].im}" class="w-100 mt-2"  alt="brokenImage">
            <div class="card-body">
                <h2 class="h3">${list[i].name}</h2>
                <p class="text-secondary">${list[i].desc}</p>
                <h3 class="h5">Category : <span>${list[i].category}</span></h3>
                <h3 class="h5">Price : <span>${list[i].price}</span></h3>
                <button class="btn btn-outline-danger w-100" onclick="deleteProduct(${i})">Delete</button>
                <button class="btn btn-outline-dark mt-2 w-100" onclick="setFormForUpdate(${i})">Update</button>

                

            </div>
        </div>
        </div>`
        }
        rowData.innerHTML=cartone ;

}

function deleteProduct(indexNumber)
{
productItems.splice(indexNumber , 1)
localStorage.setItem('productList',JSON.stringify(productItems));
displayProduct(productItems);
}

function search() {
    
searchResults=[];
    for(var i=0;i<productItems.length;i++)
        {
            if (productItems[i].name.toLowerCase().includes(searchTerm.value.toLowerCase())==true) {
             searchResults.push(productItems[i]);
            }
           
        }

displayProduct(searchResults);
    
}

function setFormForUpdate(updateIndex) {

addBtn.classList.add('d-none');
updateBtn.classList.remove('d-none');

productNameInput.value=productItems[updateIndex].name;
productPriceInput.value=productItems[updateIndex].price;
productCategoryInput.value=productItems[updateIndex].category;
productDescriptionInput.value=productItems[updateIndex].desc;

temp=updateIndex;

}

function updateProduct() {
    productItems[temp].name=productNameInput.value;
    productItems[temp].price=productPriceInput.value;
    productItems[temp].category=productCategoryInput.value;
    productItems[temp].desc=productDescriptionInput.value;
    localStorage.setItem('productList',JSON.stringify(productItems));
    displayProduct(productItems);
    addBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    productNameInput.value='';
    productPriceInput.value='';
    productCategoryInput.value='';
    productDescriptionInput.value='';
    

    
}


function validateInputs(element) {
    var regex={
        productName:/^[A-Z]\w{3,10}\s?\w{0,5}$/,
        productPrice:/^[1-9][0-9][0-9][0-9][0-9]?$/,
        productCategory:/(^TV|Laptop|Mobile|Tap)$/,
        productDescription:/^.{4,300}$/
    };

    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');


        
    }else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');
    }
    
}
