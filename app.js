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

// Render items
function renderItems(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="product-details">
                <div class="product-name">${item.name}</div>
                <div class="product-price">₹${item.price}</div>
                <div class="stock-status ${item.status === 'available' || item.status === 'in-stock' ? 'in-stock' : 'out-of-stock'}">
                    ${item.status === 'available' || item.status === 'in-stock' ? 'In Stock' : 'Out of Stock'}
                </div>
                <button class="btn ${item.status === 'available' || item.status === 'in-stock' ? 'btn-primary' : 'btn-disabled'}">
                    ${item.status === 'available' || item.status === 'in-stock' ? 'Add to Cart' : 'Notify Me'}
                </button>
            </div>
        `;
        container.appendChild(productElement);
    });
}

// Tab switching
document.querySelectorAll('.tab, .nav-item').forEach(item => {
    item.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        document.querySelectorAll('.tabs .tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        if (this.classList.contains('nav-item')) {
            this.classList.add('active');
            document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
        } else {
            this.classList.add('active');
            document.querySelector(`.nav-item[data-tab="${tabName}"]`).classList.add('active');
        }
        document.getElementById(`${tabName}-content`).classList.add('active');

        if (tabName === 'home') renderItems(items, 'products-container');
    });
});

// Search functionality
document.querySelectorAll('#search-input, #search-input-main').forEach(input => {
    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) {
            renderItems(items, 'search-results');
            return;
        }
        const filteredItems = items.filter(item => item.name.toLowerCase().includes(searchTerm));
        renderItems(filteredItems, 'search-results');
    });
});

// Initial render
renderItems(items, 'products-container');
