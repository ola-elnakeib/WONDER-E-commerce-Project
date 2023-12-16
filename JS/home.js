let logout = document.getElementById('logout')
logout.addEventListener('click', () => {
    window.open('/HTML/login.html', '_self')
})
// make each link active on click
let filterBtns = document.querySelectorAll(".filter-btn");

filterBtns.forEach(btn => {
    btn.addEventListener("click", function (event) {
        event.preventDefault();

        filterBtns.forEach(btn => {
            btn.classList.remove("active");
        });

        btn.classList.add("active");
    });
});


// filter categories and display all products and each category products 
let productsContainer = document.querySelector(".productsContainer");

filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
        let category = this.getAttribute("data-category");
        if (category === "all") {
            getAllProducts();
        } else {
            getCategoryProducts(category);
        }
    })
});

getAllProducts();

// get all products 
function getAllProducts() {
    let xhr = new XMLHttpRequest();
    xhr.open("get", "../products.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            // console.log(responseData);
            const allProducts = responseData.products;
            // console.log(allProducts);
            displayProducts(allProducts);
        }
    }

    xhr.send();
}



// get category products 
function getCategoryProducts(category) {
    let xhr = new XMLHttpRequest();
    xhr.open("get", `../products.json?category=${category}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseData = JSON.parse(xhr.responseText);
            // console.log(responseData);
            const categoryProducts = responseData.products.filter(product => product.category === category);
            // console.log(categoryProducts);
            displayProducts(categoryProducts);
        }
    }

    xhr.send();
}



function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card", "fade-in");
        productCard.innerHTML = "<img src='../Img/" + product.image + "' alt=''>" +
            "<div class='card-body'>" +
            "   <button class='card-button'><i class='fa fa-shopping-bag' style='padding-right: 7px;'></i>Add to Cart</button>" +
            "   <div class='card-title'>" +
            "       <span class='product-name'>" + product.name + "</span>" +
            "       <span class='heart-icon'><i class='far fa-heart'></i></span>" +
            "   </div>" +
            "   <p class='card-price'>$" + product.price + "</p>" +
            "   <p class='card-description'>" + product.description + "</p>" +
            "   <p class='card-stock'><b>In stock:</b> " + product.stockQuantity + "</p>" +
            "</div>";

        productsContainer.appendChild(productCard);
    });

}




document.addEventListener('scroll', function () {
    var scrollButton = document.querySelector('.scroll-up');
    if (window.scrollY > 150) {
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};



window.addEventListener("scroll", function () {
    var header = document.querySelector(".header");
    var scrollPosition = window.scrollY;

    if (scrollPosition > 0) {
        header.style = "box-shadow: 3px 0px 10px rgba(0, 0, 0, .5);";
    } else {
        header.style = "box-shadow: 0";
    }
});




