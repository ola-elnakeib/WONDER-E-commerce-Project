// var ordersbtn = document.getElementById('ordersbtn');
// ordersbtn.addEventListener('click', getAllOrders);

// let orders;

// function getAllOrders() {
//     var XHR = new XMLHttpRequest();
//     XHR.open("get", "ord.json", true);
//     XHR.onreadystatechange = function () {
//         if (XHR.readyState == 4 && XHR.status == 200) {
//             var responseData = JSON.parse(XHR.responseText);
//             orders = responseData.orders;
//             displayOrders(orders);
//         }
//     };

//     XHR.send();
// }

// function displayOrders(orders) {
//     const ordersContainer = document.getElementById('ordersContainer');
//     ordersContainer.innerHTML = ''; // Clear previous content

//     // Display each order
//     orders.forEach(order => {
//         const orderDiv = document.createElement('div');
//         orderDiv.innerHTML = `
//             <h3>Order ID: ${order.orderId}</h3>
//             <p>Customer Name: ${order.customerName}</p>
//             <p>Order Status: ${order.status}</p>
//             <p> products:</p>

//             <button onclick="confirmOrder(${order.orderId})">Confirm</button>
//             <button onclick="rejectOrder(${order.orderId})">Reject</button>
//             <hr>
//         `;
//         ordersContainer.appendChild(orderDiv);
//     });
// }


var ordersbtn = document.getElementById('ordersbtn');
ordersbtn.addEventListener('click', getAllOrders);

let orders;

function getAllOrders() {
    var XHR = new XMLHttpRequest();
    XHR.open("get", "../ord.json", true);
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && XHR.status == 200) {
            var responseData = JSON.parse(XHR.responseText);
            orders = responseData.orders;
            displayOrders(orders);
        }
    };

    XHR.send();
}

function displayOrders(orders) {
    const ordersContainer = document.getElementById('ordersContainer');
    ordersContainer.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Order Status</th>
                <th>Products</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    orders.forEach(order => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.status}</td>
            <td>
                <ul>
                    ${order.products.map(product => `
                        <li>
                            ${product.productName} - Quantity: ${product.quantity} - Price: ${product.price}
                        </li>
                    `).join('')}
                </ul>
            </td>
            <td>
                <button onclick="confirmOrder(${order.orderId})">Confirm</button>
                <button onclick="rejectOrder(${order.orderId})">Reject</button>
            </td>
        `;
    });

    ordersContainer.appendChild(table);
}

function confirmOrder(orderId) {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
        order.status = 'Confirmed';
        displayOrders(orders);
    }
}

function rejectOrder(orderId) {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
        order.status = 'Rejected';
        displayOrders(orders);
    }
}



// function confirmOrder(orderId) {
//     const order = orders.find(order => order.orderId === orderId);
//     if (order) {
//         order.status = 'Confirmed';
//         displayOrders(orders);
//     }
// }

// function rejectOrder(orderId) {
//     const order = orders.find(order => order.orderId === orderId);
//     if (order) {
//         order.status = 'Rejected';
//         displayOrders(orders);
//     }
// }
