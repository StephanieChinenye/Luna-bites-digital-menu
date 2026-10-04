/* =====================================================
   LUNA BITES
   DIGITAL MENU JAVASCRIPT
===================================================== */


/* ================= MENU DATA ================= */

const menuItems = [

    {
        id: 1,
        name: "Luna Special Fried Rice",
        category: "Rice",
        price: 8500,
        image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=900&q=80",
        description: "Fragrant fried rice prepared with fresh vegetables and our signature seasoning."
    },

    {
        id: 2,
        name: "Native Jellof Rice",
        category: "Rice",
        price: 6500,
        image: "images/native jellof.jpg",
        description: "A classic favourite served with fresh vegetables and your choice of protein."
    },

    {
        id: 3,
        name: "Fried Rice",
        category: "Rice",
        price: 9000,
        image: "images/fried rice.jpg",
        description: "A delicious Chinese-inspired rice dish packed with flavour and fresh ingredients."
    },

    {
        id: 4,
        name: "White Rice",
        category: "Rice",
        price: 2000,
        image: "images/white rice.webp",
        description: "Rich and aromatic native-style rice prepared with carefully selected ingredients."
    },

    {
        id: 5,
        name: "Catfish Barbecue",
        category: "Proteins",
        price: 18000,
        image: "images/catfish barbecue.jpg",
        description: "Fresh catfish grilled to perfection and finished with our signature barbecue glaze."
    },

    {
        id: 6,
        name: "Grilled Goat Meat",
        category: "Proteins",
        price: 4500,
        image:"images/grilled goat meat.jfif" ,
        description: "Tender goat meat marinated with aromatic herbs and grilled until perfectly juicy."
    },

    {
        id: 7,
        name: "Peppered Chicken",
        category: "Proteins",
        price: 5000,
        image: "images/pepper chicken.webp",
        description: "Tender chicken tossed in a rich and spicy pepper sauce."
    },

    {
        id: 8,
        name: "Peppered Turkey",
        category: "Proteins",
        price: 5000,
        image: "images/pepper turkey.jpg",
        description: "Tender turkey tossed in a rich and spicy pepper sauce."
    },

    {
        id: 9,
        name: "Catfish Pepper Soup",
        category: "Proteins",
        price: 10000,
        image: "Catfish-Peppersoup.jpeg",
        description: "Spicy catfish soup infused with aromatic herbs and spices."
    },

    {
        id: 10,
        name: "Chapman",
        category: "Drinks",
        price: 2500,
        image: "images/chapman.jpeg",
        description: "A refreshing Nigerian-style cocktail-inspired soft drink."
    },

    {
        id: 11,
        name: "Fresh Mango Juice",
        category: "Drinks",
        price: 3000,
        image: "images/mango-juice.jpg",
        description: "Freshly prepared mango fruit juice bursting with natural flavour."
    },

    {
        id: 12,
        name: "Budweiser",
        category: "Drinks",
        price: 6500,
        image: "images/budweiser.png",
        description: "A classic beerbwith a crisp and refreshing taste, perfect for any occasion."
    },

    {
        id: 13,
        name: "Heineken",
        category: "Drinks",
        price: 3500,
        image: "images/heineken.jpg",
        description: "A classic beer with a crisp and refreshing taste, perfect for any occasion."
    },

    {
        id: 14,
        name: "Black Bullet",
        category: "Drinks",
        price: 2500,
        image: "images/black bullet.jfif",
        description: " A smooth bold flavor profile"
    },

    {
        id: 15,
        name: "Jack Williams",
        category: "Drinks",
        price: 8000,
        image: "images/jack williams.jfif",
        description: " super premium blend of whiskey."
    },

   {
        id: 16,
        name: "Four Cousins",
        category: "Drinks",
        price: 9000,
        image: "images/four cousins.webp",
        description: "A smooth and rich blend of whiskey with a hint of sweetness."
    },

    {
        id: 17,
        name: "Tequila Sunrice",
        category: "Cocktails",
        price: 7500,
        image: "images/Tequila sunrise.jpg",
        description: "A vibrant signature cocktail created for unforgettable evenings."
    },

    {
        id: 18,
        name: "Pink Cocktail",
        category: "Cocktails",
        price: 7500,
        image: "images/upscale cocktails.jpg",
        description: "A vibrant signature cocktail created for unforgettable evenings."
    },

    {
        id: 19,
        name: "Classic Mojito",
        category: "Cocktails",
        price: 7000,
        image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=900&q=80",
        description: "Refreshing mint, lime and sparkling flavours combined beautifully."
    },

    {
        id: 20,
        name: "Chocolate Cake",
        category: "Desserts",
        price: 4500,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
        description: "Rich chocolate cake served with a smooth and decadent finish."
    },

    {
        id: 21,
        name: "Vanilla Ice Cream",
        category: "Desserts",
        price: 3000,
        image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=900&q=80",
        description: "Creamy vanilla ice cream served chilled and delicious."
    },

    {
        id: 22,
        name: "Afang Soup",
        category: "Swallows",
        price: 4000,
        image: "images/afang soup.jpeg",
        description: "A traditional Nigerian soup made with afang leaves and your choice of protein."
    },

    {
        id: 23,
        name: "Egusi Soup",
        category: "Swallows",
        price: 2500,
        image: "images/egusi soup.webp",
        description: "Traditional Nigerian egusi soup served with your choice of protein."
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= ELEMENTS ================= */

const menuGrid = document.getElementById("menuGrid");

const categories = document.querySelectorAll(".category");

const searchInput = document.getElementById("searchInput");

const cartButton = document.getElementById("cartButton");

const cartElement = document.getElementById("cart");

const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartCount = document.getElementById("cartCount");

const cartTotal = document.getElementById("cartTotal");

const whatsappButton = document.getElementById("whatsappButton");

const noResults = document.getElementById("noResults");

const customerName =
    document.getElementById("customerName");

const customerPhone =
    document.getElementById("customerPhone");

const orderType =
    document.getElementById("orderType");

const deliveryAddress =
    document.getElementById("deliveryAddress");

    orderType.addEventListener("change", () => {

    if (orderType.value === "Delivery") {

        deliveryAddress.style.display = "block";

    } else {

        deliveryAddress.style.display = "none";

        deliveryAddress.value = "";

    }

});
/* ================= CURRENT FILTER ================= */

let currentCategory = "All";


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {

        style: "currency",

        currency: "NGN",

        maximumFractionDigits: 0

    }).format(price);

}


