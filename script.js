var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productQuantity = document.getElementById("productQuantity");
var productDes = document.getElementById("productDes");
var addBtn = document.getElementById("add-btn");
var updateBtn = document.getElementById("update-btn");
var productContainer = [];
var deleteItem = 0 ;
var editItem = 0;
if (localStorage.getItem('product') != null) {
    productContainer = JSON.parse(localStorage.getItem("product"));
    displayAllProduct();
}
function addProduct() {

    var product =
    {
        name: productName.value,
        price: productPrice.value,
        quantity: productQuantity.value,
        description: productDes.value
    };
    productContainer.push(product);
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayAllProduct();
    clearForm();

}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    productQuantity.value = '';
    productDes.value = '';
}

function displayAllProduct() {
    var displayedProduct = ``;
    for (var i = 0; i < productContainer.length; i++) {
        displayedProduct += displayTable(productContainer[i] , i);
    }
    document.getElementById("tableBody").innerHTML = displayedProduct;
}


function showProduct(index) {
    productName.value = productContainer[index].name;
    productPrice.value = productContainer[index].price;
    productQuantity.value = productContainer[index].quantity;
    productDes.value = productContainer[index].description;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    editItem = index;

}

function updateProduct() {
    productContainer[editItem].name = productName.value;
    productContainer[editItem].price = productPrice.value;
    productContainer[editItem].quantity = productQuantity.value;
    productContainer[editItem].description = productDes.value;
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayAllProduct();
    clearForm();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");

}
function getIndex(index) {
    deleteItem = index;
}
function deleteProduct() {
    productContainer.splice(deleteItem , 1);
    localStorage.setItem("product", JSON.stringify(productContainer));
    displayAllProduct();
}

function search(text) {
    var displayedProduct = ``;
    for (i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(text.toLowerCase())) {
            displayedProduct += displayTable(productContainer[i] , i);
        }
        document.getElementById("tableBody").innerHTML = displayedProduct;

    }
}

function displayTable(productInf , index) {
    var table = `<tr><td>${index}</td>
    <td>${productInf.name}</td>
    <td>${productInf.price}</td>
    <td>${productInf.quantity}</td>
    <td>${productInf.description}</td>
    <td>
    <button class="btn btn-outline-info" onclick ="showProduct(${index})">Edit</button>
    <button class="btn btn-outline-danger" onclick ="getIndex(${index})" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
    </td>
    </tr>` ;
    return table ;
}