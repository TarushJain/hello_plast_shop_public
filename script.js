// Product database - In a real app, this would come from a backend API
const products = [
    // Casseroles
    { id: 1, name: "Cresto Casserole", price: 1299, category: "casseroles", image: "casseroles/cresto.jpg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 2, name: "Croma Pink Casserole", price: 899, category: "casseroles", image: "casseroles/croma pink.jpg", colors: ["Pink", "Red", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 3, name: "Croma SS 3000 Black", price: 1599, category: "casseroles", image: "casseroles/croma ss 3000-black.jpg", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    { id: 4, name: "Cuba Red Casserole", price: 799, category: "casseroles", image: "casseroles/cuba_red.jpg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 5, name: "Lotus Blue Casserole", price: 1099, category: "casseroles", image: "casseroles/lotus blue.jpg", colors: ["Blue", "Red", "Green"], sizes: ["1000", "1500", "3000"] },
    { id: 6, name: "Onyx 1500 Casserole", price: 1499, category: "casseroles", image: "casseroles/onyx1500.png", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    { id: 7, name: "Onyx 1700 Casserole", price: 1699, category: "casseroles", image: "casseroles/onyx1700.png", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    { id: 8, name: "Zigma 2000 Black", price: 1899, category: "casseroles", image: "casseroles/ZIGMA 2000 - BLACK.png", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    { id: 9, name: "Zigma Deluxe 3000 Black", price: 2499, category: "casseroles", image: "casseroles/ZIGMA DELUXE 3000 - BLACK.png", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    
    // Cookers
    { id: 10, name: "Handi Steel Cooker", price: 599, category: "cookers", image: "cookers/handi_page.jpg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 11, name: "Hello Steel Cooker Plain", price: 449, category: "cookers", image: "cookers/hello_Steel_cooker_plain.jpg", colors: ["Silver", "Black", "White"], sizes: ["1000", "1500", "3000"] },
    { id: 12, name: "Matki Cooker", price: 399, category: "cookers", image: "cookers/Matki_cooker.jpg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 13, name: "Matki Steel 5L", price: 549, category: "cookers", image: "cookers/matki_steel_5Ltr..png", colors: ["Silver", "Black", "White"], sizes: ["1000", "1500", "3000"] },
    
    // Kettles
    { id: 14, name: "Coral Kettle Green", price: 299, category: "kettles", image: "kettles/coral kattle green.jpg", colors: ["Green", "Red", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 15, name: "Cosmo Kettle Blue", price: 349, category: "kettles", image: "kettles/Cosmo Kettle_blue.jpg", colors: ["Blue", "Red", "Green"], sizes: ["1000", "1500", "3000"] },
    { id: 16, name: "Zigma Kettle", price: 399, category: "kettles", image: "kettles/zigma_kettle.jpg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    
    // Tiffins
    { id: 17, name: "Apple Steel PP Tiffin", price: 199, category: "tiffins", image: "tiffins/Apple steel-pp.jpg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 18, name: "Apple Steel Red Tiffin", price: 179, category: "tiffins", image: "tiffins/Apple steel-red.jpg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 19, name: "Bonton Tiffin", price: 249, category: "tiffins", image: "tiffins/BONTON_TIFFEN.jpeg", colors: ["Silver", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 20, name: "Cammy 3 Brown Tiffin", price: 189, category: "tiffins", image: "tiffins/cammy_3_BROWN.jpg", colors: ["Brown", "Black", "Red"], sizes: ["1000", "1500", "3000"] },
    { id: 21, name: "Cherish Tiffin Blue", price: 229, category: "tiffins", image: "tiffins/Cherish Tifin blue.jpg", colors: ["Blue", "Red", "Green"], sizes: ["1000", "1500", "3000"] },
    { id: 22, name: "Corel 3 Red Tiffin", price: 199, category: "tiffins", image: "tiffins/Corel 3 RED.jpg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 23, name: "Happytime Tiffin", price: 269, category: "tiffins", image: "tiffins/HAPPYTIME_TIFFEN.jpeg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 24, name: "Leo 2 Orange Tiffin", price: 189, category: "tiffins", image: "tiffins/LEO_2_ORANGE.jpg", colors: ["Orange", "Red", "Yellow"], sizes: ["1000", "1500", "3000"] },
    { id: 25, name: "Loto Deluxe Blue Tiffin", price: 299, category: "tiffins", image: "tiffins/LOTO DELUXE_blue.jpg", colors: ["Blue", "Red", "Green"], sizes: ["1000", "1500", "3000"] },
    { id: 26, name: "Loto Red Tiffin", price: 249, category: "tiffins", image: "tiffins/loto red.jpg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 27, name: "Reo 3 Tiffin", price: 279, category: "tiffins", image: "tiffins/REO_3_TIFFEN.jpeg", colors: ["Red", "Black", "Blue"], sizes: ["1000", "1500", "3000"] },
    { id: 28, name: "Zigma Tiffin Black", price: 329, category: "tiffins", image: "tiffins/zigma_tiffen_ black.jpg", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] },
    
    // Water Jugs
    { id: 29, name: "Croma Jug 24 Red", price: 399, category: "water jug", image: "water jug/CROMA_JUG_24_RED.jpg", colors: ["Red", "Blue", "Green"], sizes: ["1000", "1500", "3000"] },
    { id: 30, name: "Zigma Jug 18 Black", price: 349, category: "water jug", image: "water jug/zigma jug 18 black.jpg", colors: ["Black", "Silver", "White"], sizes: ["1000", "1500", "3000"] }
];

// Global variables
let cart = [];
let currentCategory = 'all';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    displayProducts();
    setInterval(updateTime, 1000);
    
    // Add keyboard shortcuts for quantity input
    setupKeyboardShortcuts();
});

// Setup keyboard shortcuts for better UX
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Enter key to add to cart (when quantity input is focused)
        if (e.key === 'Enter' && document.activeElement.type === 'number') {
            const productId = document.activeElement.id.replace('qty-', '');
            addToCartWithQuantity(parseInt(productId));
        }
        
        // Escape key to clear quantity input
        if (e.key === 'Escape' && document.activeElement.type === 'number') {
            document.activeElement.value = 1;
            document.activeElement.blur();
        }
    });
}

// Update current time
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN');
    const dateString = now.toLocaleDateString('en-IN');
    document.getElementById('current-time').textContent = `${dateString} ${timeString}`;
}

// Display products based on category filter
function displayProducts(category = 'all') {
    currentCategory = category;
    const productGrid = document.getElementById('product-grid');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    productGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div class="text-center mb-2">
                <img src="${product.image}" alt="${product.name}" class="mx-auto rounded mb-1 bg-gray-50" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NEM1Ni44MzY2IDY0IDY0IDU2LjgzNjYgNjQgNDhDNjQgMzkuMTYzNCA1Ni44MzY2IDMyIDQ4IDMyQzM5LjE2MzQgMzIgMzIgMzkuMTYzNCAzMiA0OEMzMiA1Ni44MzY2IDM5LjE2MzQgNjQgNDggNjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='">
            </div>
            <h3 class="font-semibold text-lg mb-1 text-center">${product.name}</h3>
            <p class="text-2xl font-bold text-green-600 text-center mb-2">₹${product.price.toLocaleString()}</p>
            
            <!-- Color selection -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                <div class="flex justify-center space-x-2">
                    ${product.colors.map(color => `
                        <button type="button" 
                                class="color-circle color-circle-${color.toLowerCase().replace(/\s+/g, '-')}" 
                                data-color="${color}" 
                                data-product="${product.id}"
                                onclick="selectColor('${product.id}', '${color}')"
                                title="${color}">
                        </button>
                    `).join('')}
                    <button type="button" 
                            class="color-circle color-circle-mix" 
                            data-color="Mix" 
                            data-product="${product.id}"
                            onclick="selectColor('${product.id}', 'Mix')"
                            title="Mix">
                        <span class="color-circle-mix-text">M</span>
                    </button>
                </div>
                <input type="hidden" id="selected-color-${product.id}" value="">
            </div>
            
            <!-- Size selection -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Size:</label>
                <div class="flex justify-center space-x-2">
                    ${product.sizes.map(size => `
                        <button type="button" 
                                class="size-btn ${size === '1500' ? 'selected' : ''}" 
                                data-size="${size}" 
                                data-product="${product.id}"
                                onclick="selectSize('${product.id}', '${size}')">
                            ${size}
                        </button>
                    `).join('')}
                </div>
                <input type="hidden" id="selected-size-${product.id}" value="">
            </div>
            
            <!-- Quick quantity input -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                <input type="number" 
                       id="qty-${product.id}"
                       min="1" 
                       max="10000" 
                       value="1"
                       class="w-full quantity-input"
                       placeholder="1">
            </div>
            
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold touch-button hover:bg-blue-700 transition-colors" 
                    onclick="addToCartWithQuantityAndColor(${product.id})">
                <i class="fas fa-plus mr-2"></i>Add to Cart
            </button>
        </div>
    `).join('');
    
    // Update category button styles
    updateCategoryButtons(category);
}

// Update category button styles
function updateCategoryButtons(selectedCategory) {
    const buttons = document.querySelectorAll('[onclick^="filterCategory"]');
    buttons.forEach(button => {
        if (button.onclick.toString().includes(selectedCategory)) {
            button.className = 'bg-blue-500 text-white px-4 py-2 rounded touch-button';
        } else {
            button.className = 'bg-gray-300 text-gray-700 px-4 py-2 rounded touch-button';
        }
    });
}

// Filter products by category
function filterCategory(category) {
    displayProducts(category);
}

// Add product to cart with quantity input (legacy function - kept for compatibility)
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    // Show quantity input dialog
    const quantity = prompt(`Enter quantity for ${product.name}:\n\nCurrent price: ₹${product.price.toLocaleString()}\n\nEnter quantity:`, existingItem ? existingItem.quantity : 1);
    
    if (quantity === null) return; // User cancelled
    
    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
        showNotification('Please enter a valid quantity!', 'error');
        return;
    }
    
    if (existingItem) {
        existingItem.quantity = qty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart! (Quantity: ${qty})`);
}

// Add product to cart with quantity from input field
function addToCartWithQuantity(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`qty-${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    if (isNaN(quantity) || quantity <= 0) {
        showNotification('Please enter a valid quantity!', 'error');
        quantityInput.focus();
        return;
    }
    
    if (quantity > 10000) {
        showNotification('Maximum quantity is 10,000!', 'error');
        quantityInput.value = 10000;
        quantityInput.focus();
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity = quantity;
        showNotification(`${product.name} quantity updated to ${quantity}!`);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
        showNotification(`${product.name} added to cart! (Quantity: ${quantity})`);
    }
    
    // Reset quantity input to 1 for next use
    quantityInput.value = 1;
    
    updateCart();
}

// Select color for a product
function selectColor(productId, color) {
    // Remove selected class from all color buttons for this product
    const colorButtons = document.querySelectorAll(`[data-product="${productId}"][data-color]`);
    colorButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    const clickedButton = document.querySelector(`[data-product="${productId}"][data-color="${color}"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
    
    // Update hidden input
    document.getElementById(`selected-color-${productId}`).value = color;
    
    // Show visual feedback
    showNotification(`Color selected: ${color}`);
}

// Select size for a product
function selectSize(productId, size) {
    // Remove selected class from all size buttons for this product
    const sizeButtons = document.querySelectorAll(`[data-product="${productId}"][data-size]`);
    sizeButtons.forEach(btn => btn.classList.remove('selected'));
    
    // Add selected class to clicked button
    const clickedButton = document.querySelector(`[data-product="${productId}"][data-size="${size}"]`);
    if (clickedButton) {
        clickedButton.classList.add('selected');
    }
    
    // Update hidden input
    document.getElementById(`selected-size-${productId}`).value = size;
    
    // Show visual feedback
    showNotification(`Size selected: ${size}`);
}

// Add product to cart with quantity and color selection
function addToCartWithQuantityAndColor(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`qty-${productId}`);
    const selectedColorInput = document.getElementById(`selected-color-${productId}`);
    const quantity = parseInt(quantityInput.value);
    const selectedColor = selectedColorInput.value;
    
    if (isNaN(quantity) || quantity <= 0) {
        showNotification('Please enter a valid quantity!', 'error');
        quantityInput.focus();
        return;
    }
    
    if (quantity > 10000) {
        showNotification('Maximum quantity is 10,000!', 'error');
        quantityInput.value = 10000;
        quantityInput.focus();
        return;
    }
    
    if (!selectedColor) {
        showNotification('Please select a color!', 'error');
        // Highlight color selection area
        const colorButtons = document.querySelectorAll(`[data-product="${productId}"][data-color]`);
        colorButtons.forEach(btn => btn.classList.add('error-highlight'));
        setTimeout(() => {
            colorButtons.forEach(btn => btn.classList.remove('error-highlight'));
        }, 2000);
        return;
    }
    
    // Get selected size
    const selectedSizeInput = document.getElementById(`selected-size-${productId}`);
    const selectedSize = selectedSizeInput.value;
    
    if (!selectedSize) {
        showNotification('Please select a size!', 'error');
        // Highlight size selection area
        const sizeButtons = document.querySelectorAll(`[data-product="${productId}"][data-size]`);
        sizeButtons.forEach(btn => btn.classList.add('error-highlight'));
        setTimeout(() => {
            sizeButtons.forEach(btn => btn.classList.remove('error-highlight'));
        }, 2000);
        return;
    }
    
    // Create unique cart item ID that includes color and size
    const cartItemId = `${productId}-${selectedColor}-${selectedSize}`;
    
    const existingItem = cart.find(item => item.cartItemId === cartItemId);
    
    if (existingItem) {
        existingItem.quantity = quantity;
        showNotification(`${product.name} (${selectedColor}, ${selectedSize}) quantity updated to ${quantity}!`);
    } else {
        cart.push({
            id: product.id,
            cartItemId: cartItemId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize
        });
        showNotification(`${product.name} (${selectedColor}, ${selectedSize}) added to cart! (Quantity: ${quantity})`);
    }
    
    // Reset inputs for next use
    quantityInput.value = 1;
    selectedColorInput.value = '';
    selectedSizeInput.value = '';
    
    // Clear selections
    const colorButtons = document.querySelectorAll(`[data-product="${productId}"][data-color]`);
    colorButtons.forEach(btn => btn.classList.remove('selected'));
    
    const sizeButtons = document.querySelectorAll(`[data-product="${productId}"][data-size]`);
    sizeButtons.forEach(btn => btn.classList.remove('selected'));
    
    updateCart();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => (item.cartItemId || item.id) !== productId);
    updateCart();
}

// Update product quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => (item.cartItemId || item.id) === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Update product quantity directly by typing
function updateQuantityDirect(productId, newQuantity) {
    const item = cart.find(item => (item.cartItemId || item.id) === productId);
    if (item) {
        const qty = parseInt(newQuantity);
        if (isNaN(qty) || qty <= 0) {
            // Reset to previous value if invalid
            updateCart();
            return;
        }
        
        if (qty > 10000) {
            item.quantity = 10000;
            showNotification('Maximum quantity is 10,000!', 'error');
        } else {
            item.quantity = qty;
        }
        
        updateCart();
        showNotification(`Quantity updated to ${item.quantity}`);
    }
}

// Update cart display and totals
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Cart is empty</p>';
        subtotalElement.textContent = '0.00';
        taxElement.textContent = '0.00';
        totalElement.textContent = '0.00';
        cartTotalElement.textContent = '0.00';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item bg-gray-50 rounded-lg p-3 border">
            <div class="flex justify-between items-center mb-2">
                <div>
                    <h4 class="font-semibold text-sm">${item.name}</h4>
                    ${item.color ? `<p class="text-xs text-gray-600">Color: <span class="font-medium">${item.color}</span></p>` : ''}
                    ${item.size ? `<p class="text-xs text-gray-600">Size: <span class="font-medium">${item.size}</span></p>` : ''}
                </div>
                <button class="text-red-500 hover:text-red-700" onclick="removeFromCart('${item.cartItemId || item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <button class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400" 
                            onclick="updateQuantity('${item.cartItemId || item.id}', -1)" title="Decrease quantity">-</button>
                    <input type="number" 
                           value="${item.quantity}" 
                           min="1" 
                           max="10000"
                           class="cart-quantity-input"
                           onchange="updateQuantityDirect('${item.cartItemId || item.id}', this.value)"
                           onblur="updateQuantityDirect('${item.cartItemId || item.id}', this.value)"
                           title="Type quantity directly">
                    <button class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400" 
                            onclick="updateQuantity('${item.cartItemId || item.id}', 1)" title="Increase quantity">+</button>
                </div>
                <div class="text-right">
                    <p class="text-sm text-gray-600">₹${item.price.toLocaleString()} × ${item.quantity}</p>
                    <p class="font-semibold">₹${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + tax;
    
    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    cartTotalElement.textContent = total.toFixed(2);
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
    showNotification('Cart cleared!');
}

// Generate bill and print
function generateBill() {
    if (cart.length === 0) {
        showNotification('Cart is empty!', 'error');
        return;
    }
    
    // Populate bill template
    const now = new Date();
    document.getElementById('bill-date').textContent = now.toLocaleDateString('en-IN');
    document.getElementById('bill-time').textContent = now.toLocaleTimeString('en-IN');
    
    const billItems = document.getElementById('bill-items');
    billItems.innerHTML = cart.map(item => `
        <div class="flex justify-between text-sm">
            <span>${item.name}${item.color ? ` (${item.color})` : ''}${item.size ? ` - ${item.size}` : ''} × ${item.quantity}</span>
            <span>₹${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18;
    const total = subtotal + tax;
    
    document.getElementById('bill-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('bill-tax').textContent = tax.toFixed(2);
    document.getElementById('bill-total').textContent = total.toFixed(2);
    
    // Prepare bill data for future printer integration
    const billData = {
        shopName: "Retail Shop",
        date: now.toLocaleDateString('en-IN'),
        time: now.toLocaleTimeString('en-IN'),
        items: cart,
        subtotal: subtotal,
        tax: tax,
        total: total
    };
    
    // Send to printer (placeholder for future integration)
    sendToPrinter(billData);
    
    // Print the bill
    window.print();
    
    showNotification('Bill generated successfully!');
}

// Placeholder function for future printer integration
function sendToPrinter(billData) {
    // This function will be connected to a local printer server or Electron print function
    console.log('Sending to printer:', billData);
    
    // Future integration examples:
    // - Send to local printer server (Node.js/Python)
    // - Use Electron's print functionality
    // - Send to thermal printer via USB/serial
    // - Send to network printer
    
    // Example for future implementation:
    /*
    fetch('/api/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billData)
    });
    */
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Placeholder for future backend API integration
async function fetchProductsFromAPI() {
    try {
        // This would be replaced with actual API calls
        // const response = await fetch('/api/products');
        // const products = await response.json();
        // return products;
        
        console.log('Fetching products from API...');
        return products; // For now, return local data
    } catch (error) {
        console.error('Error fetching products:', error);
        return products; // Fallback to local data
    }
}

// Placeholder for future backend API integration
async function saveTransactionToAPI(transactionData) {
    try {
        // This would be replaced with actual API calls
        // const response = await fetch('/api/transactions', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(transactionData)
        // });
        // return await response.json();
        
        console.log('Saving transaction to API:', transactionData);
        return { success: true, id: Date.now() }; // Mock response
    } catch (error) {
        console.error('Error saving transaction:', error);
        return { success: false, error: error.message };
    }
} 