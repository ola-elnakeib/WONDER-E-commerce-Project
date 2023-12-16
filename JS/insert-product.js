let productcode=document.getElementById('productcode')
let nameproduct = document.getElementById('nameproduct');
let counter = document.getElementById('counter');
let price = document.getElementById('price');
let Category=document.getElementById('Category');
let Add = document.getElementById('Add');
let discription=document.getElementById('discription');



let mood = 'create';
let temp;

nameproduct.onkeyup=function(){
    productNameError.innerHTML = "";
    var nameRejex=/^[A-Z][a-z]{2,8}$/
    if(!nameRejex.test(nameproduct.value))
    {
        Add.disabled="true"
        productNameError.innerHTML = " first letter Must capital, followed by 2 to 8 small letters";
       

    }
    else {
        Add.removeAttribute("disabled")
    }
}

Category.onkeyup=function(){
    categoryNameError.innerHTML = "";
    var categoryRejex=/^[A-Z][a-z]{2,8}$/
    if(!categoryRejex.test(Category.value))
    {
        Add.disabled="true"
        categoryNameError.innerHTML = " first letter Must capital, followed by 2 to 8 small letters";
       

    }
    else {
        Add.removeAttribute("disabled")
    }
}



price.onkeyup=function(){
    productPriceError.innerHTML = "";
    var productPriceRegex = /^(?![1-9]\.00$)(?!0$)([0-9]+(\.[0-9]{1,2})?)?$/
        if (!productPriceRegex.test(price.value)) {
            Add.disabled="true"
            productPriceError.innerHTML = "Price must be a positive number with up to two decimal places";
        }
        else {
            Add.removeAttribute("disabled")
        }
}


productcode.onkeyup=function(){
    product_IDError.innerHTML = "";
    var IdRejex=/^[1-9][a-zA-Z0-9]*$/
    if(!IdRejex.test(productcode.value))
    {
        Add.disabled="true"
        product_IDError.innerHTML = " ID to start with a digit from 1 to 9 followed by zero or more digit.";
       

    }
    else {
        Add.removeAttribute("disabled")
    }
}

let arrpro;
if (localStorage.product != null) {
    arrpro = JSON.parse(localStorage.product)
}
else {
    arrpro = []
}


Add.onclick = function () {
    let newproduct = {
        nameproduct: nameproduct.value,
        Category:Category.value,
        counter: counter.value,
        price: price.value,
        discription:discription.value,
        productcode:productcode.value

        // file:file.value
    }

    if(nameproduct.value && productcode.value&&Category.value !=''){
    if (mood == 'create') {
        if (newproduct.counter > 1) {
            for (let i = 0; i < newproduct.counter; i++) { arrpro.push(newproduct) }

        }
        else {
            arrpro.push(newproduct);
        }

    }
    else{
        arrpro[temp]=newproduct;
        mood='create';
        Add.innerHTML='create';
        counter.style.display='block'

    }

    }

    localStorage.setItem('product', JSON.stringify(arrpro))
    
    console.log(arrpro)
    clearData();
    showData()
   
    // getImgData();
       
}


function clearData() {
    nameproduct.value = '';
    counter.value = '';
    price.value = '';
    productcode.value='';
    discription.value='';
    // file.value='';
    Category.value='';

}
function showData() {
    let table = '';
    for (let i = 0; i < arrpro.length; i++) {
        table += `
        <tr>
        <td>${arrpro[i].productcode}</td>
        <td>${arrpro[i].nameproduct}</td> 
        <td>${arrpro[i].Category}</td>
        <td>${arrpro[i].price}</td>
        <td>${arrpro[i].discription}</td>
        <td claass="tdAction">
                        <button  onclick="updateprod(${i})" id="update">Update</button>
                        <button onclick="deleteprod(${i})" id="delete">Delete</button>
                    </td>
    </td>
        </tr>
        `
    }
    document.getElementById('tboady').innerHTML = table;
    let btndelete = document.getElementById('deleteall')
    if (arrpro.length > 0) {
        btndelete.innerHTML =
            `
        <button id="Dltall" onclick="DeleteAll()">Delete All product : ${arrpro.length}</button>
        `
    }
    else {
        btndelete.innerHTML = '';
    }
}

showData();

function deleteprod(i) {
    arrpro.splice(i, 1);
    localStorage.product = JSON.stringify(arrpro);
    showData()

}



function DeleteAll() {
    localStorage.clear();
    arrpro.splice(0);
    showData()

}
function updateprod(i) {
    nameproduct.value = arrpro[i].nameproduct;
    price.value = arrpro[i].price;
    Category.value=arrpro[i].Category;
    discription.value=arrpro[i].discription;
    productcode.value=arrpro[i].productcode;
    
    counter.style.display = 'none';
//    counter.style.marginLeft='60px';
    Add.innerHTML = 'Update';
    mood = 'Update';
    temp=i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}




// 2- save data in local storage
// 3- clear inputs
// 4- read
// d-count (من ضغطه واحد اعمل انشاء للعديد من الاوردرات )
// 6-delet
// 7=update
// 8-search
// 9-clean data


