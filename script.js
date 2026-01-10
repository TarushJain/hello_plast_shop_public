// Format bill as plain text for 80mm thermal printer (48 chars width)
function formatThermalReceipt(cart, totals, shopInfo) {
    const width = 48;
    const line = (ch = '-') => ch.repeat(width);
    const center = (text) => {
        text = text.trim();
        const pad = Math.floor((width - text.length) / 2);
        return ' '.repeat(Math.max(0, pad)) + text + ' '.repeat(Math.max(0, width - text.length - pad));
    };
    let receipt = '';
    // Top margin - 4 lines with period to ensure printer recognizes them
    receipt += '.\n';
    receipt += '.\n';
    receipt += '.\n';
    receipt += '.\n';
    receipt += center(shopInfo.name) + '\n';
    if (shopInfo.address) receipt += center(shopInfo.address) + '\n';
    if (shopInfo.phone) receipt += center('Ph: ' + shopInfo.phone) + '\n';
    receipt += line() + '\n';
    receipt += 'Date: ' + totals.date + '  Time: ' + totals.time + '\n';
    receipt += line() + '\n';
    receipt += 'Item                 Qty  Rate   Total\n';
    receipt += line() + '\n';
    cart.forEach(item => {
        let name = item.name.padEnd(20).slice(0, 20);
        let qty = String(item.quantity).padStart(3);
        let rate = item.price.toFixed(2).padStart(6);
        let total = (item.price * item.quantity).toFixed(2).padStart(7);
        receipt += `${name}${qty} ${rate} ${total}\n`;
    });
    receipt += line() + '\n';
    receipt += `Subtotal:           ${totals.subtotal.toFixed(2).padStart(width-18)}\n`;
    receipt += `Tax:                ${totals.tax.toFixed(2).padStart(width-18)}\n`;
    receipt += `Discount:           ${totals.discount.toFixed(2).padStart(width-18)}\n`;
    receipt += `TOTAL:              ${totals.total.toFixed(2).padStart(width-18)}\n`;
    receipt += line() + '\n';
    receipt += center('Thank you!') + '\n\n\n';
    // Bottom margin - 4 lines with period to ensure printer recognizes them
    receipt += '.\n';
    receipt += '.\n';
    receipt += '.\n';
    receipt += '.\n';
    return receipt;
}

// Send the formatted receipt to a local Node.js print server
function sendToThermalPrinter(receiptText) {
    fetch('http://localhost:3001/print', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ receipt: receiptText })
    })
    .then(res => res.json())
    .then(data => {
        if (data.status === 'ok') {
            showNotification('Sent to thermal printer!', 'success');
        } else {
            showNotification('Printer error: ' + (data.error || 'Unknown'), 'error');
        }
    })
    .catch(err => {
        showNotification('Could not reach print server', 'error');
    });
}

// ============================================
// BLUETOOTH THERMAL PRINTER INTEGRATION
// ============================================

// Printer configuration
const PRINTER_BLUETOOTH_ADDRESS = "86:67:7A:28:B6:5B";
let printerConnected = false;
let Printer = null;

// Initialize Capacitor Printer plugin (only available in Capacitor app)
async function initPrinter() {
    try {
        // Check if we're in a Capacitor environment
        if (typeof window !== 'undefined' && window.Capacitor) {
            // Try to load Capacitor plugins
            try {
                const { Plugins } = await import('@capacitor/core');
                Printer = Plugins.Printer;
                
                // Auto-connect to printer on app start
                await connectToPrinter();
                console.log('Printer initialized and connected');
            } catch (importError) {
                console.log('Could not import Capacitor plugins:', importError);
            }
        } else {
            console.log('Not in Capacitor environment - printer features will be disabled');
            console.log('Note: Bluetooth printing only works in the Android app, not in browser');
        }
    } catch (error) {
        console.log('Printer initialization error:', error);
        // Fallback: printer features will be disabled
    }
}

// Connect to Bluetooth printer
async function connectToPrinter() {
    if (!Printer) {
        console.log('Printer plugin not available');
        return false;
    }
    
    try {
        const result = await Printer.connect({ address: PRINTER_BLUETOOTH_ADDRESS });
        if (result.success) {
            printerConnected = true;
            console.log('Printer connected successfully');
            return true;
        } else {
            printerConnected = false;
            console.error('Failed to connect to printer:', result.message);
            return false;
        }
    } catch (error) {
        console.error('Printer connection error:', error);
        printerConnected = false;
        return false;
    }
}

// Check printer connection status
async function checkPrinterConnection() {
    if (!Printer) return false;
    
    try {
        const result = await Printer.isConnected();
        printerConnected = result.connected;
        return printerConnected;
    } catch (error) {
        console.error('Check connection error:', error);
        printerConnected = false;
        return false;
    }
}

// Print bill to Bluetooth thermal printer
async function printBillToBluetoothPrinter(billData) {
    if (!Printer) {
        showNotification("Printer plugin not available. Please use the Android app.", "error");
        return false;
    }
    
    // Ensure printer is connected
    if (!printerConnected) {
        showNotification("Connecting to printer...", "info");
        const connected = await connectToPrinter();
        if (!connected) {
            showNotification("Failed to connect to printer. Please check Bluetooth settings.", "error");
            return false;
        }
    }
    
    try {
        // Convert bill data to JSON string
        const billJson = JSON.stringify(billData);
        
        showNotification("Printing bill...", "info");
        
        const result = await Printer.printBill({ billData: billJson });
        
        if (result.success) {
            showNotification("Bill printed successfully!", "success");
            return true;
        } else {
            showNotification("Print failed: " + (result.message || "Unknown error"), "error");
            return false;
        }
    } catch (error) {
        console.error('Print error:', error);
        showNotification("Print error: " + error.message, "error");
        return false;
    }
}

