const products = [
    {
        "id": 1,
        "image": {
            "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
            "mobile": "./assets/images/image-waffle-mobile.jpg",
            "tablet": "./assets/images/image-waffle-tablet.jpg",
            "desktop": "./assets/images/image-waffle-desktop.jpg"
        },
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50
    },
    {
        "id": 2,
        "image": {
            "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
            "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
            "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
            "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
        },
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00
    },
    {
        "id": 3,
        "image": {
            "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
            "mobile": "./assets/images/image-macaron-mobile.jpg",
            "tablet": "./assets/images/image-macaron-tablet.jpg",
            "desktop": "./assets/images/image-macaron-desktop.jpg"
        },
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00
    },
    {
        "id": 4,
        "image": {
            "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
            "mobile": "./assets/images/image-tiramisu-mobile.jpg",
            "tablet": "./assets/images/image-tiramisu-tablet.jpg",
            "desktop": "./assets/images/image-tiramisu-desktop.jpg"
        },
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50
    },
    {
        "id": 5,
        "image": {
            "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
            "mobile": "./assets/images/image-baklava-mobile.jpg",
            "tablet": "./assets/images/image-baklava-tablet.jpg",
            "desktop": "./assets/images/image-baklava-desktop.jpg"
        },
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00
    },
    {
        "id": 6,
        "image": {
            "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
            "mobile": "./assets/images/image-meringue-mobile.jpg",
            "tablet": "./assets/images/image-meringue-tablet.jpg",
            "desktop": "./assets/images/image-meringue-desktop.jpg"
        },
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00
    },
    {
        "id": 7,
        "image": {
            "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
            "mobile": "./assets/images/image-cake-mobile.jpg",
            "tablet": "./assets/images/image-cake-tablet.jpg",
            "desktop": "./assets/images/image-cake-desktop.jpg"
        },
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50
    },
    {
        "id": 8,
        "image": {
            "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
            "mobile": "./assets/images/image-brownie-mobile.jpg",
            "tablet": "./assets/images/image-brownie-tablet.jpg",
            "desktop": "./assets/images/image-brownie-desktop.jpg"
        },
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50
    },
    {
        "id": 9,
        "image": {
            "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
            "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
            "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
            "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
        },
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50
    }
];
  
// Cart state
let cart = [];
  
// DOM Elements
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const confirmOrderBtn = document.getElementById("confirm-order");
const startNewOrderBtn = document.getElementById("start-new-order");
const orderModal = document.getElementById("order-modal");

function loadProducts() {
    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image.desktop}" alt="${product.name}" class="product-image" />
            <button class="add-to-cart-btn" id="add-to-cart-${index}" onclick="addToCart(${product.id})">
                <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon" class="cart-icon" />
                Add to Cart
            </button>
            <p>${product.category}</p>
            <h3>${product.name}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;

        productList.appendChild(card);

        const productImage = card.querySelector(".product-image");
        const button = card.querySelector(".add-to-cart-btn");

        // Click event for the product image
        productImage.addEventListener("click", () => {
            button.classList.add("active");
            button.innerHTML = `
                <span class="decrement">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="currentColor" viewBox="0 0 10 2" class="increment-icon">
                        <path d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                </span>
                <span class="quantity">${quantity}</span>
                <span class="increment">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 10 10" class="decrement-icon">
                        <path d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z" />
                    </svg>
                </span>
            `;
            setupIncrementDecrement(button, product);
        });
    });
}

function setupIncrementDecrement(button, product) {
    let quantity = 1; // Default quantity when added to the cart

    const decrementBtn = button.querySelector(".decrement");
    const incrementBtn = button.querySelector(".increment");
    const quantityDisplay = button.querySelector("span:nth-child(2)");

    decrementBtn.addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        } else {
            button.classList.remove("active");
            button.textContent = "Add to Cart";
        }
        updateCartQuantity(product, quantity);
    });

    incrementBtn.addEventListener("click", () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateCartQuantity(product, quantity);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
}

// Update cart
function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
            ${item.name} ($${item.price.toFixed(2)}) x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    confirmOrderBtn.disabled = cart.length === 0;
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCart();
}

// Confirm order
confirmOrderBtn.addEventListener("click", () => {
    orderModal.classList.remove("hidden");
});

function updateCartQuantity(product, quantity) {
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
        cartItem.quantity = quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    updateCart(); // Update cart UI
}

startNewOrderBtn.addEventListener("click", () => {
    orderModal.classList.add("hidden"); // Hide modal
    cart = []; // Clear cart
    updateCart(); // Update cart UI
});

loadProducts();

// Ensure modal is hidden on load
document.addEventListener("DOMContentLoaded", () => {
    orderModal.classList.add("hidden");
});