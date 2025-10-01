// Product database - In a real app, this would come from a backend API
const products = [
    //Packaging
    { id: 1, name: "Packaging", category: "Packaging", image: "casseroles/crest.jpg",colors: ["Brown"], sizes: ["1"], prices: { "1":310 } },
    // Casseroles
    /*done*/ { id: 7, name: "Cresto ", category: "casseroles", image: "casseroles/cresto.jpg",colors: ["Cream", "Pink"],  sizes: ["2400", "3000", "5000"], prices: { "2400": 190, "3000": 220, "5000": 300 } },
    /*done*/{ id: 2, name: "Croma ", category: "casseroles", image: "casseroles/croma pink.jpg", colors: ["Pink", "Orange", "Blue"], sizes: ["1500", "2000", "3000", "4500","5500","7000"], prices: { "1500":115, "2000":135, "3000":185 , "4500":243,"5500":335,"7000":435} },
    /*done*/{ id: 3, name: "Croma SS", category: "casseroles", image: "casseroles/croma ss 3000-black.jpg", colors: ["Black", "Red"], sizes: ["2000", "3000", "3500","4500","5000"], prices: { "2000": 170, "3000": 220, "3500": 235 , "4500":310, "5000":330 } },
    /*done*/  { id: 4, name: "Cuba", category: "casseroles", image: "casseroles/cuba_red.jpg", colors: ["Red", "Orange"], sizes: ["1700", "2000", "3200", "4500"], prices: { "1700": 127, "2000": 145, "3200": 190, "4500":273 } },
    /*done*/{ id: 5, name: "Lotus", category: "casseroles", image: "casseroles/lotus blue.jpg", colors: ["Blue", "Pink"], sizes: ["2400", "3000", "5000"], prices: { "2400": 137, "3000": 165, "5000": 243 } },
    /*done*/{ id: 6, name: "Onyx", category: "casseroles", image: "casseroles/onyx1500.png", colors: ["Red", "Green", "Pink"], sizes: ["600","1500","1700", "3500", "5000"], prices: { "600": 72, "1500":110, "1700":132 , "3500": 180, "5000": 243 } },

    /*done*/{ id: 8, name: "Zigma ", category: "casseroles", image: "casseroles/ZIGMA 2000 - BLACK.png", colors: ["Black", "Red"], sizes: ["2000", "3000", "3500","4200","4500", "5000","6000","7500","12500","18000"], prices: { "2000":170, "3000":220, "3500":235,"4200":280,"4500":310, "5000":330,"6000":380,"7500":480,"12500":705,"18000":890 } },
    /*done*/{ id: 9, name: "Zigma Deluxe", category: "casseroles", image: "casseroles/ZIGMA DELUXE 3000 - BLACK.png", colors: ["Black", "Red"], sizes: ["2000",  "3000", "4500"], prices: { "2000" : 190,  "3000" :240, "4200":300, "4500":330} },
    /*done*/{ id: 31, name: "Zigma Handi", category: "casseroles", image: "casseroles/zigma_handi.jpeg", colors: ["Black", "Red"], sizes: ["2000",  "3000", "4500"], prices: { "2000" : 190,  "3000" :230, "4200":300, "4500":320} },
    // Cookers
    /*done*/{ id: 10, name: "Handi Steel ", category: "cookers", image: "cookers/handi_page.jpg", colors: ["Silver"], sizes: ["3", "5","7","10","12","15"], prices: {"3":650, "5":690,"7":730,"10":1200,"12":1275,"15":1350} },
    /*done*/{ id: 11, name: "Steel Cooker ", category: "cookers", image: "cookers/hello_Steel_cooker_plain.jpg", colors: [ "Silver"], sizes: ["2","3", "5","7","10","12","15"], prices: {"2":615,"3":635, "5":675,"7":715,"10":1175,"12":1250,"15":1325} },
    //{ id: 12, name: "Matki Cooker", category: "cookers", image: "cookers/Matki_cooker.jpg", colors: ["Silver"], sizes: ["1000", "1500", "3000"], prices: { "1000": 399, "1500": 449, "3000": 549 } },
    /*done*/{ id: 13, name: "Matki Steel", category: "cookers", image: "cookers/matki_steel_5Ltr..png", colors: ["Silver"], sizes: ["2", "3", "5","7"], prices: { "2":480, "3":650, "5":690,"7":730} },
    
    // Kettles
    /*done*/{ id: 14, name: "Coral Kettle", category: "kettles", image: "kettles/coral kattle green.jpg", colors: ["Green", "Brown", "Blue"], sizes:["1"], prices: { "1":210 }},
    /*done*/{ id: 15, name: "Cosmos Kettle", category: "kettles", image: "kettles/Cosmo Kettle_blue.jpg", colors: ["Blue", "Brown"], sizes: ["800", "1200"], prices: { "800": 147, "1200": 157} },
    /*done*/{ id: 16, name: "Zigma Kettle", category: "kettles", image: "kettles/zigma_kettle.jpg", colors: ["Black", "Red"], sizes: ["800", "1200", "1600"], prices: { "800": 210, "1200": 220, "1600": 250 } },
    
    // Tiffins
    /*done*/{ id: 17, name: "Apple", category: "tiffins", image: "tiffins/Apple steel-pp.jpg", colors: ["Green", "Red", "Blue"], sizes: ["Plastic", "Steel"], prices: { "Plastic":50 , "Steel":60 } },
    /*done*/{ id: 18, name: "Loto", category: "tiffins", image: "tiffins/jolly_tiffin.jpeg", colors: ["Pink", "Red", "Blue"], sizes: ["Plastic", "Steel"], prices: { "Plastic":165 , "Steel":205 } },
    /*done*/{ id: 19, name: "Bonton", category: "tiffins", image: "tiffins/BONTON_TIFFEN.jpeg", colors: [], sizes: ["1"], prices: { "1": 85 } },
    /*done*/ { id: 20, name: "Cammy 3 ", category: "tiffins", image: "tiffins/cammy_3_BROWN.jpg", colors: ["Brown", "Green", "Blue"], sizes: ["3", "4"], prices: { "3":248, "4": 315 } },
    /*done*/{ id: 21, name: "Cherish", category: "tiffins", image: "tiffins/Cherish Tifin blue.jpg", colors: ["Blue", "Brown", "Green"], sizes: ["3", "4"], prices: { "3":475, "4":555} },
    /*done*/ { id: 22, name: "Coral 3", category: "tiffins", image: "tiffins/Corel 3 RED.jpg", colors: ["Red", "Orange", "Blue"], sizes: ["2", "3", "4","4+1"], prices: {"2":162 , "3":182 , "4":215 ,"4+1":220} },
    /*done*/{ id: 23, name: "Happytime", category: "tiffins", image: "tiffins/HAPPYTIME_TIFFEN.jpeg", colors: [], sizes: ["1"], prices: { "1": 65 } },
    /*done*/{ id: 24, name: "Leo ", category: "tiffins", image: "tiffins/LEO_2_ORANGE.jpg", colors: ["Orange", "Red", "Blue"], sizes: ["2", "3"], prices: { "2": 165, "3": 205} },
    /*done*/ { id: 25, name: "Loto SS", category: "tiffins", image: "tiffins/LOTO DELUXE_blue.jpg", colors: ["Blue", "Red", "Black"], sizes: ["3", "4"], prices: { "3":222, "4": 242} },
    /*done*/ { id: 26, name: "Loto", category: "tiffins", image: "tiffins/loto red.jpg", colors: ["Red", "Blue","Green"], sizes: ["2+1", "3+1", "4"], prices: {"2+1":162 , "3+1":177 , "4":197 } },
    /*done*/{ id: 27, name: "Reo ", category: "tiffins", image: "tiffins/REO_3_TIFFEN.jpeg", colors: ["Red", "Orange", "Blue"], sizes: ["2", "3"], prices: { "2": 118, "3": 143} },
    /*done*/ { id: 28, name: "Zigma ", category: "tiffins", image: "tiffins/zigma_tiffen_ black.jpg", colors: ["Black", "Red" ], sizes: ["3", "4", "5"], prices: { "3": 570, "4": 650, "5": 1200 } },
    /*done*/{ id: 31, name: "Flora", category: "tiffins", image: "tiffins/flora_tiffin.jpeg", colors: ["Pink", "Red", "Blue"], sizes: ["Steel"], prices: {"Steel":263 } },
    // Water Jugs
    /*done*/{ id: 29, name: "Croma Jug", category: "water jug", image: "water jug/CROMA_JUG_24_RED.jpg", colors: ["Red", "Blue", "Orange"], sizes: ["6", "24"], prices: { "6": 230, "24": 485} },
    /*done*/{ id: 30, name: "Zigma Jug", category: "water jug", image: "water jug/zigma jug 18 black.jpg", colors: ["Black", "Red"], sizes: ["5", "7.5", "12.5", "18"], prices: {"5":360 , "7.5": 480, "12.5":585 , "18": 890} }
];

