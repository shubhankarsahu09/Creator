// Product data
const products = [
    {
        id: 1,
        title: "AirPods Pro",
        price: "$249.00",
        image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=800&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 2,
        title: "Magic Keyboard",
        price: "$299.00",
        image: "https://images.unsplash.com/photo-1579893963406-38f3cb290e22?q=80&w=800&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 3,
        title: "MacBook Air M2",
        price: "From $1199",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
        link: "#"
    },
    {
        id: 4,
        title: "Pro Display XDR",
        price: "$4999.00",
        image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=800&auto=format&fit=crop",
        link: "#"
    }
];

// My personal products data (Affiliate links)
const myProducts = [
    {
        id: 1,
        title: "Sony A7IV Camera",
        price: "$2498.00",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        link: "#affiliate-link-1"
    },
    {
        id: 2,
        title: "Shure SM7B Microphone",
        price: "$399.00",
        image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
        link: "#affiliate-link-2"
    },
    {
        id: 3,
        title: "Mechanical Keyboard",
        price: "$199.00",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=800&auto=format&fit=crop",
        link: "#affiliate-link-3"
    },
    {
        id: 4,
        title: "Ergonomic Mouse",
        price: "$99.99",
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=800&auto=format&fit=crop",
        link: "#affiliate-link-4"
    }
];

// Function to render products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    
    products.forEach(product => {
        // Create an anchor tag to wrap the whole card, mimicking Apple's clickable cards
        const card = document.createElement('a');
        card.href = product.link;
        card.className = 'product-card';
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <span class="buy-btn">Buy</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Function to render user's personal products
function renderMyProducts() {
    const grid = document.getElementById('myProductGrid');
    
    myProducts.forEach(product => {
        const card = document.createElement('a');
        card.href = product.link;
        card.className = 'product-card';
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <div class="product-price">${product.price}</div>
                <span class="buy-btn">View on Amazon</span>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderMyProducts();
});
