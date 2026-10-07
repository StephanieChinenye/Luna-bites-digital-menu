   /*DIGITAL MENU JAVASCRIPT
===================================================== */


/* ================= MENU DATA ================= */



const SUPABASE_URL = "https://jgdavbvadfhixfiqmprs.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_BrDRiXHB85y9g9wgIfrr-A_TBkI0Ba4";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

let menuItems = [];

async function loadMenuItems() {

    const { data, error } = await supabaseClient
    .from("menu_items")
        .select("*")
        .eq("available", true)
        .order("id", { ascending: true });
        console.log("SUPABASE DATA:", data);
        console.log("SUPABASE ERROR:", error);

    if (error) {
        console.error("Error loading menu:", error);
        return;
    }

    menuItems = data.map(item => ({
        id: item.id,
        name: item.name,
        category: item.category,
        price: Number(item.price),
        image: item.image,
        description: item.description
    }));

    displayMenu(menuItems);
}


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

loadMenuItems();
updateCart();