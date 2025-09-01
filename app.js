// Global Application State
let appState = {
    user: null,
    products: [],
    categories: [],
    cart: [],
    orders: [],
    currentPage: 'homepage',
    filters: {
        category: null,
        brand: [],
        rating: [],
        minPrice: 0,
        maxPrice: 2000,
        inStock: false,
        searchQuery: ''
    },
    sortBy: 'relevance',
    currentProduct: null,
    theme: localStorage.getItem('theme') || 'light'
};

// Mock Data
const mockData = {
    categories: [
        {
            id: 1,
            name: "Electronics",
            slug: "electronics",
            children: [
                {"id": 11, "name": "Smartphones", "slug": "smartphones"},
                {"id": 12, "name": "Laptops", "slug": "laptops"},
                {"id": 13, "name": "Headphones", "slug": "headphones"},
                {"id": 14, "name": "Cameras", "slug": "cameras"}
            ]
        },
        {
            id: 2,
            name: "Fashion",
            slug: "fashion",
            children: [
                {"id": 21, "name": "Men's Clothing", "slug": "mens-clothing"},
                {"id": 22, "name": "Women's Clothing", "slug": "womens-clothing"},
                {"id": 23, "name": "Footwear", "slug": "footwear"},
                {"id": 24, "name": "Accessories", "slug": "accessories"}
            ]
        },
        {
            id: 3,
            name: "Home & Kitchen",
            slug: "home-kitchen",
            children: [
                {"id": 31, "name": "Furniture", "slug": "furniture"},
                {"id": 32, "name": "Kitchen Appliances", "slug": "kitchen-appliances"},
                {"id": 33, "name": "Home Decor", "slug": "home-decor"}
            ]
        }
    ],
    products: [
        {
            id: 1,
            name: "iPhone 15 Pro Max",
            slug: "iphone-15-pro-max",
            category_id: 11,
            price: 1199,
            original_price: 1299,
            brand: "Apple",
            rating: 4.8,
            reviews_count: 2450,
            stock: 25,
            images: ["https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500", "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"],
            description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
            features: ["A17 Pro Chip", "48MP Main Camera", "5G Connectivity", "Face ID"],
            specifications: {
                Display: "6.7-inch Super Retina XDR",
                Storage: "256GB",
                RAM: "8GB",
                Battery: "4422mAh"
            }
        },
        {
            id: 2,
            name: "Samsung Galaxy S24 Ultra",
            slug: "samsung-galaxy-s24-ultra",
            category_id: 11,
            price: 1099,
            original_price: 1199,
            brand: "Samsung",
            rating: 4.7,
            reviews_count: 1890,
            stock: 18,
            images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500", "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500"],
            description: "Premium Android flagship with S Pen, 200MP camera, and AI features",
            features: ["S Pen Included", "200MP Camera", "Snapdragon 8 Gen 3", "S24 Ultra AI"],
            specifications: {
                Display: "6.8-inch Dynamic AMOLED",
                Storage: "512GB",
                RAM: "12GB",
                Battery: "5000mAh"
            }
        },
        {
            id: 3,
            name: "MacBook Pro 14-inch M3",
            slug: "macbook-pro-14-m3",
            category_id: 12,
            price: 1599,
            original_price: 1699,
            brand: "Apple",
            rating: 4.9,
            reviews_count: 1250,
            stock: 12,
            images: ["https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"],
            description: "Professional laptop with M3 chip, Liquid Retina XDR display, and all-day battery",
            features: ["M3 Chip", "Liquid Retina XDR", "18-hour Battery", "Magic Keyboard"],
            specifications: {
                Processor: "Apple M3",
                Display: "14.2-inch Liquid Retina XDR",
                RAM: "16GB",
                Storage: "512GB SSD"
            }
        },
        {
            id: 4,
            name: "Dell XPS 13 Plus",
            slug: "dell-xps-13-plus",
            category_id: 12,
            price: 1299,
            original_price: 1399,
            brand: "Dell",
            rating: 4.6,
            reviews_count: 890,
            stock: 8,
            images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500", "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500"],
            description: "Ultra-thin laptop with 13.4-inch OLED display and Intel 12th Gen processor",
            features: ["OLED Display", "Intel 12th Gen", "Zero Lattice Design", "Windows 11"],
            specifications: {
                Processor: "Intel Core i7-1280P",
                Display: "13.4-inch OLED",
                RAM: "16GB",
                Storage: "512GB SSD"
            }
        },
        {
            id: 5,
            name: "Sony WH-1000XM5",
            slug: "sony-wh-1000xm5",
            category_id: 13,
            price: 299,
            original_price: 349,
            brand: "Sony",
            rating: 4.8,
            reviews_count: 3200,
            stock: 45,
            images: ["https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500", "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500"],
            description: "Industry-leading noise canceling wireless headphones with premium sound",
            features: ["Active Noise Canceling", "30-hour Battery", "Touch Controls", "Quick Charge"],
            specifications: {
                Driver: "30mm",
                Battery: "30 hours",
                Connectivity: "Bluetooth 5.2",
                Weight: "249g"
            }
        },
        {
            id: 6,
            name: "AirPods Pro 2nd Gen",
            slug: "airpods-pro-2nd-gen",
            category_id: 13,
            price: 249,
            original_price: 279,
            brand: "Apple",
            rating: 4.7,
            reviews_count: 2100,
            stock: 32,
            images: ["https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500", "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500"],
            description: "Active Noise Cancellation, Transparency mode, and Spatial Audio",
            features: ["Active Noise Cancellation", "Spatial Audio", "MagSafe Charging", "H2 Chip"],
            specifications: {
                Battery: "6 hours + 24 hours case",
                Connectivity: "Bluetooth 5.3",
                "Water Resistance": "IPX4",
                Chip: "Apple H2"
            }
        },
        {
            id: 7,
            name: "Canon EOS R5",
            slug: "canon-eos-r5",
            category_id: 14,
            price: 3899,
            original_price: 4199,
            brand: "Canon",
            rating: 4.9,
            reviews_count: 567,
            stock: 15,
            images: ["https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500", "https://images.unsplash.com/photo-1515968885461-5ac8b0ad7f5e?w=500"],
            description: "Professional mirrorless camera with 45MP full-frame sensor and 8K video",
            features: ["45MP Full-Frame", "8K Video", "5-Axis Stabilization", "Dual Pixel AF"],
            specifications: {
                Sensor: "45MP Full-Frame CMOS",
                Video: "8K30p, 4K120p",
                ISO: "100-51200",
                Battery: "LP-E6NH"
            }
        },
        {
            id: 8,
            name: "Nike Air Max 270",
            slug: "nike-air-max-270",
            category_id: 23,
            price: 150,
            original_price: 180,
            brand: "Nike",
            rating: 4.5,
            reviews_count: 2800,
            stock: 50,
            images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500", "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500"],
            description: "Lifestyle shoe with Nike's biggest heel Air unit for maximum comfort",
            features: ["Max Air Unit", "Breathable Mesh", "Durable Rubber Outsole", "Classic Design"],
            specifications: {
                Material: "Mesh and Synthetic",
                Sole: "Rubber",
                Technology: "Air Max",
                Closure: "Lace-up"
            }
        }
    ],
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            password: "password123",
            role: "customer",
            phone: "+1234567890",
            verified: true,
            created_at: "2024-01-15T10:30:00Z"
        },
        {
            id: 2,
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
            phone: "+1234567891",
            verified: true,
            created_at: "2024-01-01T00:00:00Z"
        }
    ],
    orders: [
        {
            id: 1,
            user_id: 1,
            status: "delivered",
            total: 1498,
            items: [
                {product_id: 1, quantity: 1, price: 1199},
                {product_id: 5, quantity: 1, price: 299}
            ],
            shipping_address: {
                name: "John Doe",
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zip: "10001"
            },
            payment: {
                method: "card",
                transaction_id: "TXN123456",
                gateway: "razorpay"
            },
            created_at: "2024-02-01T14:30:00Z"
        }
    ]
};