// Global variables
let cart = [];
let currentCategory = 'all';
let cartTaxPercent = 0; // Tax percent for cart popup
// Add this global variable for discount percent
let cartDiscountPercent = 0; // Discount percent for cart popup

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Remove buttons and numerical bar to the left of the cart button
    const numericalBar = document.querySelector('.main-screen .number-box');
    const leftButtons = document.querySelectorAll('.main-screen .left-buttons');
    if (numericalBar) numericalBar.remove();
    leftButtons.forEach(button => button.remove());

    updateTime();
    displayProducts();
    setInterval(updateTime, 1000);
    
    // Add keyboard shortcuts for quantity input
    setupKeyboardShortcuts();
    // Initialize cart hidden by default (can be toggled)
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) cartPanel.classList.add('hidden');
    // Tax functions removed
    // Hook up search
    attachSearchHandler();

    // Attach handler for cart tax input
    const cartTaxInput = document.getElementById('cart-tax-input');
    if (cartTaxInput) {
        cartTaxInput.addEventListener('input', function() {
            cartTaxPercent = parseFloat(cartTaxInput.value) || 0;
            updateCart();
        });
    }
    // Attach handler for cart discount input
    const cartDiscountInput = document.getElementById('cart-discount-input');
    if (cartDiscountInput) {
        cartDiscountInput.addEventListener('input', function() {
            cartDiscountPercent = parseFloat(cartDiscountInput.value) || 0;
            updateCart();
        });
    }

        // Prevent pinch-zoom and double-tap zoom on iOS/large tablets
        preventZoomOnTouchDevices();
        // Ensure header height CSS variable is set
        updateHeaderHeightCSSVar();
        window.addEventListener('resize', updateHeaderHeightCSSVar);
        window.addEventListener('orientationchange', updateHeaderHeightCSSVar);
});

    // Prevent pinch and double-tap zoom on touch devices
    function preventZoomOnTouchDevices() {
        let lastTouchEnd = 0;

        document.addEventListener('touchstart', function (e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', function (e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, { passive: false });

        // Disable gesturestart which is fired on iOS when pinching
        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
        });
    }

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
        
        // "c" to toggle cart quickly
        if (e.key.toLowerCase() === 'c') {
            toggleCart();
        }
    });
}