/* ================= DISPLAY MENU ================= */

function displayMenu(items) {

    menuGrid.innerHTML = "";

    if (items.length === 0) {

        noResults.style.display = "block";

        return;

    }

    noResults.style.display = "none";


    items.forEach(item => {

        const card = document.createElement("article");

        card.className = "menu-card";


        card.innerHTML = `

            <div class="menu-image-wrapper">

                <img
                    class="menu-image"
                    src="${item.image}"
                    alt="${item.name}"
                    loading="lazy"
                >

                <span class="menu-category-label">
                    ${item.category}
                </span>

            </div>


            <div class="menu-info">

                <div class="menu-top">

                    <h3 class="menu-name">
                        ${item.name}
                    </h3>

                    <span class="menu-price">
                        ${formatPrice(item.price)}
                    </span>

                </div>


                <p class="menu-description">
                    ${item.description}
                </p>


                <button
                    class="add-button"
                    onclick="addToCart(${item.id})"
                >

                    Add to Order

                </button>

            </div>

        `;


        menuGrid.appendChild(card);

    });

}


/* ================= FILTER MENU ================= */

function filterMenu() {

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();


    const filteredItems = menuItems.filter(item => {

        const matchesCategory =
            currentCategory === "All" ||
            item.category === currentCategory;


        const matchesSearch =
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);


        return matchesCategory && matchesSearch;

    });


    displayMenu(filteredItems);

}


/* ================= CATEGORY BUTTONS ================= */

categories.forEach(button => {

    button.addEventListener("click", () => {

        categories.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        currentCategory =
            button.dataset.category;


        filterMenu();

    });

});


/* ================= SEARCH ================= */

searchInput.addEventListener("input", filterMenu);


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const item = menuItems.find(
        product => product.id === id
    );


    const existingItem = cart.find(
        product => product.id === id
    );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...item,

            quantity: 1

        });

    }


    updateCart();


    openCart();

}