// Utility Functions
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => container.removeChild(toast), 300);
    }, 3000);
}

function formatPrice(price) {
    return `$${price.toLocaleString()}`;
}

function calculateDiscount(original, current) {
    return Math.round(((original - current) / original) * 100);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
    appState.currentPage = pageId;
    
    // Update URL without page reload
    const pageMap = {
        'homepage': '/',
        'productsPage': '/products',
        'cartPage': '/cart',
        'checkoutPage': '/checkout',
        'profilePage': '/profile',
        'adminPage': '/admin'
    };
    
    if (pageMap[pageId]) {
        window.history.pushState({page: pageId}, '', pageMap[pageId]);
    }
}

// Authentication Functions
function login(email, password) {
    const user = mockData.users.find(u => u.email === email && u.password === password);
    if (user) {
        appState.user = user;
        updateAuthUI();
        showToast('Login successful!');
        closeModal('loginModal');
        return true;
    }
    showToast('Invalid credentials', 'error');
    return false;
}

function register(userData) {
    // Simulate user registration
    const newUser = {
        id: Date.now(),
        ...userData,
        role: 'customer',
        verified: false,
        created_at: new Date().toISOString()
    };
    
    mockData.users.push(newUser);
    showToast('Registration successful! Please verify your email.');
    closeModal('registerModal');
    showModal('otpModal');
    startOtpTimer();
}

