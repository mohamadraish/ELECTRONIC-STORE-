// Load data from localStorage or initialize with default data
let items = JSON.parse(localStorage.getItem('items')) || [
    { id: 1, type: "food", name: "Pizza", price: 150, image: "https://via.placeholder.com/150", status: "available" },
    { id: 2, type: "food", name: "Burger", price: 100, image: "https://via.placeholder.com/150", status: "available" },
    { id: 3, type: "food", name: "Pasta", price: 120, image: "https://via.placeholder.com/150", status: "out-of-stock" },
    { id: 4, type: "electronics", name: "Arduino Uno R3", price: 450, image: "https://via.placeholder.com/150", status: "in-stock" },
    { id: 5, type: "electronics", name: "Breadboard 830 Points", price: 120, image: "https://via.placeholder.com/150", status: "in-stock" }
];

let users = JSON.parse(localStorage.getItem('users')) || [
    { id: 1, name: "Raj Sharma", email: "raj.sharma@example.com", mobile: "+91 98765 43210", status: "active" },
    { id: 2, name: "Priya Patel", email: "priya.p@example.com", mobile: "+91 87654 32109", status: "inactive" }
];

let orders = JSON.parse(localStorage.getItem('orders')) || [
    { id: "ORD-001", user: "Raj Sharma", item: "Pizza", date: "Jul 5, 2025", status: "pending" },
    { id: "ORD-002", user: "Priya Patel", item: "Arduino Uno R3", date: "Jul 2, 2025", status: "completed" }
];

// Save data to localStorage whenever it changes
function saveData() {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Admin panel toggle and login
document.getElementById('admin-login-btn').addEventListener('click', function() {
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
    const errorElement = document.getElementById('login-error');

    if (email === adminCredentials.email && password === adminCredentials.password) {
        errorElement.style.display = 'none';
        document.getElementById('login-panel').style.display = 'none';
        document.getElementById('admin-panel').classList.add('active');
        renderUsers();
        renderOrders();
    } else {
        errorElement.style.display = 'block';
        document.getElementById('admin-password').value = '';
    }
});

document.getElementById('close-admin').addEventListener('click', function() {
    document.getElementById('admin-panel').classList.remove('active');
    document.getElementById('login-panel').style.display = 'block';
    document.getElementById('admin-email').value = '';
    document.getElementById('admin-password').value = '';
    document.getElementById('login-error').style.display = 'none';
});

// Tab switching
document.querySelectorAll('.admin-tabs-nav .tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        document.querySelectorAll('.admin-content .tab-content').forEach(content => content.classList.remove('active'));
        document.querySelectorAll('.admin-tabs-nav .tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`${tabName}-content`).classList.add('active');
        this.classList.add('active');
    });
});

// Render users
function renderUsers() {
    const table = document.getElementById('users-table');
    table.innerHTML = '';
    users.forEach(user => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>#USR-${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.mobile}</td>
            <td><span class="status-dot ${user.status}"></span> ${user.status}</td>
            <td><button class="btn ${user.status === 'active' ? 'btn-danger' : 'btn-success'}" onclick="toggleUserStatus(${user.id})">
                ${user.status === 'active' ? 'Deactivate' : 'Activate'}
            </button></td>
        `;
    });
    saveData();
}

// Render orders
function renderOrders() {
    const table = document.getElementById('orders-table');
    table.innerHTML = '';
    orders.forEach(order => {
        const row = table.insertRow();
        row.innerHTML = `
            <td>${order.id}</td>
            <td>${order.user}</td>
            <td>${order.item}</td>
            <td>${order.date}</td>
            <td><span class="status-dot ${order.status}"></span> ${order.status}</td>
            <td><button class="btn btn-success" onclick="completeOrder('${order.id}')">Order Complete</button></td>
        `;
    });
    saveData();
}

// Toggle user status
function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    user.status = user.status === 'active' ? 'inactive' : 'active';
    renderUsers();
}

// Complete order
function completeOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    order.status = 'completed';
    renderOrders();
}

// Add new item
function addItem() {
    const type = document.getElementById('item-type').value;
    const name = document.getElementById('item-name').value;
    const price = document.getElementById('item-price').value;
    const image = document.getElementById('item-image').value;
    if (name && price && image) {
        const newItem = {
            id: items.length + 1,
            type: type,
            name: name,
            price: parseInt(price),
            image: image,
            status: type === 'food' ? 'available' : 'in-stock'
        };
        items.push(newItem);
        alert('Item added successfully!');
        document.getElementById('item-name').value = '';
        document.getElementById('item-price').value = '';
        document.getElementById('item-image').value = '';
        saveData();
    }
}

// Initial render
renderUsers();
renderOrders();
