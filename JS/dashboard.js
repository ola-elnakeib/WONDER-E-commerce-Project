let menuicn = document.querySelector(".menuicn"); 
let nav = document.querySelector(".navcontainer"); 
  
menuicn.addEventListener("click", () => { 
    nav.classList.toggle("navclose"); 
})
document.addEventListener('DOMContentLoaded', function () {
    // Fetch JSON data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../products.json', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        populateTable(data.products);
      }
    };
    xhr.send();
  
    // Function to populate the table
    function populateTable(products) {
      var tableBody = document.querySelector('#productTable tbody');
  
      products.forEach(function (product) {
        var row = tableBody.insertRow();
        row.insertCell(0).textContent = product.id;
        row.insertCell(1).textContent = product.name;
        row.insertCell(2).innerHTML = `<img src="../Img/${product.image}" alt="${product.name}" style="max-width: 50px; max-height: 50px;">`;
        row.insertCell(3).textContent = product.category;
        row.insertCell(4).textContent = '$' + product.price.toFixed(2);
        row.insertCell(5).textContent = product.description;
        row.insertCell(6).textContent = product.stockQuantity;
      });
    }
  });