function logout() {
    appState.user = null;
    appState.cart = [];
    updateAuthUI();
    updateCartUI();
    showToast('Logged out successfully');
    showPage('homepage');
}

function updateAuthUI() {
    const loginBtn = document.getElementById('loginBtn');
    const userDropdown = document.getElementById('userDropdown');
    const userName = document.getElementById('userName');
    const adminLink = document.getElementById('adminLink');
    
    if (appState.user) {
        loginBtn.classList.add('hidden');
        userDropdown.classList.remove('hidden');
        userName.textContent = appState.user.name;
        
        if (appState.user.role === 'admin') {
            adminLink.classList.remove('hidden');
        } else {
            adminLink.classList.add('hidden');
        }
    } else {
        loginBtn.classList.remove('hidden');
        userDropdown.classList.add('hidden');
    }
}

// OTP Functions
function startOtpTimer() {
    let timeLeft = 60;
    const timer = document.getElementById('otpTimer');
    const resendBtn = document.getElementById('resendOtp');
    
    const countdown = setInterval(() => {
        timer.textContent = timeLeft;
        timeLeft--;
        
        if (timeLeft < 0) {
            clearInterval(countdown);
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend OTP';
        }
    }, 1000);
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Theme Functions
function toggleTheme() {
    const currentTheme = appState.theme === 'light' ? 'dark' : 'light';
    appState.theme = currentTheme;
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Product Functions
function renderProducts(products = appState.products, containerId = 'productsGrid') {
    const grid = document.getElementById(containerId);
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<div class="empty-state" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">No products found matching your criteria.</div>';
        return;
    }
    
    grid.innerHTML = products.map(product => {
        const discount = calculateDiscount(product.original_price, product.price);
        return `
            <div class="product-card" data-product-id="${product.id}">
                <img src="${product.images[0]}" alt="${product.name}" class="product-image" loading="lazy">
                <div class="product-info">
                    <div class="product-brand">${product.brand}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-rating">
                        <div class="rating-stars">${generateStars(product.rating)}</div>
                        <span class="rating-count">(${product.reviews_count})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.original_price > product.price ? `
                            <span class="original-price">${formatPrice(product.original_price)}</span>
                            <span class="discount">${discount}% off</span>
                        ` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn--primary add-to-cart" data-product-id="${product.id}">
                            Add to Cart
                        </button>
                        <button class="add-to-wishlist" data-product-id="${product.id}">
                            <i class="far fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update results count
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${products.length} products found`;
    }
}

function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    const categoryIcons = {
        'electronics': 'fas fa-laptop',
        'fashion': 'fas fa-tshirt',
        'home-kitchen': 'fas fa-home'
    };
    
    grid.innerHTML = mockData.categories.map(category => `
        <div class="category-card" data-category-id="${category.id}" onclick="navigateToCategory(${category.id})">
            <i class="${categoryIcons[category.slug] || 'fas fa-cube'}"></i>
            <h3>${category.name}</h3>
            <p>${category.children.length} subcategories</p>
        </div>
    `).join('');
}

function navigateToCategory(categoryId) {
    // Get products for this category and its children
    const category = mockData.categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const childCategoryIds = category.children.map(child => child.id);
    const categoryProducts = mockData.products.filter(product => 
        childCategoryIds.includes(product.category_id)
    );
    
    // Update app state
    appState.filters.category = categoryId;
    appState.products = categoryProducts;
    
    // Navigate to products page
    showPage('productsPage');
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumbNav');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="#" onclick="showPage('homepage')">Home</a> > ${category.name}`;
    }
    
    // Render products
    renderProducts();
}