// Main handler for the thermal printer button
async function printThermalBill() {
    if (cart.length === 0) {
        showNotification("Cart is empty!", "error");
        return;
    }
    
    const now = new Date();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = cartTaxPercent / 100;
    const discountRate = cartDiscountPercent / 100;
    const tax = subtotal * taxRate;
    // Discount is applied to (subtotal + tax), not just subtotal
    const discount = (subtotal + tax) * discountRate;
    const total = subtotal + tax - discount;
    
    // Prepare bill data in the format expected by the native plugin
    const billData = {
        shopName: "Hello Plast Shop",
        date: now.toLocaleDateString('en-IN'),
        time: now.toLocaleTimeString('en-IN'),
        items: cart.map(item => ({
            name: item.name || '',
            size: item.size || '',
            quantity: item.quantity || 0,
            price: item.price || 0
        })),
        subtotal: subtotal,
        tax: tax,
        discount: discount,
        total: total
    };
    
    // Print to Bluetooth printer
    await printBillToBluetoothPrinter(billData);
}
// Product database - In a real app, this would come from a backend API
const products = [
    //Packaging
    { id: 1, name: "Packaging", category: "Packaging", image: "packaging.jpg", sizes: ["1"], prices: { "1":310 }, retailPrices: { "1":320 } },
//favourites
{ id: 9, name: "Zigma ", category: "casseroles", image: "ZIGMA 2000 - BLACK.png", sizes: ["2000", "3000", "3500","4200","4500", "5000","6000","7500","12500","18000"], prices: { "2000":170, "3000":220, "3500":235,"4200":280,"4500":310, "5000":330,"6000":380,"7500":480,"12500":705,"18000":890 }, retailPrices: { "2000":175, "3000":225, "3500":240,"4200":285,"4500":320, "5000":340,"6000":400,"7500":500,"12500":730,"18000":915 } },

{ id: 4, name: "Croma SS", category: "casseroles", image: "croma ss 3000-black.jpg", sizes: ["2000", "3000", "3500","4500","5000"], prices: { "2000": 170, "3000": 220, "3500": 235 , "4500":310, "5000":330 }, retailPrices: { "2000": 175, "3000": 230, "3500": 240 , "4500":320, "5000":340 } },
{ id: 7, name: "Onyx", category: "casseroles", image: "onyx1500.png", sizes: ["600","1500","1700", "3500", "5000"], prices: { "600": 70, "1500":110, "1700":132 , "3500": 180, "5000": 243 }, retailPrices: { "600": 72, "1500":113, "1700":135 , "3500": 185, "5000": 250 } },
{ id: 3, name: "Croma ", category: "casseroles", image: "croma pink.jpg", sizes: ["1500", "2000", "3000", "4500","5500","7000"], prices: { "1500":115, "2000":135, "3000":185 , "4500":243,"5500":335,"7000":435}, retailPrices: { "1500":118, "2000":140, "3000":190 , "4500":250,"5500":345,"7000":450} },
{ id: 6, name: "Lotus", category: "casseroles", image: "lotus blue.jpg", sizes: ["2400", "3000", "5000"], prices: { "2400": 137, "3000": 165, "5000": 243 }, retailPrices: { "2400": 140, "3000": 170, "5000": 250 } },
{ id: 27, name: "Loto", category: "tiffins", image: "loto red.jpg", sizes: ["2+1", "3+1", "4"], prices: {"2+1":162 , "3+1":177 , "4":197 }, retailPrices: {"2+1":165 , "3+1":180 , "4":200 } },
{ id: 21, name: "Cammy ", category: "tiffins", image: "cammy_3_BROWN.jpg", sizes: ["3", "4"], prices: { "3":248, "4": 315 }, retailPrices: { "3":255, "4": 322 } },
{ id: 20, name: "Bonton", category: "tiffins", image: "BONTON_TIFFEN.jpeg", sizes: ["1"], prices: { "1": 85 }, retailPrices: { "1": 85 } },
{ id: 24, name: "Happytime", category: "tiffins", image: "HAPPYTIME_TIFFEN.jpeg", sizes: ["1"], prices: { "1": 65 }, retailPrices: { "1": 65 } },
{ id: 17, name: "Zigma Kettle", category: "kettles", image: "zigma_kettle.jpg", sizes: ["800", "1200", "1600"], prices: { "800": 210, "1200": 220, "1600": 250 }, retailPrices: { "800": 215, "1200": 225, "1600": 260 } },
    
    // Casseroles
{ id: 2, name: "Cresto ", category: "casseroles", image: "cresto.jpg", sizes: ["2400", "3000", "5000"], prices: { "2400": 190, "3000": 220, "5000": 300 }, retailPrices: { "2400": 200, "3000": 230, "5000": 310 } },

{ id: 5, name: "Cuba", category: "casseroles", image: "cuba_red.jpg", sizes: ["1700", "2000", "3200", "4500"], prices: { "1700": 127, "2000": 145, "3200": 190, "4500":273 }, retailPrices: { "1700": 130, "2000": 150, "3200": 195, "4500":280 } },


{ id: 10, name: "Zigma Deluxe", category: "casseroles", image: "ZIGMA DELUXE 3000 - BLACK.png", sizes: ["2000",  "3000","4200", "4500"], prices: { "2000" : 190,  "3000" :240, "4200":300, "4500":330}, retailPrices: { "2000" : 195,  "3000" :245, "4200":305, "4500":340} },
{ id: 11, name: "Zigma Handi", category: "casseroles", image: "zigma_handi.jpeg", sizes: [ "3000", "4500"], prices: { "3000" :230, "4500":320}, retailPrices: { "3000" :235, "4500":330} },
    // Cookers
{ id: 12, name: "Handi (ISI)", category: "cookers", image: "handi_page.jpg", sizes: ["3", "5","7","10","12","15"], prices: {"3":700, "5":740,"7":780,"10":1275,"12":1350,"15":1425}, retailPrices: {"3":700, "5":740,"7":780,"10":1275,"12":1350,"15":1425} },
{ id: 13, name: "Handi (anodise)", category: "cookers", image: "handi_page.jpg", sizes: ["3", "5","7"], prices: { "3":960, "5":1010,"7":1060}, retailPrices: {  "3":960, "5":1010,"7":1060 } }, 
{ id: 45, name: "Lagan Handi 10G", category: "cookers", image: "handi_page.jpg", sizes: ["2","3", "5","8"], prices: {"2":435 ,"3":510, "5":530, "8":560 }, retailPrices: {"2":435 ,"3":510, "5":530, "8":560  } },
{ id: 40, name: "Outer-Lid (ISI)", category: "cookers", image: "matki_steel_5.png", sizes: ["3", "5"], prices: { "3":685, "5":755 }, retailPrices: {  "3":685, "5":755 } },
{ id: 41, name: "Matki steel(Tri-ply)", category: "cookers", image: "matki_steel_5Ltr..png", sizes: ["3", "5"], prices: { "3":1150, "5":1250 }, retailPrices: {  "3":1150, "5":1250 } },     
{ id: 14, name: "Matki (ISI)", category: "cookers", image: "matki_steel_5Ltr..png", sizes: ["2", "3", "5","7"], prices: { "2":525, "3":700, "5":740,"7":780}, retailPrices: {"2":525, "3":700, "5":740,"7":780} },
{ id: 38, name: "Royal(ISI)", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["2","3", "5","7","10","12","15"], prices: { "2":665,"3":685, "5":725,"7":765,"10":1250,"12":1325,"15":1400}, retailPrices: {"2":665,"3":685, "5":725,"7":765,"10":1250,"12":1325,"15":1400 } },    
{ id: 39, name: "Royal (anodise)", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["3", "5","7"], prices: { "3":945, "5":995,"7":1045}, retailPrices: { "3":945, "5":995,"7":1045} },
{ id: 42, name: "Royal steel (Triply)", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["3", "5"], prices: { "3":1100, "5":1200 }, retailPrices: {  "3":1100, "5":1200 } },
{ id: 43, name: "Lagan 8G (ISI)", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["3", "5","7"], prices: { "3":580, "5":600,"7":620 }, retailPrices: { "3":580, "5":600,"7":620 } },
{ id: 44, name: "Hello 10G", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["1.5","2","3", "5","7"], prices: { "1.5":405,"2":475,"3":485, "5":505,"7":525 }, retailPrices: { "1.5":405,"2":475,"3":485, "5":505,"7":525 } },

{ id: 46, name: "G-star 11G", category: "cookers", image: "hello_Steel_cooker_plain.jpg", sizes: ["3", "5"], prices: { "3":405, "5":425 }, retailPrices: {  "3":405, "5":425 } },
    // Kettles
{ id: 15, name: "Coral Kettle", category: "kettles", image: "coral kattle green.jpg", sizes:["1"], prices: { "1":210 }, retailPrices: { "1":215 }},
{ id: 16, name: "Cosmos Kettle", category: "kettles", image: "Cosmo Kettle_blue.jpg", sizes: ["800", "1200"], prices: { "800": 147, "1200": 157}, retailPrices: { "800": 150, "1200": 160} },

    // Tiffins
{ id: 18, name: "Apple", category: "tiffins", image: "Apple steel-pp.jpg", sizes: ["Plastic", "Steel"], prices: { "Plastic":50 , "Steel":60 }, retailPrices: { "Plastic":52 , "Steel":62 } },
{ id: 19, name: "Jolly", category: "tiffins", image: "jolly_tiffin.jpeg", sizes: ["Plastic", "Steel"], prices: { "Plastic":165 , "Steel":205 }, retailPrices: { "Plastic":170 , "Steel":210 } },


{ id: 22, name: "Cherish", category: "tiffins", image: "Cherish Tifin blue.jpg", sizes: ["3", "4"], prices: { "3":475, "4":555}, retailPrices: { "3":495, "4":575} },
{ id: 23, name: "Coral ", category: "tiffins", image: "Corel 3 RED.jpg", sizes: ["2", "3", "4","4+1"], prices: {"2":162 , "3":182 , "4":215 ,"4+1":220}, retailPrices: {"2":165 , "3":185 , "4":220 ,"4+1":225} },

{ id: 25, name: "Leo ", category: "tiffins", image: "LEO_2_ORANGE.jpg", sizes: ["2", "3"], prices: { "2": 165, "3": 205}, retailPrices: { "2": 170, "3": 210} },
{ id: 26, name: "Loto SS", category: "tiffins", image: "LOTO DELUXE_blue.jpg", sizes: ["3", "4"], prices: { "3":222, "4": 242}, retailPrices: { "3":225, "4": 245} },

{ id: 28, name: "Reo ", category: "tiffins", image: "REO_3_TIFFEN.jpeg", sizes: ["2", "3"], prices: { "2": 118, "3": 143}, retailPrices: { "2": 120, "3": 145} },
{ id: 29, name: "Zigma ", category: "tiffins", image: "zigma_tiffen_ black.jpg", sizes: ["3", "4", "5"], prices: { "3": 570, "4": 650, "5": 1200 }, retailPrices: { "3": 590, "4": 670, "5": 1250 } },
{ id: 30, name: "Flora", category: "tiffins", image: "flora_tiffin.jpeg", sizes: ["Steel"], prices: {"Steel":263 }, retailPrices: {"Steel":270 } },
{ id: 47, name: "Crystal", category: "tiffins", image: "flora_tn.jpeg", sizes: ["1","2"], prices: {"1":55,"2":88 }, retailPrices: {"1":57,"2":92} },
{ id: 48, name: "Tip Top", category: "tiffins", image: "flora_in.jpeg", sizes: ["1"], prices: {"1":60 }, retailPrices: {"1":60 } },
{ id: 49, name: "Picnic", category: "tiffins", image: "flora_tiffin.jpeg", sizes: ["3"], prices: {"3":110 }, retailPrices: {"3":120 } },
{ id: 50, name: "Lock dabbi small", category: "tiffins", image: "", sizes: ["small"], prices: {"small":40 }, retailPrices: {"small":42 } },
{ id: 51, name: "Lock dabbi big", category: "tiffins", image: "flora_tiffin.jpeg", sizes: ["big"], prices: {"big":60 }, retailPrices: {"big":62 } },
    // Water Jugs
{ id: 31, name: "Croma Jug", category: "water jug", image: "CROMA_JUG_24_RED.jpg", sizes: ["6", "24"], prices: { "6": 230, "24": 485}, retailPrices: { "6": 250, "24": 500} },
{ id: 32, name: "Zigma Jug", category: "water jug", image: "zigma jug 18 black.jpg", sizes: ["5", "7.5","10", "12.5", "18"], prices: {"5":360 , "7.5": 480, "10":585, "12.5":705 , "18": 890}, retailPrices: {"5":375 , "7.5": 500, "10":600, "12.5":730 , "18": 915} },
    //Sets
{ id: 33, name: "Onyx Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["600/1500/1700","1500/1700/3500","1700/3500/5000"], prices: { "600/1500/1700":315,"1500/1700/3500":425,"1700/3500/5000":555}, retailPrices: {"600/1500/1700":320,"1500/1700/3500":435,"1700/3500/5000":570} },
{ id: 34, name: "Casa Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["2400/3000/5000"], prices: { "2400/3000/5000":545}, retailPrices: {"2400/3000/5000":560} },
{ id: 35, name: "Croma Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["1500/2000/3000","3000/4500/5500"], prices: { "1500/2000/3000":435,"3000/4500/5500":765}, retailPrices: {"1500/2000/3000":450,"3000/4500/5500":785} },
{ id: 36, name: "Cresto Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["2400/3000/5000"], prices: { "2400/3000/5000":710}, retailPrices: {"2400/3000/5000":740} },
{ id: 37, name: "Croma SS Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["2000/3000/4500"], prices: { "2000/3000/4500":700}, retailPrices: {"2000/3000/4500":720} },
{ id: 52, name: "Zigma SS Set", category: "Sets", image: "Apple steel-p.jpg", sizes: ["2000/3000/4500"], prices: { "2000/3000/4500":700}, retailPrices: {"2000/3000/4500":720} }
];

// Global variables
let cart = [];
let isCompactView = false; // Track 'No Photo View' state
let currentCategory = 'all';
let cartTaxPercent = 0; // Tax percent for cart popup
let cartDiscountPercent = 0; // Discount percent for cart popup
// Price mode: 'W' = Wholesale, 'R' = Retail
let priceMode = 'W';
let isSearchActive = false; // Track if search is currently active

// Initialize the app
// Initialize printer on page load
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize printer connection (only works in Capacitor Android app)
    await initPrinter();
    // Always show all products on load
    displayProducts('all');

    // Fix W/R toggle for new header
    const wBtn = document.getElementById('wholesale-btn');
    const rBtn = document.getElementById('retail-btn');
    function updatePriceToggleUI() {
        if (priceMode === 'W') {
            wBtn.classList.add('active');
            rBtn.classList.remove('active');
        } else {
            wBtn.classList.remove('active');
            rBtn.classList.add('active');
        }
    }
    if (wBtn && rBtn) {
        wBtn.onclick = function() {
            if (priceMode !== 'W') {
                priceMode = 'W';
                updatePriceToggleUI();
                displayProducts(currentCategory);
                updateCart();
            }
        };
        rBtn.onclick = function() {
            if (priceMode !== 'R') {
                priceMode = 'R';
                updatePriceToggleUI();
                displayProducts(currentCategory);
                updateCart();
            }
        };
        updatePriceToggleUI();
    }

    // ...existing code...
    updateTime();
    // Add list view toggle functionality to the list button
    const listViewToggle = document.getElementById('list-view-toggle');
    if (listViewToggle) {
        // Function to update button icon based on view state
        function updateListViewIcon() {
            const icon = listViewToggle.querySelector('i');
            if (icon) {
                if (isCompactView) {
                    // List view is active, show tiles/grid icon
                    icon.className = 'fas fa-th';
                    listViewToggle.title = 'Switch to tiles view';
                } else {
                    // Tiles view is active, show list icon
                    icon.className = 'fas fa-list';
                    listViewToggle.title = 'Switch to list view';
                }
            }
            // Visual feedback: change button appearance when list view is active
            if (isCompactView) {
                // List view is active, show tiles icon with white background and blue icon
                listViewToggle.classList.add('bg-white');
                listViewToggle.classList.remove('text-white');
                // Set icon color to blue to be visible on white background
                const icon = listViewToggle.querySelector('i');
                if (icon) icon.style.color = '#ffffff'; // white
            } else {
                // Tiles view is active, show list icon with transparent background and white icon
                listViewToggle.classList.remove('bg-white');
                listViewToggle.classList.add('text-white');
                const icon = listViewToggle.querySelector('i');
                if (icon) icon.style.color = '#ffffff'; // white
            }
        }
        
        listViewToggle.onclick = function() {
            isCompactView = !isCompactView;
            displayProducts(currentCategory);
            updateListViewIcon();
        };
        
        // Initialize icon on page load
        updateListViewIcon();
    }
    setInterval(updateTime, 1000);
    setupKeyboardShortcuts();
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) cartPanel.classList.add('hidden');
    attachSearchHandler();
    // ...existing code...
    // Reset tax and discount to 0 on page load
    cartTaxPercent = 0;
    cartDiscountPercent = 0;
    
    // Attach handler for cart tax input
    const cartTaxInput = document.getElementById('cart-tax-input');
    if (cartTaxInput) {
        cartTaxInput.value = 0; // Reset to 0 on refresh
        cartTaxInput.addEventListener('input', function() {
            cartTaxPercent = parseFloat(cartTaxInput.value) || 0;
            updateCart();
        });
    }
    // Attach handler for cart discount input
    const cartDiscountInput = document.getElementById('cart-discount-input');
    if (cartDiscountInput) {
        cartDiscountInput.value = 0; // Reset to 0 on refresh
        cartDiscountInput.addEventListener('input', function() {
            cartDiscountPercent = parseFloat(cartDiscountInput.value) || 0;
            updateCart();
        });
    }
    preventZoomOnTouchDevices();
    // Update header height immediately and after a short delay to ensure accurate measurement
    updateHeaderHeightCSSVar();
    setTimeout(updateHeaderHeightCSSVar, 100);
    setTimeout(updateHeaderHeightCSSVar, 500);
    window.addEventListener('resize', updateHeaderHeightCSSVar);
    window.addEventListener('orientationchange', function() {
        setTimeout(updateHeaderHeightCSSVar, 100);
    });
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
        // Enter key to add to cart (ONLY when quantity input is focused)
        if (e.key === 'Enter' && document.activeElement.type === 'number' && document.activeElement.id.startsWith('qty-')) {
            e.preventDefault(); // Prevent form submission or other default behavior
            const productId = parseInt(document.activeElement.id.replace('qty-', ''));
            if (!isNaN(productId)) {
                addToCartWithQuantityAndColor(productId);
                // Blur the input to minimize/hide the keyboard
                document.activeElement.blur();
            }
            return; // Don't process further for quantity inputs
        }
        
        // Enter key on tax input - move to discount input and position cursor at end
        if (e.key === 'Enter' && document.activeElement.id === 'cart-tax-input') {
            e.preventDefault();
            const discountInput = document.getElementById('cart-discount-input');
            if (discountInput) {
                // Focus the discount input
                discountInput.focus();
                // Set cursor to the end of the value
                setTimeout(() => {
                    if (discountInput.setSelectionRange) {
                        discountInput.setSelectionRange(discountInput.value.length, discountInput.value.length);
                    }
                }, 10);
            }
            return;
        }
        
        // Enter key on discount input - blur to minimize keyboard
        if (e.key === 'Enter' && document.activeElement.id === 'cart-discount-input') {
            e.preventDefault();
            document.activeElement.blur();
            return;
        }
        
        // Enter key on search input - blur to minimize keyboard
        if (e.key === 'Enter' && document.activeElement.id === 'search-input') {
            e.preventDefault();
            document.activeElement.blur();
            return;
        }
        
        // For all other inputs (tax, etc.), let Enter work normally
        // This allows natural form navigation (move to next field, submit, etc.)
        
        // Escape key to clear quantity input
        if (e.key === 'Escape' && document.activeElement.type === 'number' && document.activeElement.id.startsWith('qty-')) {
            document.activeElement.value = 0;
            document.activeElement.blur();
        }
        
        // "c" to toggle cart quickly (only when not typing in an input)
        if (e.key.toLowerCase() === 'c' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
            toggleCart();
        }
    });
}

// Update CSS variable --header-height to match the header element's height
function updateHeaderHeightCSSVar() {
    const header = document.querySelector('header');
    if (!header) return;
    // Force a reflow to ensure accurate height measurement
    void header.offsetHeight;
    const height = header.getBoundingClientRect().height;
    const heightPx = Math.ceil(height) + 'px';
    // Set on both documentElement and body for maximum compatibility
    document.documentElement.style.setProperty('--header-height', heightPx);
    document.body.style.setProperty('--header-height', heightPx);
}

// Update current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (!timeElement) return; // Element doesn't exist, skip update
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-IN');
    const dateString = now.toLocaleDateString('en-IN');
    timeElement.textContent = `${dateString} ${timeString}`;
}