// Update CSS variable --header-height to match the header element's height
function updateHeaderHeightCSSVar() {
    const header = document.querySelector('header');
    if (!header) return;
    const height = header.getBoundingClientRect().height + 'px';
    document.documentElement.style.setProperty('--header-height', height);
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
            <!-- Price removed from product card -->
            <!-- Color selection -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                <div class="flex justify-center space-x-2">
                    ${['Mix', ...product.colors].slice(0, 4).map(color => `
                        <button type="button" 
                                class="color-circle color-circle-${color.toLowerCase().replace(/\\s+/g, '-')}${color==='Mix' ? ' selected' : ''}" 
                                data-color="${color}" 
                                data-product="${product.id}"
                                onclick="selectColor('${product.id}', '${color}')"
                                title="${color}">
                            ${color==='Mix' ? '<span class=\\"color-circle-mix-text\\">M</span>' : ''}
                        </button>
                    `).join('')}
                </div>
                <input type="hidden" id="selected-color-${product.id}" value="Mix">
            </div>
            
            <!-- Size selection -->
            <div class="mb-2" style="min-height:70px;display:flex;flex-direction:column;justify-content:flex-start;">
                <label class="block text-sm font-medium text-gray-700 mb-1">Size:</label>
                <div class="flex flex-col items-center w-full">
                    ${(() => {
                        const sizes = product.sizes || [];
                        let defaultSize = sizes.length === 1 ? sizes[0] : (sizes.includes('1500') ? '1500' : sizes[0]);
                        let rows = [];
                        for (let i = 0; i < sizes.length; i += 4) {
                            rows.push(`<div class='flex justify-center space-x-2 mb-1'>${sizes.slice(i, i+4).map(size => `
                                <button type="button" class="size-btn flex flex-col items-center justify-center${(size === defaultSize) ? ' selected' : ''}" data-size="${size}" data-product="${product.id}" onclick="selectSize('${product.id}', '${size}')">
                                    <span>${size}</span>
                                    <span class="text-xs text-gray-700">₹${product.prices && product.prices[size] !== undefined ? product.prices[size] : '-'}</span>
                                </button>
                            `).join('')}</div>`);
                        }
                        return rows.join('');
                    })()}
                </div>
                <input type="hidden" id="selected-size-${product.id}" value="${(product.sizes && product.sizes.length === 1) ? product.sizes[0] : ((product.sizes && product.sizes.includes('1500')) ? '1500' : (product.sizes ? product.sizes[0] : ''))}">
            </div>
            
            <!-- Quick quantity input -->
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                <input type="number" 
                       id="qty-${product.id}"
                       min="0" 
                       max="10000" 
                       value="0"
                       class="w-full quantity-input"
                       placeholder="0">
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

// Search products by name
function attachSearchHandler() {
    const input = document.getElementById('search-input');
    if (!input) return;
    input.addEventListener('input', () => {
        const q = input.value.trim().toLowerCase();
        const productGrid = document.getElementById('product-grid');
        const list = q ? products.filter(p => p.name.toLowerCase().includes(q)) : products;
        // simple reuse of renderer with temporary category-agnostic filtering
        const backup = currentCategory;
        currentCategory = 'all';
        const html = list.map(product => `
        <div class="product-card bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div class="text-center mb-2">
                <img src="${product.image}" alt="${product.name}" class="mx-auto rounded mb-1 bg-gray-50" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NEM1Ni44MzY2IDY0IDY0IDU2LjgzNjYgNjQgNDhDNjQgMzkuMTYzNCA1Ni44MzY2IDMyIDQ4IDMyQzM5LjE2MzQgMzIgMzIgMzkuMTYzNCAzMiA0OEMzMiA1Ni44MzY2IDM5LjE2MzQgNjQgNDggNjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='">
            </div>
            <h3 class="font-semibold text-lg mb-1 text-center">${product.name}</h3>
            <p class="text-2xl font-bold text-green-600 text-center mb-2">₹${product.price.toLocaleString()}</p>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Color:</label>
                <div class="flex justify-center space-x-2">
                    ${['Mix', ...(product.colors||[])].slice(0,4).map(color => `do it for 
                        <button type="button" class="color-circle color-circle-${color.toLowerCase().replace(/\\s+/g,'-')}" data-color="${color}" data-product="${product.id}" onclick="selectColor('${product.id}','${color}')" title="${color}"></button>
                    `).join('')}
                </div>
                <input type="hidden" id="selected-color-${product.id}" value="Mix">
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Size:</label>
                <div class="flex justify-center space-x-2">
                    ${(product.sizes||[]).map(size => `
                        <button type="button" class="size-btn" data-size="${size}" data-product="${product.id}" onclick="selectSize('${product.id}','${size}')">${size}</button>
                    `).join('')}
                </div>
                <input type="hidden" id="selected-size-${product.id}" value="">
            </div>
            <div class="mb-2">
                <label class="block text-sm font-medium text-gray-700 mb-1">Quantity:</label>
                <input type="number" id="qty-${product.id}" min="1" max="10000" value="1" class="w-full quantity-input" placeholder="1">
            </div>
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold touch-button hover:bg-blue-700 transition-colors" onclick="addToCartWithQuantityAndColor(${product.id})">
                <i class="fas fa-plus mr-2"></i>Add to Cart
            </button>
        </div>`).join('');
        productGrid.innerHTML = html;
        currentCategory = backup;
    });
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
        const colorButtons = document.querySelectorAll(`[data-product="${productId}"][data-color]`);
        colorButtons.forEach(btn => btn.classList.add('error-highlight'));
        setTimeout(() => {
            colorButtons.forEach(btn => btn.classList.remove('error-highlight'));
        }, 2000);
        return;
    }

    const selectedSizeInput = document.getElementById(`selected-size-${productId}`);
    const selectedSize = selectedSizeInput.value;

    if (!selectedSize) {
        showNotification('Please select a size!', 'error');
        const sizeButtons = document.querySelectorAll(`[data-product="${productId}"][data-size]`);
        sizeButtons.forEach(btn => btn.classList.add('error-highlight'));
        setTimeout(() => {
            sizeButtons.forEach(btn => btn.classList.remove('error-highlight'));
        }, 2000);
        return;
    }

    let price = 0;
    if (product.prices && product.prices[selectedSize] !== undefined && !isNaN(product.prices[selectedSize])) {
        price = parseFloat(product.prices[selectedSize]);
        if (isNaN(price) || price <= 0) {
            showNotification('Invalid price for selected size!', 'error');
            return;
        }
    } else {
        showNotification('Invalid price for selected size!', 'error');
        return;
    }

    const cartItemId = `${productId}-${selectedColor}-${selectedSize}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.price = price;
        showNotification(`${product.name} (${selectedColor}, ${selectedSize}) quantity updated to ${quantity}!`);
    } else {
        cart.push({
            id: product.id,
            cartItemId: cartItemId,
            name: product.name,
            price: price,
            quantity: quantity,
            color: selectedColor,
            size: selectedSize
        });
        showNotification(`${product.name} (${selectedColor}, ${selectedSize}) added to cart! (Quantity: ${quantity})`);
    }

    // After adding/updating cart item, reset quantity input to 0 (not 1)
    quantityInput.value = 0;
    selectedColorInput.value = 'Mix';
    selectedSizeInput.value = '1500';

    const colorButtons = document.querySelectorAll(`[data-product="${productId}"][data-color]`);
    colorButtons.forEach(btn => btn.classList.remove('selected'));
    const mixBtn = document.querySelector(`[data-product="${productId}"][data-color="Mix"]`);
    if (mixBtn) mixBtn.classList.add('selected');

    const sizeButtons = document.querySelectorAll(`[data-product="${productId}"][data-size]`);
    sizeButtons.forEach(btn => btn.classList.remove('selected'));
    const defaultSizeBtn = document.querySelector(`[data-product="${productId}"][data-size="1500"]`);
    if (defaultSizeBtn) defaultSizeBtn.classList.add('selected');

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
    const totalElement = document.getElementById('total');
    const cartTotalElement = document.getElementById('cart-total');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Cart is empty</p>';
        subtotalElement.textContent = '0.00';
        totalElement.textContent = '0.00';
        cartTotalElement.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item bg-gray-50 rounded-lg p-3 border">
            <div class="flex justify-between items-center mb-2">
                <div>
                    <h4 class="font-semibold text-sm">${(item.name||'').trim()}${item.color ? '(' + item.color + ')' : ''}</h4>
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

    const subtotal = cart.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    const taxRate = cartTaxPercent / 100;
    const discountRate = cartDiscountPercent / 100;
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax - discount;
    subtotalElement.textContent = subtotal.toFixed(2);
    const taxElement = document.getElementById('tax');
    if (taxElement) taxElement.textContent = tax.toFixed(2);
    const discountElement = document.getElementById('discount');
    if (discountElement) discountElement.textContent = discount.toFixed(2);
    totalElement.textContent = total.toFixed(2);
    cartTotalElement.textContent = total.toFixed(2);
    const cartTotalMobileElement = document.getElementById('cart-total-mobile');
    if (cartTotalMobileElement) cartTotalMobileElement.textContent = total.toFixed(2);
    // Update tax and discount labels
    const taxLabel = document.getElementById('tax-label');
    if (taxLabel) taxLabel.textContent = `Tax (${cartTaxPercent.toFixed(1)}%):`;
    const discountLabel = document.getElementById('discount-label');
    if (discountLabel) discountLabel.textContent = `Discount (${cartDiscountPercent.toFixed(1)}%):`;
}

// Clear cart
function clearCart() {
    cart = [];
    cartTaxPercent = 0;
    cartDiscountPercent = 0;
    const cartTaxInput = document.getElementById('cart-tax-input');
    if (cartTaxInput) cartTaxInput.value = 0;
    const cartDiscountInput = document.getElementById('cart-discount-input');
    if (cartDiscountInput) cartDiscountInput.value = 0;
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
    const billDateEl = document.getElementById('bill-date');
    const billTimeEl = document.getElementById('bill-time');
    if (billDateEl) billDateEl.textContent = now.toLocaleDateString('en-IN');
    if (billTimeEl) billTimeEl.textContent = now.toLocaleTimeString('en-IN');

    const billItems = document.getElementById('bill-items');
    if (billItems) {
        // Build table rows for each item
        billItems.innerHTML = cart.map(item => {
            const name = (item.name|| '').trim();
            const nameWithColor = name + (item.color ? '(' + item.color + ')' : '');
            const size = item.size || '';
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            const lineTotal = qty * price;
            return `
                <tr>
                    <td style="padding:8px">${nameWithColor}</td>
                    <td style="text-align:center;padding:8px">${size}</td>
                    <td style="text-align:center;padding:8px">${qty}</td>
                    <td style="text-align:center;padding:8px">₹${price.toFixed(2)}</td>
                    <td style="text-align:right;padding:8px">₹${lineTotal.toFixed(2)}</td>
                </tr>`;
        }).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = cartTaxPercent / 100;
    const discountRate = cartDiscountPercent / 100;
    const tax = subtotal * taxRate;
    const discount = subtotal * discountRate;
    const total = subtotal + tax - discount;
    const billSubtotalEl = document.getElementById('bill-subtotal');
    const billTaxEl = document.getElementById('bill-tax');
    const billDiscountEl = document.getElementById('bill-discount');
    const billTotalEl = document.getElementById('bill-total');
    const billTaxLabel = document.getElementById('bill-tax-label');
    const billDiscountLabel = document.getElementById('bill-discount-label');

    if (billSubtotalEl) billSubtotalEl.textContent = subtotal.toFixed(2);
    if (billTaxEl) billTaxEl.textContent = tax.toFixed(2);
    if (billDiscountEl) billDiscountEl.textContent = discount.toFixed(2);
    if (billTotalEl) billTotalEl.textContent = total.toFixed(2);
    if (billTaxLabel) billTaxLabel.textContent = `Tax (${cartTaxPercent.toFixed(1)}%):`;
    if (billDiscountLabel) billDiscountLabel.textContent = `Discount (${cartDiscountPercent.toFixed(1)}%):`;
    // Prepare bill data for future printer integration
    const billData = {
        shopName: "Hello Plast Shop",
        date: now.toLocaleDateString('en-IN'),
        time: now.toLocaleTimeString('en-IN'),
        items: cart,
        subtotal: subtotal,
        tax: tax,
        discount: discount,
        total: total
    };
    // Print the bill
    // Temporarily clear document title to avoid printing page title/header in some browsers
    const oldTitle = document.title;
    try {
        document.title = '';
    } catch (e) {
        // ignore
    }

    // Some browsers include page headers/footers controlled by the print dialog and cannot be fully removed by JS.
    // Clearing the title reduces the chance of the site name appearing; users should disable headers/footers in print dialog for final receipts.

    // Use onafterprint to restore title
    function restoreTitle() {
        try { document.title = oldTitle; } catch (e) {}
        window.removeEventListener('afterprint', restoreTitle);
    }
    window.addEventListener('afterprint', restoreTitle);

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

// Read tax percent from header inputs (desktop/mobile)

// Show notification
function showNotification(message, type = 'success') {
    // Only show notifications for errors (silent success for touch workflows)
    if (type !== 'error') return;
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 bg-red-500 text-white';
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-exclamation-circle mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
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

// Toggle cart visibility from header button
function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (!cartPanel) return;
    if (cartPanel.classList.contains('hidden')) {
        cartPanel.classList.remove('hidden');
    } else {
        cartPanel.classList.add('hidden');
    }
}

// Wrapper to support header button calling Cart()
function Cart() {
    toggleCart();
}

// Apply cart tax from input (always reads latest value)
function applyCartTax() {
    const cartTaxInput = document.getElementById('cart-tax-input');
    if (cartTaxInput) {
        let val = cartTaxInput.value;
        cartTaxPercent = parseFloat(val);
        if (isNaN(cartTaxPercent) || cartTaxPercent < 0) cartTaxPercent = 0;
        updateCart();
    }
}
