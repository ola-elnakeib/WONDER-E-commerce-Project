// let categoryFilter = document.getElementById('categoryFilter');
// let priceSort = document.getElementById('priceSort');
// let productsContainer = document.querySelector(".productsContainer");

// function getAllProducts() {
//     let xhr = new XMLHttpRequest();
//     xhr.open("get", "../products.json", true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             const responseData = JSON.parse(xhr.responseText);
//             const allProducts = responseData.products;
//             filter(allProducts)
//         }
//     }

//     xhr.send();
// }

// // getAllProducts();

// function filter(products) {
//     productsContainer.innerHTML = '';
//     let filteredProducts = products.filter(product => {
//         return categoryFilter.value === 'all' || product.category === categoryFilter.value;
//     }).sort((a, b) => {
//         return priceSort.value === 'lowToHigh' ? a.price - b.price : b.price - a.price;
//     })

//     displayProducts(filteredProducts)
// }


// function displayProducts(products) {
//     productsContainer.innerHTML = "";
//     products.forEach(product => {
//         const productCard = document.createElement("div");
//         productCard.classList.add("product-card", "fade-in");
//         productCard.innerHTML = "<img src='../Img/" + product.image + "' alt=''>" +
//             "<div class='card-body'>" +
//             "   <button class='card-button'><i class='fa fa-shopping-bag' style='padding-right: 7px;'></i>Add to Cart</button>" +
//             "   <div class='card-title'>" +
//             "       <span class='product-name'>" + product.name + "</span>" +
//             "       <span class='heart-icon'><i class='far fa-heart'></i></span>" +
//             "   </div>" +
//             "   <p class='card-price'>$" + product.price + "</p>" +
//             "   <p class='card-description'>" + product.description + "</p>" +
//             "   <p class='card-stock'><b>In stock:</b> " + product.stockQuantity + "</p>" +
//             "</div>";

//         productsContainer.appendChild(productCard);
//     });
// }


window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.style = "box-shadow: 3px 0px 10px rgba(0, 0, 0, .5);";
    } else {
        header.style = "box-shadow: 0";
    }
});












  
  
  
 

  
  
  
 
  
 