// Display products based on category filter
function displayProducts(category = 'all') {
    currentCategory = category;
    const productGrid = document.getElementById('product-grid');
    const filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    
    // Helper to get price based on mode
    function getDisplayPrice(product, size) {
        if (priceMode === 'R') {
            // Use retailPrices if available, otherwise fallback to wholesale price
            return (product.retailPrices && product.retailPrices[size] !== undefined) 
                ? product.retailPrices[size] 
                : (product.prices[size] || 0);
        }
        return product.prices[size] || 0;
    }

    if (isCompactView) {
        // Dense, text-only mode with size selection
        productGrid.innerHTML = filteredProducts.map(product => {
            const sizes = product.sizes || [];
            const defaultSize = sizes.length === 1 ? sizes[0] : (sizes.includes('1500') ? '1500' : sizes[0]);
            
            let html = `<div class='product-row bg-white border-b border-gray-200 px-2 py-2 flex items-center gap-2'>`;
            // Product name on left with fixed width for alignment
            html += `<span class='font-semibold text-sm' style='width: 150px; min-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>${product.name.trim()}</span>`;
            
            // Size selection buttons - 5px margin from product name, aligned consistently
            html += `<div class='flex gap-1 items-center' style='margin-left: 5px;'>`;
            html += sizes.map(size => `
                <button type='button' 
                        class='size-btn-list border border-gray-400 rounded px-2 py-1 text-xs${(size === defaultSize) ? ' selected' : ''}' 
                        data-size='${size}' 
                        data-product='${product.id}' 
                        onclick="selectSize('${product.id}', '${size}')"
                        title='${size}: ₹${getDisplayPrice(product, size)}'>
                    ${size}<br/><span style='font-size: 0.65rem;'>₹${getDisplayPrice(product, size)}</span>
                </button>
            `).join('');
            html += `</div>`;
            
            // Spacer to push quantity and button to right
            html += `<div class='flex-1'></div>`;
            
            // Quantity input
            html += `<input type='number' id='qty-${product.id}' min='0' max='10000' value='0' class='w-16 quantity-input text-xs px-2 py-1 border border-gray-300 rounded' placeholder='0'>`;
            
            // Add to cart button
            html += `<button class='bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold touch-button' onclick='addToCartWithQuantityAndColor(${product.id})'><i class='fas fa-plus mr-1'></i>Add</button>`;
            
            // Hidden input for selected size
            html += `<input type='hidden' id='selected-size-${product.id}' value='${defaultSize}'>`;
            
            html += `</div>`;
            return html;
        }).join('');
        productGrid.style.display = 'block';
    } else {
        productGrid.innerHTML = filteredProducts.map(product => {
            const sizes = product.sizes || [];
            const defaultSize = sizes.length === 1 ? sizes[0] : (sizes.includes('1500') ? '1500' : sizes[0]);
            return `
            <div class="product-card bg-white rounded-lg shadow-md p-3">
                <!-- Product Photo -->
                <div class="product-photo">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NEM1Ni44MzY2IDY0IDY0IDU2LjgzNjYgNjQgNDhDNjQgMzkuMTYzNCA1Ni44MzY2IDMyIDQ4IDMyQzM5LjE2MzQgMzIgMzIgMzkuMTYzNCAzMiA0OEMzMiA1Ni44MzY2IDM5LjE2MzQgNjQgNDggNjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='">
                </div>
                
                <!-- Product Name -->
                <h3 class="font-semibold text-base mb-0 text-center" style="margin-top: 2px; line-height: 1.2;">${product.name}</h3>
                
                <!-- Size Selection -->
                <div class="mb-2" style="margin-top: 2px;">
                    <label class="block text-sm font-medium text-gray-700 mb-0.5" style="margin-bottom: 2px;">Size</label>
                    <div class="size-grid">
                        ${sizes.map(size => `
                            <button type="button" 
                                    class="size-btn${(size === defaultSize) ? ' selected' : ''}" 
                                    data-size="${size}" 
                                    data-product="${product.id}" 
                                    onclick="selectSize('${product.id}', '${size}')">
                                <span>${size}</span>
                                <span>₹${getDisplayPrice(product, size)}</span>
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="selected-size-${product.id}" value="${defaultSize}">
                </div>
                
                <!-- Quantity and Add to Cart -->
                <div class="flex items-center gap-2">
                    <input type="number" 
                           id="qty-${product.id}"
                           min="0" 
                           max="10000" 
                           value="0"
                           class="flex-1 quantity-input border border-gray-300 rounded px-2 py-1.5"
                           placeholder="0">
                    <button class="add-to-cart-btn touch-button" 
                            onclick="addToCartWithQuantityAndColor(${product.id})">
                        <span>Add to</span>
                        <span>Cart</span>
                    </button>
                </div>
            </div>
        `;
        }).join('');
        productGrid.style.display = '';
    }
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
    // Clear search when category is selected
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
        isSearchActive = false;
    }
    displayProducts(category);
}

// Progressive "Starts With" Real-Time Search for POS
// Filters products on every keystroke using prefix-based matching
// Progressive "Starts With" Real-Time Search (NAME ONLY)
function attachSearchHandler() {
    const input = document.getElementById('search-input');
    if (!input) {
        console.error('Search input element not found!');
        return;
    }

    // Attach the input event listener for real-time search
    input.addEventListener('input', function (e) {
        const rawValue = this.value || '';
        const query = rawValue.trim().toLowerCase();

        // If input is empty → restore normal category view
        if (!query) {
            isSearchActive = false;
            displayProducts(currentCategory || 'all');
            return;
        }

        // Mark search as active
        isSearchActive = true;

        // Prefix-based progressive filtering (NAME ONLY)
        // Match products where name starts with the query (case-insensitive)
        const filteredProducts = products.filter(product => {
            // Safety check
            if (!product) return false;
            
            // Get product name and normalize it
            const name = product.name;
            if (!name) return false;
            
            // Convert to string, trim whitespace, convert to lowercase
            const productName = String(name).trim().toLowerCase();
            
            // Check if product name starts with query (prefix match)
            return productName.startsWith(query);
        });

        // Render filtered products immediately
        const productGrid = document.getElementById('product-grid');
        if (!productGrid) {
            console.error('Product grid element not found!');
            return;
        }

        if (filteredProducts.length === 0) {
            // Show empty state if no results
            productGrid.innerHTML = '<p class="text-gray-500 text-center py-8">No products found</p>';
        } else {
            // Use the existing filtered display function
            displayProductsFiltered(filteredProducts);
        }
    });
}

// Helper: show only filtered products using main display logic
function displayProductsFiltered(filteredProducts) {
    const productGrid = document.getElementById('product-grid');
    // Helper to get price based on mode
    function getDisplayPrice(product, size) {
        if (priceMode === 'R') {
            // Use retailPrices if available, otherwise fallback to wholesale price
            return (product.retailPrices && product.retailPrices[size] !== undefined) 
                ? product.retailPrices[size] 
                : (product.prices[size] || 0);
        }
        return product.prices[size] || 0;
    }
    if (isCompactView) {
        // Dense, text-only mode with size selection
        productGrid.innerHTML = filteredProducts.map(product => {
            const sizes = product.sizes || [];
            const defaultSize = sizes.length === 1 ? sizes[0] : (sizes.includes('1500') ? '1500' : sizes[0]);
            
            let html = `<div class='product-row bg-white border-b border-gray-200 px-2 py-2 flex items-center gap-2'>`;
            // Product name on left with fixed width for alignment
            html += `<span class='font-semibold text-sm' style='width: 150px; min-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'>${product.name.trim()}</span>`;
            
            // Size selection buttons - 5px margin from product name, aligned consistently
            html += `<div class='flex gap-1 items-center' style='margin-left: 5px;'>`;
            html += sizes.map(size => `
                <button type='button' 
                        class='size-btn-list border border-gray-400 rounded px-2 py-1 text-xs${(size === defaultSize) ? ' selected' : ''}' 
                        data-size='${size}' 
                        data-product='${product.id}' 
                        onclick="selectSize('${product.id}', '${size}')"
                        title='${size}: ₹${getDisplayPrice(product, size)}'>
                    ${size}<br/><span style='font-size: 0.65rem;'>₹${getDisplayPrice(product, size)}</span>
                </button>
            `).join('');
            html += `</div>`;
            
            // Spacer to push quantity and button to right
            html += `<div class='flex-1'></div>`;
            
            // Quantity input
            html += `<input type='number' id='qty-${product.id}' min='0' max='10000' value='0' class='w-16 quantity-input text-xs px-2 py-1 border border-gray-300 rounded' placeholder='0'>`;
            
            // Add to cart button
            html += `<button class='bg-blue-600 text-white px-3 py-1 rounded text-xs font-semibold touch-button' onclick='addToCartWithQuantityAndColor(${product.id})'><i class='fas fa-plus mr-1'></i>Add</button>`;
            
            // Hidden input for selected size
            html += `<input type='hidden' id='selected-size-${product.id}' value='${defaultSize}'>`;
            
            html += `</div>`;
            return html;
        }).join('');
        productGrid.style.display = 'block';
    } else {
        productGrid.innerHTML = filteredProducts.map(product => {
            const sizes = product.sizes || [];
            const defaultSize = sizes.length === 1 ? sizes[0] : (sizes.includes('1500') ? '1500' : sizes[0]);
            
            return `
            <div class="product-card bg-white rounded-lg shadow-md p-3">
                <!-- Product Photo -->
                <div class="product-photo">
                    <img src="${product.image}" alt="${product.name}" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9Ijk2IiBoZWlnaHQ9Ijk2IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00OCA2NCM1Ni44MzY2IDY0IDY0IDU2LjgzNjYgNjQgNDhDNjQgMzkuMTYzNCA1Ni44MzY2IDMyIDQ4IDMyQzM5LjE2MzQgMzIgMzIgMzkuMTYzNCAzMiA0OEMzMiA1Ni44MzY2IDM5LjE2MzQgNjQgNDggNjRaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo='">
                </div>
                
                <!-- Product Name -->
                <h3 class="font-semibold text-base mb-0 text-center" style="margin-top: 2px; line-height: 1.2;">${product.name}</h3>
                
                <!-- Size Selection -->
                <div class="mb-2" style="margin-top: 2px;">
                    <label class="block text-sm font-medium text-gray-700 mb-0.5" style="margin-bottom: 2px;">Size</label>
                    <div class="size-grid">
                        ${sizes.map(size => `
                            <button type="button" 
                                    class="size-btn${(size === defaultSize) ? ' selected' : ''}" 
                                    data-size="${size}" 
                                    data-product="${product.id}" 
                                    onclick="selectSize('${product.id}', '${size}')">
                                <span>${size}</span>
                                <span>₹${getDisplayPrice(product, size)}</span>
                            </button>
                        `).join('')}
                    </div>
                    <input type="hidden" id="selected-size-${product.id}" value="${defaultSize}">
                </div>
                
                <!-- Quantity and Add to Cart -->
                <div class="flex items-center gap-2">
                    <input type="number" 
                           id="qty-${product.id}"
                           min="0" 
                           max="10000" 
                           value="0"
                           class="flex-1 quantity-input border border-gray-300 rounded px-2 py-1.5"
                           placeholder="0">
                    <button class="add-to-cart-btn touch-button" 
                            onclick="addToCartWithQuantityAndColor(${product.id})">
                        <span>Add to</span>
                        <span>Cart</span>
                    </button>
                </div>
            </div>
        `;
        }).join('');
        productGrid.style.display = '';
    }
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
    
    // Focus the quantity input for this product
    const qtyInput = document.getElementById(`qty-${productId}`);
    if (qtyInput) {
        qtyInput.focus();
        qtyInput.select && qtyInput.select();
    }
    // Show visual feedback
    showNotification(`Size selected: ${size}`);
}

// Add product to cart with quantity and size selection
function addToCartWithQuantityAndColor(productId) {
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

    // Use price based on mode
    let price = 0;
    if (priceMode === 'R') {
        // Use retailPrices if available, otherwise fallback to wholesale price
        if (product.retailPrices && product.retailPrices[selectedSize] !== undefined && !isNaN(product.retailPrices[selectedSize])) {
            price = parseFloat(product.retailPrices[selectedSize]);
        } else if (product.prices && product.prices[selectedSize] !== undefined && !isNaN(product.prices[selectedSize])) {
            price = parseFloat(product.prices[selectedSize]);
        } else {
            showNotification('Invalid price for selected size!', 'error');
            return;
        }
    } else {
        // Wholesale mode
        if (product.prices && product.prices[selectedSize] !== undefined && !isNaN(product.prices[selectedSize])) {
            price = parseFloat(product.prices[selectedSize]);
        } else {
            showNotification('Invalid price for selected size!', 'error');
            return;
        }
    }
    
    if (isNaN(price) || price <= 0) {
        showNotification('Invalid price for selected size!', 'error');
        return;
    }

    const cartItemId = `${productId}-${selectedSize}`;
    const existingItem = cart.find(item => item.cartItemId === cartItemId);

    if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.price = price;
        showNotification(`${product.name} (${selectedSize}) quantity updated to ${quantity}!`);
    } else {
        cart.push({
            id: product.id,
            cartItemId: cartItemId,
            name: product.name,
            price: price,
            quantity: quantity,
            size: selectedSize
        });
        showNotification(`${product.name} (${selectedSize}) added to cart! (Quantity: ${quantity})`);
    }

    // After adding/updating cart item, reset quantity input to 0 (not 1)
    quantityInput.value = 0;
    selectedSizeInput.value = '1500';

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
                    <h4 class="font-semibold text-sm">${(item.name||'').trim()}</h4>
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

    // If price mode changed, update all cart item prices
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product && item.size) {
            if (priceMode === 'R') {
                // Use retailPrices if available, otherwise fallback to wholesale price
                if (product.retailPrices && product.retailPrices[item.size] !== undefined) {
                    item.price = parseFloat(product.retailPrices[item.size]);
                } else if (product.prices && product.prices[item.size] !== undefined) {
                    item.price = parseFloat(product.prices[item.size]);
                }
            } else {
                // Wholesale mode
                if (product.prices && product.prices[item.size] !== undefined) {
                    item.price = parseFloat(product.prices[item.size]);
                }
            }
        }
    });

    const subtotal = cart.reduce((sum, item) => {
        const itemTotal = item.price * item.quantity;
        return sum + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    const taxRate = cartTaxPercent / 100;
    const discountRate = cartDiscountPercent / 100;
    const tax = subtotal * taxRate;
    // Discount is applied to (subtotal + tax), not just subtotal
    const discount = (subtotal + tax) * discountRate;
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
        // Silent error - no notification
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
            const size = item.size || '';
            const qty = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            const lineTotal = qty * price;
            return `
                <tr>
                    <td style="padding:4px; font-weight: bold;">${name}</td>
                    <td style="text-align:center;padding:4px">${size}</td>
                    <td style="text-align:center;padding:4px">${qty}</td>
                    <td style="text-align:center;padding:4px">₹${price.toFixed(2)}</td>
                    <td style="text-align:right;padding:4px">₹${lineTotal.toFixed(2)}</td>
                </tr>`;
        }).join('');
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = cartTaxPercent / 100;
    const discountRate = cartDiscountPercent / 100;
    const tax = subtotal * taxRate;
    // Discount is applied to (subtotal + tax), not just subtotal
    const discount = (subtotal + tax) * discountRate;
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

    // Use onafterprint to restore title
    function restoreTitle() {
        try { document.title = oldTitle; } catch (e) {}
        window.removeEventListener('afterprint', restoreTitle);
    }
    window.addEventListener('afterprint', restoreTitle);

    window.print();
    // Notification removed - bill generation is silent
}

// Placeholder function for future printer integration
function sendToPrinter(billData) {
    console.log('Sending to printer:', billData);
}

// Show notification
function showNotification(message, type = 'success') {
    // Show all notification types (including info and success for printer operations)
    const notification = document.createElement('div');
    let bgColor = 'bg-gray-500';
    let icon = 'fa-info-circle';
    
    switch(type) {
        case 'success':
            bgColor = 'bg-green-500';
            icon = 'fa-check-circle';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            icon = 'fa-exclamation-circle';
            break;
        case 'info':
            bgColor = 'bg-blue-500';
            icon = 'fa-info-circle';
            break;
    }
    
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${bgColor} text-white`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${icon} mr-2"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.remove(); }, 3000);
}

// Placeholder for future backend API integration
async function fetchProductsFromAPI() {
    try {
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









