// Configuration file for Hello Plast Shop POS System
// Modify these values to customize your shop settings

const CONFIG = {
    // Shop Information
    SHOP_NAME: "Hello Plast Shop",
    SHOP_TAGLINE: "Your Trusted Plastic Products Partner",
    SHOP_ADDRESS: "123 Main Street, City, State - PIN",
    SHOP_PHONE: "+91 98765 43210",
    SHOP_EMAIL: "info@helloplastshop.com",
    
    // Tax Configuration
    TAX_RATE: 0.18, // 18% GST
    TAX_NAME: "GST",
    
    // Currency
    CURRENCY: "₹",
    CURRENCY_CODE: "INR",
    
    // UI Settings
    TOUCH_BUTTON_MIN_HEIGHT: 60, // pixels
    PRODUCT_GRID_MIN_WIDTH: 200, // pixels
    NOTIFICATION_DURATION: 3000, // milliseconds
    
    // Print Settings
    PRINT_HEADER_HEIGHT: 100, // pixels
    PRINT_FOOTER_HEIGHT: 80, // pixels
    
    // Cart Settings
    MAX_QUANTITY_PER_ITEM: 10000,
    CART_AUTO_SAVE: true,
    CART_SAVE_INTERVAL: 30000, // 30 seconds
    
    // Product Categories
    CATEGORIES: [
        { id: 'all', name: 'All Products', color: 'blue' },
        { id: 'casseroles', name: 'Casseroles', color: 'green' },
        { id: 'cookers', name: 'Cookers', color: 'orange' },
        { id: 'kettles', name: 'Kettles', color: 'purple' },
        { id: 'tiffins', name: 'Tiffins', color: 'red' },
        { id: 'water jug', name: 'Water Jugs', color: 'cyan' }
    ],
    
    // Color Management
    COLORS: {
        ENABLE_COLOR_SELECTION: true,
        REQUIRED_COLOR_SELECTION: true,
        COLOR_SELECTION_TYPE: "circles", // colored circles instead of buttons
        COLORS_PER_PRODUCT: 3, // 3 specific colors + 1 mix option
        MIX_OPTION: true, // Include mix option for all products
        DEFAULT_COLORS: ["Red", "Blue", "Green", "Yellow", "Black", "White", "Silver", "Gold", "Pink", "Orange", "Brown", "Gray"],
        CUSTOM_COLORS: false
    },
    
    // Size Management
    SIZES: {
        ENABLE_SIZE_SELECTION: true,
        REQUIRED_SIZE_SELECTION: true,
        AVAILABLE_SIZES: ["1000", "1500", "3000"],
        DEFAULT_SIZE: "1500"
    },
    
    // API Endpoints (for future integration)
    API_BASE_URL: "http://localhost:3000/api",
    ENDPOINTS: {
        PRODUCTS: "/products",
        TRANSACTIONS: "/transactions",
        PRINT: "/print",
        INVENTORY: "/inventory"
    },
    
    // Printer Settings (for future integration)
    PRINTER: {
        TYPE: "thermal", // thermal, inkjet, laser
        CONNECTION: "usb", // usb, network, serial
        WIDTH: 80, // characters per line
        AUTO_CUT: true,
        OPEN_DRAWER: false
    },
    
    // Receipt Template
    RECEIPT_TEMPLATE: {
        SHOW_LOGO: true,
        SHOW_QR_CODE: true,
        SHOW_BARCODE: false,
        SHOW_FOOTER_MESSAGE: true,
        FOOTER_MESSAGE: "Thank you for shopping with us! Visit again.",
        SHOW_TAX_BREAKDOWN: true,
        SHOW_PAYMENT_METHOD: true
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        CART: "pos_cart",
        SETTINGS: "pos_settings",
        RECENT_PRODUCTS: "pos_recent_products",
        SALES_HISTORY: "pos_sales_history"
    },
    
    // Feature Flags
    FEATURES: {
        INVENTORY_TRACKING: false,
        CUSTOMER_MANAGEMENT: false,
        SALES_REPORTS: false,
        MULTI_USER: false,
        OFFLINE_MODE: true,
        AUTO_BACKUP: false
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} 
