// Mock product data
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
  
// Initialize product list
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
            if (!button.classList.contains("active")) {
                handleAddToCart(product.id, button);
            }
        });

        button.onclick = null;
        // Click event for the "Add to Cart" button
        button.addEventListener("click", () => {
            handleAddToCart(product.id, button);
        });
    });
}

function setupIncrementDecrement(button, product) {
    let cartItem = cart.find((item) => item.id === product.id);
    let quantity = cartItem ? cartItem.quantity : 1;

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

    const decrementBtn = button.querySelector(".decrement");
    const incrementBtn = button.querySelector(".increment");
    const quantityDisplay = button.querySelector(".quantity");
    const productCard = button.closest(".product-card");
    const productImage = productCard.querySelector(".product-image");

    decrementBtn.onclick = () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
            updateCartQuantity(product, quantity);
        } else {
            
            // Reset to default "Add to Cart" button
            button.innerHTML = `
                <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon" class="cart-icon" />
                Add to Cart
            `;

            button.classList.remove("active");
            productImage.classList.remove("active");

            // Remove all event listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            // Add the original click event back
            newButton.addEventListener("click", () => handleAddToCart(product.id, newButton));

            // Remove from cart
            removeFromCart(product.id);
        }
    };

    incrementBtn.onclick = () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        updateCartQuantity(product, quantity);
    };
}

function handleAddToCart(productId, buttonElement) {
    if (buttonElement.querySelector('.decrement')) {
        return;
    }

    const product = products.find((p) => p.id === productId);
    const card = buttonElement.closest(".product-card");
    const productImage = card.querySelector(".product-image");

    productImage.classList.add("active");
    buttonElement.classList.add("active");
    addToCart(productId);
    updateCart();
    setupIncrementDecrement(buttonElement, product);
}

function updateCartQuantity(product, quantity) {
    const cartItem = cart.find((item) => item.id === product.id);

    if (quantity > 0) {
        if (cartItem) {
            cartItem.quantity = quantity;
        } else {
            cart.push({ ...product, quantity });
        }
    } else {
        const button = document.querySelector(`#add-to-cart-${product.id - 1}`);
        if (button) {
            const card = button.closest(".product-card");
            const productImage = card.querySelector(".product-image");
            
            button.innerHTML = `
                <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon" class="cart-icon" />
                Add to Cart
            `;
            button.classList.remove("active");
            productImage.classList.remove("active");
            
            button.onclick = () => handleAddToCart(product.id, button);
        }

        removeFromCart(product.id);
    }

    updateCart();
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

    if (cart.length === 0) {
        // Reset the cart to its default state
        cartItems.innerHTML = `
            <img src="/assets/images/illustration-empty-cart.svg" alt="Empty cart">
            <p class="empty-cart">Your added items will appear here</p>
        `;
        cartTotal.textContent = "Order Total $0.00";
        cartTotal.style.display = "none";
        confirmOrderBtn.disabled = true;
        cartCount.textContent = 0;
        return;
    }

    cartTotal.style.display = "flex";

    cart.forEach((item) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <div class="cart-item-details">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">
                    <span class="cart-item-quantity">${item.quantity}x</span>
                    <span class="cart-item-price-value">@ $${item.price.toFixed(2)}</span>
                    <span class="cart-item-total"> $${(item.quantity * item.price).toFixed(2)}</span>
                </span>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <img src="/assets/images/icon-remove-item.svg" alt="Remove icon">
            </button>
        `;
        document.querySelector("#cart-items").appendChild(cartItem);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerHTML = `
        <div class="cart-total-content">
            <span class="cart-total-label" id="cart-total-label">Order Total</span>
            <span class="cart-total-value" id="cart-total-value">$${total.toFixed(2)}</span>
        </div>
    `;

    const carbonNeutralSection = document.createElement("div");
    carbonNeutralSection.className = "carbon-neutral-section";
    carbonNeutralSection.innerHTML = `
        <img src="/assets/images/icon-carbon-neutral.svg" alt="Carbon-neutral delivery" class="carbon-neutral-icon">
        <span class="carbon-neutral-text">This is a <span>carbon-neutral</span> delivery</span>
    `;
    cartTotal.appendChild(carbonNeutralSection);

    confirmOrderBtn.style.display = "block";
    cartTotal.appendChild(confirmOrderBtn);
}
  
// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    // Find the corresponding button to reset
    const button = document.querySelector(`#add-to-cart-${productId - 1}`);
    if (button) {
        const card = button.closest(".product-card");
        const productImage = card.querySelector(".product-image");
        
        button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon" class="cart-icon" />
            Add to Cart
        `;
        button.className = "add-to-cart-btn";
        button.classList.remove("active");
        productImage.classList.remove("active");
        
        // Restore original click handler
        button.onclick = () => {
            handleAddToCart(productId, button);
        };
    }
    
    updateCart();
}
  
// Confirm order
// Show the modal and populate with cart items
confirmOrderBtn.addEventListener("click", () => {
    const orderModal = document.getElementById("order-modal");
    const modalCartItems = document.getElementById("modal-cart-items");
    const orderTotalSection = document.createElement("div");

    modalCartItems.innerHTML = "";

    let orderTotal = 0;

    cart.forEach((item) => {
        const modalCartItem = document.createElement("div");
        modalCartItem.className = "modal-cart-item";
        modalCartItem.innerHTML = `
            <div class="modal-cart-item-details">
                <div class="modal-cart-item-image">
                    <img src="${item.image.desktop}" alt="${item.name}" width="50" height="50">
                </div>
                <div class="modal-cart-item-info">
                    <span class="modal-cart-item-name">${item.name}</span>
                    <span class="modal-cart-item-price">
                        <span class="modal-cart-item-quantity">${item.quantity}x</span>
                        <span class="modal-cart-item-price-value">@ $${item.price.toFixed(2)}</span>
                    </span>
                </div>
            </div>
            <span class="modal-cart-item-total">$${(item.quantity * item.price).toFixed(2)}</span>
        `;
        modalCartItems.appendChild(modalCartItem);

        // Update the order total
        orderTotal += item.quantity * item.price;
    });

    // Create the order total section
    orderTotalSection.className = "modal-order-total";
    orderTotalSection.innerHTML = `
        <span class="modal-order-total-label">Order Total</span>
        <span class="modal-order-total-value">$${orderTotal.toFixed(2)}</span>
    `;
    modalCartItems.appendChild(orderTotalSection);

    // Show the modal
    orderModal.style.display = "block";
});
  
// Start new order
function startNewOrder() {
    cart.length = 0; // Clear the cart
    updateCart();
    orderModal.style.display = "none";

    const productImages = document.querySelectorAll(".product-image");
    productImages.forEach(image => {
        image.classList.remove("active"); 
    });

    // Reset the "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button, index) => {
        button.outerHTML = `
            <button class="add-to-cart-btn" id="add-to-cart-${index}" onclick="addToCart(${button.dataset.productId})">
                <img src="./assets/images/icon-add-to-cart.svg" alt="Cart Icon" class="cart-icon" />
                Add to Cart
            </button>
        `;
    });
}
  
// Initialize app
loadProducts();


document.addEventListener("DOMContentLoaded", () => {
    orderModal.classList.add("hidden");
});