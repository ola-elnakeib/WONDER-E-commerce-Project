window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.style = "box-shadow: 3px 0px 10px rgba(0, 0, 0, .5);";
    } else {
        header.style = "box-shadow: 0";
    }
});



const cartIcon = document.querySelector("#cart_ICON");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#cart-close");

cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
});

// start when the document is ready
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', start());
} else {
    start();
}
// start
function start() {
    addEvents();

}
// update 

function update() {
    addEvents();
    updateTotal();
}
// add event
function addEvents() {
    // remove item from cart
    let cartRemove_btns = document.querySelectorAll('.cart-remove');//.cart-remove
    console.log(cartRemove_btns);
    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });
    let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");
    cartQuantity_inputs.forEach(input => {
        input.addEventListener("change", handle_changeItemQuantity);
    });

    // add item to cart
    let addCart_btns=document.querySelectorAll(".card-button");
    addCart_btns.forEach(btn=>{
        btn.addEventListener("click",handle_addClickItem);
    })
}

// handle event function
let itemsAdded=[];
function handle_addClickItem(){
    let product=this.parentElement;
    let title = product.querySelector(".product-name").innerHTML; 
    let price =product.querySelector(".card-price").innerHTML; 
    let imgSrc=product.querySelector(".product-img").src; 
    // let cardPrice=product.querySelector(".card-price").innerHTML;
    // let cardDescription=product.querySelector(".card-description").innerHTML; 
    // let cardStock=product.querySelector(".card-stock").innerHTML; 
console.log(title,price,imgSrc);

let newToAdd={
    title,
    price,
    imgSrc,
};
// handle item is already exist
if(itemsAdded.find(e1.title == newToAdd.title)){
    alert("This Item is alreadt Exsits!");
    return;
}else{
    itemsAdded.push(newToAdd);
}
//Add product to cart
let cartBoxElement = CartBoxComponent(title,price,imgSrc);
let newNode = document.createElement("div") ;
newNode.innerHTML=cartBoxElement;
const cartContent=cart.querySelector(".cart-content");
cartContent.appendChild(newNode);
update();

}
function handle_removeCartItem() {
    this.parentElement.remove();
    update();
}
function handle_changeItemQuantity() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    this.value = Math.floor(this.value);
    update();
}


// update 
function updateTotal() {
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("$", ""));
        let quantity = cartBox.querySelector(".cart-quantity").value;
        total += price * quantity;
    });
    total = total.toFixed(2);

    totalElement.innerHTML = "$" + total;

}

// ============ HTML Component ============
function CartBoxComponent(title,price,imgSrc){
    return `<div class="cart-box">
    <img src=${imgSrc}" alt="" class="cart-img">
    <div class="detail-box">
        
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div> 
        <input style="width: 30px;" type="number" value="1"class="cart-quantity">
        <!-- REMOVE CART -->
        </div>
        <i class='bx bxs-trash-alt cart-remove '></i>
</div>` 
}