function showProductDetail(productId) {
    const product = mockData.products.find(p => p.id === parseInt(productId));
    if (!product) return;
    
    appState.currentProduct = product;
    
    const container = document.getElementById('productDetail');
    container.innerHTML = `
        <div class="product-gallery">
            <img src="${product.images[0]}" alt="${product.name}" class="main-image" id="mainImage">
            <div class="thumbnail-images">
                ${product.images.map((img, index) => `
                    <img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                `).join('')}
            </div>
        </div>
        
        <div class="product-details">
            <div class="product-brand">${product.brand}</div>
            <h1>${product.name}</h1>
            
            <div class="product-rating">
                <div class="rating-stars">${generateStars(product.rating)}</div>
                <span class="rating-count">(${product.reviews_count} reviews)</span>
            </div>
            
            <div class="product-price">
                <span class="current-price">${formatPrice(product.price)}</span>
                ${product.original_price > product.price ? `
                    <span class="original-price">${formatPrice(product.original_price)}</span>
                    <span class="discount">${calculateDiscount(product.original_price, product.price)}% off</span>
                ` : ''}
            </div>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-features">
                <h3>Key Features</h3>
                <div class="features-list">
                    ${product.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="quantity-selector">
                <label>Quantity:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="adjustQuantity(-1)">-</button>
                    <input type="number" class="quantity-input" id="productQuantity" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" onclick="adjustQuantity(1)">+</button>
                </div>
            </div>
            
            <div class="stock-info">
                <span class="${product.stock > 0 ? 'in-stock' : 'out-of-stock'}">
                    ${product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
                </span>
            </div>
            
            <div class="product-actions">
                <button class="btn btn--primary btn--lg add-to-cart" data-product-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                    ${product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button class="btn btn--outline btn--lg" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
            
            <div class="product-specs">
                <h3>Specifications</h3>
                <div class="specs-table">
                    ${Object.entries(product.specifications).map(([key, value]) => `
                        <div class="spec-row">
                            <span class="spec-key">${key}:</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    showPage('productDetailPage');
}

function adjustQuantity(delta) {
    const input = document.getElementById('productQuantity');
    if (!input) return;
    
    const current = parseInt(input.value);
    const max = parseInt(input.getAttribute('max'));
    const newValue = current + delta;
    
    if (newValue >= 1 && newValue <= max) {
        input.value = newValue;
    }
}

function buyNow(productId) {
    addToCart(productId, parseInt(document.getElementById('productQuantity').value));
    setTimeout(() => {
        initializeCheckout();
    }, 500);
}

