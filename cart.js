// Cart data structure
let cart = [];

// Utility Functions

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('shoppingCart');
    cart = savedCart ? JSON.parse(savedCart) : []; // Initialize cart
    updateCartCount(); // Ensure cart count is updated
    return cart; // Ensure this function returns the loaded cart
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount(); // Update cart count after saving
}

// Update cart count in the UI
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Add item to cart
function addToCart(event) {
    const productCard = event.target.closest('figure');
    if (!productCard) return;

    // Extract product details
    const product = {
        id: Date.now(), // Unique identifier
        name: productCard.querySelector('h5').textContent,
        price: parseFloat(productCard.querySelector('.offer').textContent.replace(/[^\d.]/g, '')),
        storage: productCard.querySelector('p:nth-of-type(1)').textContent,
        ram: productCard.querySelector('p:nth-of-type(2)').textContent,
        features: productCard.querySelector('p:nth-of-type(3)').textContent,
        image: productCard.querySelector('img').src,
        quantity: 1,
    };

    // Check if item already exists in the cart
    const existingItem = cart.find(item => item.name === product.name && item.storage === product.storage && item.ram === product.ram);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }

    saveCart();
    updateCartCount();

    // Optional: Navigate to cart page
    window.open('cart.html', 'cartTab');
}

// Update cart display on the cart page
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p>Your cart is empty!</p>`;
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    cartContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.storage}</p>
                    <p>${item.ram}</p>
                    <p>Features: ${item.features}</p>
                    <p>Price: <i class="bi bi-currency-rupee"></i>${item.price}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button onclick="removeFromCart(${item.id})">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        cartContainer.innerHTML += cartItem;
    });

    updateTotalPrice();
}

// Remove item from cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartDisplay();
}

// Update item quantity
function updateQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        saveCart();
        updateCartDisplay();
    }
}

// Calculate and update total price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('total-price');
    if (totalElement) {
        totalElement.textContent = total.toFixed(2);
    }
}

// Display cart items on the cart page
function displayCartItems() {
    loadCart(); // Ensure the cart is loaded first
    updateCartDisplay(); // Display cart items
}

// Handle checkout
function handleCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout...');
}

// Attach event listeners dynamically to all "Add to Cart" buttons
function initializeAddToCartButtons() {
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.add-to-cart-btn')) {
            addToCart(event);
        }
    });
}

// Event listener for checkout button
document.querySelector('.checkout-btn')?.addEventListener('click', handleCheckout);

// Initialize the cart functionality on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCart(); // Ensure cart is loaded from localStorage
    initializeAddToCartButtons(); // Set up event listeners for Add to Cart buttons
    displayCartItems(); // Display items if on the cart page
});