/* ================= UPDATE CART ================= */

function updateCart() {

    renderCart();

    updateCartCount();

    updateCartTotal();

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const totalItems = cart.reduce(

        (total, item) => total + item.quantity,

        0

    );


    cartCount.textContent = totalItems;

}


/* ================= CART TOTAL ================= */

function updateCartTotal() {

    const total = cart.reduce(

        (sum, item) =>

            sum + item.price * item.quantity,

        0

    );


    cartTotal.textContent =
        formatPrice(total);

}


/* ================= RENDER CART ================= */

function renderCart() {

    if (cart.length === 0) {

        cartItems.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add something delicious from our menu.
                </p>

            </div>

        `;

        return;

    }


    cartItems.innerHTML = "";


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="cart-item-image"
            >


            <div class="cart-item-details">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">

                    ${formatPrice(item.price)}

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${item.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="changeQuantity(${item.id}, 1)"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-item"
                    onclick="removeFromCart(${item.id})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

}


/* ================= CHANGE QUANTITY ================= */

function changeQuantity(id, change) {

    const item = cart.find(
        product => product.id === id
    );


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== id
            );

    }


    updateCart();

}


/* ================= REMOVE ITEM ================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    cartElement.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* ================= CLOSE CART ================= */

function closeCartPanel() {

    cartElement.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.style.overflow = "";

}


/* ================= CART EVENTS ================= */

cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartPanel
);


cartOverlay.addEventListener(
    "click",
    closeCartPanel
);


/* ================= WHATSAPP ORDER ================= */

whatsappButton.addEventListener(
    "click",
    sendWhatsAppOrder
);


function sendWhatsAppOrder() {

    if (cart.length === 0) {

        alert(
            "Please add at least one item to your order."
        );

        return;

    }


    const name =
        customerName.value.trim();

    const phone =
        customerPhone.value.trim();

    const type =
        orderType.value;

    const address =
        deliveryAddress.value.trim();


    if (!name) {

        alert("Please enter your name.");

        customerName.focus();

        return;

    }


    if (!phone) {

        alert("Please enter your phone number.");

        customerPhone.focus();

        return;

    }


    if (!type) {

        alert("Please select Pickup or Delivery.");

        orderType.focus();

        return;

    }


    if (type === "Delivery" && !address) {

        alert("Please enter your delivery address.");

        deliveryAddress.focus();

        return;

    }


    const restaurantNumber =
        "2349126346863";


    let message =
        "Hello Luna Bites!%0A%0A";


    message +=
        "*CUSTOMER DETAILS*%0A";

    message +=
        `Name: ${name}%0A`;

    message +=
        `Phone: ${phone}%0A`;

    message +=
        `Order type: ${type}%0A`;


    if (type === "Delivery") {

        message +=
            `Address: ${address}%0A`;

    }


    message +=
        "%0A*ORDER*%0A%0A";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        message +=
            `• ${item.name} x${item.quantity} - ${formatPrice(itemTotal)}%0A`;

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum + item.price * item.quantity,

            0

        );


    message +=
        `%0A*TOTAL: ${formatPrice(total)}*%0A%0A`;

    message +=
        "Thank you!";


    const whatsappURL =
        `https://wa.me/${restaurantNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );
}

    /*
        IMPORTANT:
        Replace this number with the restaurant's
        WhatsApp number.

        Format:
        Country code + number
        WITHOUT the + sign or spaces.

        Example:
        2348012345678
    */

    const restaurantNumber =
        "2349126346863";


    let message =
        "Hello Luna Bites!%0A%0A";

    message +=
        "I would like to place the following order:%0A%0A";


    cart.forEach(item => {

        const itemTotal =
            item.price * item.quantity;


        message +=
            `• ${item.name} x${item.quantity} - ${formatPrice(itemTotal)}%0A`;

    });


    const total =
        cart.reduce(

            (sum, item) =>
                sum + item.price * item.quantity,

            0

        );


    message +=
        `%0A*Total: ${formatPrice(total)}*%0A%0A`;

    message +=
        "Thank you!";


    const whatsappURL =
        `https://wa.me/${restaurantNumber}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );




/* ================= INITIAL LOAD ================= */

displayMenu(menuItems);

updateCart();