// Cart Functions
function addToCart(productId, quantity = 1) {
    if (!appState.user) {
        showModal('loginModal');
        showToast('Please login to add items to cart', 'warning');
        return;
    }
    
    const product = mockData.products.find(p => p.id === parseInt(productId));
    if (!product || product.stock === 0) {
        showToast('Product not available', 'error');
        return;
    }
    
    const existingItem = appState.cart.find(item => item.product_id === parseInt(productId));
    
    if (existingItem) {
        if (existingItem.quantity + quantity <= product.stock) {
            existingItem.quantity += quantity;
            showToast('Cart updated successfully');
        } else {
            showToast('Not enough stock available', 'error');
            return;
        }
    } else {
        appState.cart.push({
            product_id: parseInt(productId),
            quantity: quantity,
            price: product.price
        });
        showToast('Added to cart successfully');
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    appState.cart = appState.cart.filter(item => item.product_id !== parseInt(productId));
    updateCartUI();
    renderCartItems();
    showToast('Item removed from cart');
}

function updateCartQuantity(productId, quantity) {
    const item = appState.cart.find(item => item.product_id === parseInt(productId));
    if (item) {
        const product = mockData.products.find(p => p.id === parseInt(productId));
        if (quantity <= 0) {
            removeFromCart(productId);
        } else if (quantity <= product.stock) {
            item.quantity = quantity;
            updateCartUI();
            renderCartItems();
        } else {
            showToast('Not enough stock available', 'error');
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = appState.cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const itemsTotal = document.getElementById('itemsTotal');
    const taxAmount = document.getElementById('taxAmount');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!container) return;
    
    if (appState.cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started</p>
                <button class="btn btn--primary" onclick="showPage('homepage')">Continue Shopping</button>
            </div>
        `;
        
        if (itemsTotal) itemsTotal.textContent = '$0.00';
        if (taxAmount) taxAmount.textContent = '$0.00';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }
    
    let subtotal = 0;
    
    container.innerHTML = appState.cart.map(item => {
        const product = mockData.products.find(p => p.id === item.product_id);
        if (!product) return '';
        
        const itemTotal = product.price * item.quantity;
        subtotal += itemTotal;
        
        return `
            <div class="cart-item">
                <img src="${product.images[0]}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${product.name}</h3>
                    <div class="cart-item-brand">${product.brand}</div>
                    <div class="cart-item-price">${formatPrice(product.price)} each</div>
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity - 1})">-</button>
                            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${product.stock}" 
                                onchange="updateCartQuantity(${product.id}, parseInt(this.value))">
                            <button class="quantity-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <span class="item-total">${formatPrice(itemTotal)}</span>
                        <button class="remove-item" onclick="removeFromCart(${product.id})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Update totals
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    if (itemsTotal) itemsTotal.textContent = formatPrice(subtotal);
    if (taxAmount) taxAmount.textContent = formatPrice(tax);
    if (cartTotal) cartTotal.textContent = formatPrice(total);
    
    // Update shipping cost display
    const shippingCost = document.getElementById('shippingCost');
    if (shippingCost) {
        shippingCost.textContent = subtotal > 50 ? 'FREE' : formatPrice(shipping);
    }
}

// Search and Filter Functions
function performSearch(query) {
    if (!query.trim()) {
        appState.products = [...mockData.products];
        renderProducts();
        return;
    }
    
    appState.filters.searchQuery = query;
    const filteredProducts = mockData.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    
    appState.products = filteredProducts;
    showPage('productsPage');
    renderProducts();
    
    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumbNav');
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="#" onclick="showPage('homepage')">Home</a> > Search: "${query}"`;
    }
}

function applyFilters() {
    let filteredProducts = [...mockData.products];
    
    // Search filter
    if (appState.filters.searchQuery) {
        const query = appState.filters.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(query) ||
            product.brand.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Category filter
    if (appState.filters.category) {
        const category = mockData.categories.find(c => c.id === appState.filters.category);
        if (category) {
            const childCategoryIds = category.children.map(child => child.id);
            filteredProducts = filteredProducts.filter(product =>
                childCategoryIds.includes(product.category_id)
            );
        }
    }
    
    // Brand filter
    if (appState.filters.brand.length > 0) {
        filteredProducts = filteredProducts.filter(product =>
            appState.filters.brand.includes(product.brand)
        );
    }
    
    // Rating filter
    if (appState.filters.rating.length > 0) {
        filteredProducts = filteredProducts.filter(product => {
            return appState.filters.rating.some(rating => product.rating >= rating);
        });
    }
    
    // Price filter
    filteredProducts = filteredProducts.filter(product =>
        product.price >= appState.filters.minPrice &&
        product.price <= appState.filters.maxPrice
    );
    
    // Stock filter
    if (appState.filters.inStock) {
        filteredProducts = filteredProducts.filter(product => product.stock > 0);
    }
    
    // Apply sorting
    switch (appState.sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
    }
    
    appState.products = filteredProducts;
    renderProducts();
}

const debouncedApplyFilters = debounce(applyFilters, 300);

function initializeFilters() {
    // Get unique brands
    const brands = [...new Set(mockData.products.map(p => p.brand))];
    const brandFilters = document.getElementById('brandFilters');
    
    if (brandFilters) {
        brandFilters.innerHTML = brands.map(brand => `
            <label class="checkbox-label">
                <input type="checkbox" value="${brand}" onchange="updateBrandFilter('${brand}', this.checked)">
                ${brand}
            </label>
        `).join('');
    }
    
    // Initialize rating filters
    const ratingFilters = document.getElementById('ratingFilters');
    if (ratingFilters) {
        ratingFilters.innerHTML = [4, 3, 2, 1].map(rating => `
            <label class="checkbox-label">
                <input type="checkbox" value="${rating}" onchange="updateRatingFilter(${rating}, this.checked)">
                ${generateStars(rating)} & above
            </label>
        `).join('');
    }
}

function updateBrandFilter(brand, checked) {
    if (checked) {
        appState.filters.brand.push(brand);
    } else {
        appState.filters.brand = appState.filters.brand.filter(b => b !== brand);
    }
    debouncedApplyFilters();
}

function updateRatingFilter(rating, checked) {
    if (checked) {
        appState.filters.rating.push(rating);
    } else {
        appState.filters.rating = appState.filters.rating.filter(r => r !== rating);
    }
    debouncedApplyFilters();
}

function clearAllFilters() {
    appState.filters = {
        category: null,
        brand: [],
        rating: [],
        minPrice: 0,
        maxPrice: 2000,
        inStock: false,
        searchQuery: ''
    };
    
    // Reset UI
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    const minPriceValue = document.getElementById('minPriceValue');
    const maxPriceValue = document.getElementById('maxPriceValue');
    const inStockOnly = document.getElementById('inStockOnly');
    const sortSelect = document.getElementById('sortSelect');
    
    if (minPrice) minPrice.value = 0;
    if (maxPrice) maxPrice.value = 2000;
    if (minPriceValue) minPriceValue.textContent = 0;
    if (maxPriceValue) maxPriceValue.textContent = 2000;
    if (inStockOnly) inStockOnly.checked = false;
    if (sortSelect) sortSelect.value = 'relevance';
    
    // Reset checkboxes
    document.querySelectorAll('#brandFilters input, #ratingFilters input').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    appState.products = [...mockData.products];
    renderProducts();
}

// Admin Functions (keeping the existing ones)
function renderAdminDashboard() {
    if (!appState.user || appState.user.role !== 'admin') {
        showToast('Access denied', 'error');
        showPage('homepage');
        return;
    }
    
    // Update stats
    document.getElementById('totalProducts').textContent = mockData.products.length;
    document.getElementById('totalOrders').textContent = mockData.orders.length;
    
    const totalRevenue = mockData.orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('totalRevenue').textContent = formatPrice(totalRevenue);
    
    renderAdminProducts();
    renderAdminOrders();
    renderSalesChart();
}

function renderAdminProducts() {
    const container = document.getElementById('adminProductsList');
    if (!container) return;
    
    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${mockData.products.map(product => `
                    <tr>
                        <td>#${product.id}</td>
                        <td><img src="${product.images[0]}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                        <td>${product.name}</td>
                        <td>${product.brand}</td>
                        <td>${formatPrice(product.price)}</td>
                        <td>${product.stock}</td>
                        <td class="admin-actions">
                            <button class="action-btn edit" onclick="editProduct(${product.id})">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-btn delete" onclick="deleteProduct(${product.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderAdminOrders() {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${mockData.orders.map(order => {
                    const user = mockData.users.find(u => u.id === order.user_id);
                    return `
                        <tr>
                            <td>#${order.id}</td>
                            <td>${user ? user.name : 'Unknown'}</td>
                            <td><span class="status status--${order.status === 'delivered' ? 'success' : 'info'}">${order.status}</span></td>
                            <td>${formatPrice(order.total)}</td>
                            <td>${new Date(order.created_at).toLocaleDateString()}</td>
                            <td class="admin-actions">
                                <button class="action-btn edit" onclick="updateOrderStatus(${order.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

function renderSalesChart() {
    const ctx = document.getElementById('salesChart');
    if (!ctx) return;
    
    // Mock sales data for the chart
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Sales ($)',
            data: [12000, 19000, 15000, 25000, 22000, 30000],
            borderColor: '#1FB8CD',
            backgroundColor: 'rgba(31, 184, 205, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };
    
    new Chart(ctx, {
        type: 'line',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Checkout Functions (keeping existing ones but simplified)
let checkoutStep = 1;
let checkoutData = {
    shipping: {},
    payment: {},
    items: []
};

function initializeCheckout() {
    if (appState.cart.length === 0) {
        showToast('Your cart is empty', 'warning');
        showPage('cartPage');
        return;
    }
    
    checkoutStep = 1;
    checkoutData.items = appState.cart.map(item => {
        const product = mockData.products.find(p => p.id === item.product_id);
        return {
            product,
            quantity: item.quantity,
            price: item.price
        };
    });
    
    updateCheckoutStep();
    showPage('checkoutPage');
}

function updateCheckoutStep() {
    // Update step indicators
    document.querySelectorAll('.step').forEach((step, index) => {
        const stepNum = index + 1;
        step.classList.remove('active', 'completed');
        
        if (stepNum < checkoutStep) {
            step.classList.add('completed');
        } else if (stepNum === checkoutStep) {
            step.classList.add('active');
        }
    });
    
    // Show current step
    document.querySelectorAll('.checkout-step').forEach((step, index) => {
        step.classList.toggle('hidden', index + 1 !== checkoutStep);
    });
}

function nextCheckoutStep() {
    if (checkoutStep < 3) {
        checkoutStep++;
        updateCheckoutStep();
        
        if (checkoutStep === 3) {
            renderOrderReview();
        }
    }
}

function renderOrderReview() {
    const container = document.getElementById('orderReview');
    const subtotal = checkoutData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    container.innerHTML = `
        <div class="order-review">
            <div class="review-section" style="margin-bottom: 24px;">
                <h3>Shipping Address</h3>
                <div class="address-display" style="background: var(--color-bg-1); padding: 16px; border-radius: 8px;">
                    ${checkoutData.shipping.name}<br>
                    ${checkoutData.shipping.address}<br>
                    ${checkoutData.shipping.city}, ${checkoutData.shipping.state} ${checkoutData.shipping.zip}
                </div>
            </div>
            
            <div class="review-section" style="margin-bottom: 24px;">
                <h3>Order Items</h3>
                <div class="order-items">
                    ${checkoutData.items.map(item => `
                        <div class="order-item" style="display: flex; align-items: center; gap: 16px; padding: 16px; border: 1px solid var(--color-border); border-radius: 8px; margin-bottom: 12px;">
                            <img src="${item.product.images[0]}" alt="${item.product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 4px;">
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 4px 0;">${item.product.name}</h4>
                                <p style="margin: 0; color: var(--color-text-secondary);">Quantity: ${item.quantity}</p>
                                <p style="margin: 4px 0 0 0; font-weight: bold; color: var(--color-primary);">${formatPrice(item.price * item.quantity)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="review-section">
                <h3>Order Summary</h3>
                <div class="order-summary" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: 8px; padding: 20px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Subtotal:</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span>Shipping:</span>
                        <span>${shipping > 0 ? formatPrice(shipping) : 'FREE'}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                        <span>Tax:</span>
                        <span>${formatPrice(tax)}</span>
                    </div>
                    <hr>
                    <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; margin-top: 12px;">
                        <span>Total:</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function placeOrder() {
    const subtotal = checkoutData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    const newOrder = {
        id: Date.now(),
        user_id: appState.user.id,
        status: 'processing',
        total: total,
        items: checkoutData.items.map(item => ({
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.price
        })),
        shipping_address: checkoutData.shipping,
        payment: checkoutData.payment,
        created_at: new Date().toISOString()
    };
    
    mockData.orders.push(newOrder);
    
    // Update product stock
    checkoutData.items.forEach(item => {
        const product = mockData.products.find(p => p.id === item.product.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });
    
    // Clear cart
    appState.cart = [];
    updateCartUI();
    
    showToast('Order placed successfully!');
    showPage('profilePage');
    switchProfileTab('orders');
}

// Profile Functions
function switchProfileTab(tabName) {
    document.querySelectorAll('.profile-menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelectorAll('.profile-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`profile${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`).classList.add('active');
    
    if (tabName === 'orders') {
        renderUserOrders();
    }
}

function renderUserOrders() {
    const container = document.getElementById('ordersList');
    if (!container || !appState.user) return;
    
    const userOrders = mockData.orders.filter(order => order.user_id === appState.user.id);
    
    if (userOrders.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary); padding: 32px;">No orders found.</p>';
        return;
    }
    
    container.innerHTML = userOrders.map(order => `
        <div class="order-item">
            <div class="order-header">
                <div class="order-id">Order #${order.id}</div>
                <div class="order-date">${new Date(order.created_at).toLocaleDateString()}</div>
            </div>
            <div class="order-products">
                ${order.items.map(item => {
                    const product = mockData.products.find(p => p.id === item.product_id);
                    return product ? `
                        <div class="order-product">
                            <img src="${product.images[0]}" alt="${product.name}" class="order-product-image">
                            <div>
                                <h4>${product.name}</h4>
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                        </div>
                    ` : '';
                }).join('')}
            </div>
            <div class="order-footer">
                <span class="status status--${order.status === 'delivered' ? 'success' : 'info'}">${order.status}</span>
                <div class="order-total">${formatPrice(order.total)}</div>
            </div>
        </div>
    `).join('');
}

// Global functions for onclick handlers
window.navigateToCategory = navigateToCategory;
window.adjustQuantity = adjustQuantity;
window.buyNow = buyNow;
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.updateBrandFilter = updateBrandFilter;
window.updateRatingFilter = updateRatingFilter;
window.editProduct = (id) => showToast('Edit product feature coming soon!');
window.deleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = mockData.products.findIndex(p => p.id === id);
        if (index !== -1) {
            mockData.products.splice(index, 1);
            renderAdminProducts();
            showToast('Product deleted successfully');
        }
    }
};
window.updateOrderStatus = (id) => showToast('Order status update feature coming soon!');

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    }, 1500);
    
    // Initialize data
    appState.products = [...mockData.products];
    appState.categories = [...mockData.categories];
    appState.orders = [...mockData.orders];
    
    // Set theme
    document.documentElement.setAttribute('data-color-scheme', appState.theme);
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = appState.theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    
    // Render initial content
    renderCategories();
    renderProducts(mockData.products, 'featuredProducts'); // Show featured products on homepage
    initializeFilters();
    updateAuthUI();
    updateCartUI();
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Start Shopping button
    const startShoppingBtn = document.querySelector('.hero-content .btn--primary');
    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', () => {
            showPage('productsPage');
            applyFilters();
        });
    }
    
    // Authentication
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            showModal('loginModal');
        });
    }
    
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    const showRegister = document.getElementById('showRegister');
    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('loginModal');
            showModal('registerModal');
        });
    }
    
    const showLogin = document.getElementById('showLogin');
    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal('registerModal');
            showModal('loginModal');
        });
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            login(email, password);
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userData = {
                name: document.getElementById('registerName').value,
                email: document.getElementById('registerEmail').value,
                phone: document.getElementById('registerPhone').value,
                password: document.getElementById('registerPassword').value
            };
            
            // Basic validation
            const confirmPassword = document.getElementById('confirmRegisterPassword').value;
            if (userData.password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            register(userData);
        });
    }
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (searchInput) {
                performSearch(searchInput.value);
            }
        });
    }
    
    // Navigation
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            renderCartItems();
            showPage('cartPage');
        });
    }
    
    const profileLink = document.getElementById('profileLink');
    if (profileLink) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('profilePage');
            renderUserOrders();
        });
    }
    
    const adminLink = document.getElementById('adminLink');
    if (adminLink) {
        adminLink.addEventListener('click', (e) => {
            e.preventDefault();
            renderAdminDashboard();
            showPage('adminPage');
        });
    }
    
    const ordersLink = document.getElementById('ordersLink');
    if (ordersLink) {
        ordersLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('profilePage');
            switchProfileTab('orders');
        });
    }
    
    // Checkout
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', initializeCheckout);
    }
    
    // Filters
    const clearFiltersBtn = document.getElementById('clearFilters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    if (minPrice) {
        minPrice.addEventListener('input', (e) => {
            appState.filters.minPrice = parseInt(e.target.value);
            const minPriceValue = document.getElementById('minPriceValue');
            if (minPriceValue) minPriceValue.textContent = e.target.value;
            debouncedApplyFilters();
        });
    }
    
    if (maxPrice) {
        maxPrice.addEventListener('input', (e) => {
            appState.filters.maxPrice = parseInt(e.target.value);
            const maxPriceValue = document.getElementById('maxPriceValue');
            if (maxPriceValue) maxPriceValue.textContent = e.target.value;
            debouncedApplyFilters();
        });
    }
    
    const inStockOnly = document.getElementById('inStockOnly');
    if (inStockOnly) {
        inStockOnly.addEventListener('change', (e) => {
            appState.filters.inStock = e.target.checked;
            debouncedApplyFilters();
        });
    }
    
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            appState.sortBy = e.target.value;
            applyFilters();
        });
    }
    
    // Checkout forms
    const shippingForm = document.getElementById('shippingForm');
    if (shippingForm) {
        shippingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            checkoutData.shipping = {
                name: document.getElementById('shippingName').value,
                address: document.getElementById('shippingAddress').value,
                city: document.getElementById('shippingCity').value,
                state: document.getElementById('shippingState').value,
                zip: document.getElementById('shippingZip').value
            };
            nextCheckoutStep();
        });
    }
    
    const continueToReview = document.getElementById('continueToReview');
    if (continueToReview) {
        continueToReview.addEventListener('click', () => {
            const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
            if (!paymentMethodInput) {
                showToast('Please select a payment method', 'error');
                return;
            }
            
            const paymentMethod = paymentMethodInput.value;
            checkoutData.payment = { method: paymentMethod };
            
            if (paymentMethod === 'card') {
                const cardNumber = document.getElementById('cardNumber');
                const cardExpiry = document.getElementById('cardExpiry');
                const cardCvv = document.getElementById('cardCvv');
                
                if (!cardNumber?.value || !cardExpiry?.value || !cardCvv?.value) {
                    showToast('Please fill all card details', 'error');
                    return;
                }
                
                checkoutData.payment.cardNumber = cardNumber.value;
                checkoutData.payment.cardExpiry = cardExpiry.value;
            }
            
            nextCheckoutStep();
        });
    }
    
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', placeOrder);
    }
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal.id);
        });
    });
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Global click handler
    document.addEventListener('click', (e) => {
        // Product card clicks
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            const productId = card.getAttribute('data-product-id');
            if (!e.target.closest('.add-to-cart') && !e.target.closest('.add-to-wishlist')) {
                showProductDetail(productId);
            }
        }
        
        // Add to cart clicks
        if (e.target.closest('.add-to-cart')) {
            e.preventDefault();
            e.stopPropagation();
            const btn = e.target.closest('.add-to-cart');
            const productId = btn.getAttribute('data-product-id');
            const quantityInput = document.getElementById('productQuantity');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            addToCart(productId, quantity);
        }
        
        // Product detail image thumbnails
        if (e.target.classList.contains('thumbnail')) {
            const mainImage = document.getElementById('mainImage');
            const thumbnails = document.querySelectorAll('.thumbnail');
            
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            e.target.classList.add('active');
            if (mainImage) mainImage.src = e.target.src;
        }
    });
});