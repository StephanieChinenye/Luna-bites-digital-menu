import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


/* =====================================================
   SUPABASE CONNECTION
===================================================== */

const SUPABASE_URL = "https://jgdavbvadfhixfiqmprs.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_BrDRiXHB85y9g9wgIfrr-A_TBkI0Ba4";

const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


/* =====================================================
   ELEMENTS
===================================================== */

const loginPage = document.getElementById("loginPage");
const dashboard = document.getElementById("dashboard");

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

const logoutButton = document.getElementById("logoutButton");

const menuTableBody = document.getElementById("menuTableBody");
const emptyMessage = document.getElementById("emptyMessage");

const totalItems = document.getElementById("totalItems");
const availableItems = document.getElementById("availableItems");
const unavailableItems = document.getElementById("unavailableItems");

const addItemButton = document.getElementById("addItemButton");

const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const cancelButton = document.getElementById("cancelButton");

const menuForm = document.getElementById("menuForm");

const modalTitle = document.getElementById("modalTitle");

const itemId = document.getElementById("itemId");
const itemName = document.getElementById("itemName");
const itemCategory = document.getElementById("itemCategory");
const itemPrice = document.getElementById("itemPrice");
const itemImage = document.getElementById("itemImage");
const itemDescription = document.getElementById("itemDescription");
const itemAvailable = document.getElementById("itemAvailable");

const formMessage = document.getElementById("formMessage");

const adminSearch = document.getElementById("adminSearch");


/* =====================================================
   MENU DATA
===================================================== */

let menuItems = [];


/* =====================================================
   CHECK LOGIN
===================================================== */

async function checkLogin() {

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();


    if (session) {

        showDashboard();

        loadMenu();

    } else {

        showLogin();

    }

}


/* =====================================================
   SHOW LOGIN
===================================================== */

function showLogin() {

    loginPage.style.display = "flex";

    dashboard.style.display = "none";

}


/* =====================================================
   SHOW DASHBOARD
===================================================== */

function showDashboard() {

    loginPage.style.display = "none";

    dashboard.style.display = "block";

}


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    loginError.textContent = "";

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;


    const {
        data,
        error
    } = await supabase.auth.signInWithPassword({

        email: email,

        password: password

    });


    if (error) {

        loginError.textContent =
            "Incorrect email or password.";

        console.error(error);

        return;

    }


    if (data.session) {

        loginForm.reset();

        showDashboard();

        loadMenu();

    }

});


/* =====================================================
   LOGOUT
===================================================== */

logoutButton.addEventListener("click", async function () {

    await supabase.auth.signOut();

    menuItems = [];

    menuTableBody.innerHTML = "";

    showLogin();

});


/* =====================================================
   LOAD MENU
===================================================== */

async function loadMenu() {

    menuTableBody.innerHTML = "";

    emptyMessage.style.display = "none";


    const {
        data,
        error
    } = await supabase
        .from("menu_items")
        .select("*")
        .order("id", {
            ascending: true
        });


    if (error) {

        console.error(error);

        emptyMessage.textContent =
            "Unable to load menu items.";

        emptyMessage.style.display = "block";

        return;

    }


    menuItems = data || [];

    updateStats();

    renderMenu(menuItems);

}


/* =====================================================
   UPDATE STATISTICS
===================================================== */

function updateStats() {

    const total = menuItems.length;

    const available =
        menuItems.filter(
            item => item.available === true
        ).length;

    const unavailable =
        menuItems.filter(
            item => item.available === false
        ).length;


    totalItems.textContent = total;

    availableItems.textContent = available;

    unavailableItems.textContent = unavailable;

}


/* =====================================================
   RENDER MENU
===================================================== */

function renderMenu(items) {

    menuTableBody.innerHTML = "";


    if (items.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }


    emptyMessage.style.display = "none";


    items.forEach(function (item) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="menu-dish">

                    <img
                        src="${
                          item.image
                            ? (
                              item.image.startsWith("http")
                               ? item.image
                               : `../${item.image}`
             )
             : "https://via.placeholder.com/100"
}" 
                        alt="${escapeHTML(item.name)}"
                    >

                    <strong>
                        ${escapeHTML(item.name)}
                    </strong>

                </div>

            </td>


            <td>

                <span class="category-text">
                    ${escapeHTML(item.category)}
                </span>

            </td>


            <td>

                <span class="price-text">
                    ₦${Number(item.price).toLocaleString()}
                </span>

            </td>


            <td>

                <span class="status ${
                    item.available
                        ? "available"
                        : "unavailable"
                }">

                    ${
                        item.available
                            ? "Available"
                            : "Unavailable"
                    }

                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-button"
                        onclick="editItem(${item.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="action-button"
                        onclick="toggleAvailability(${item.id})"
                    >
                        ${
                            item.available
                                ? "Unavailable"
                                : "Available"
                        }
                    </button>

                    <button
                        class="action-button delete-button"
                        onclick="deleteItem(${item.id})"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        menuTableBody.appendChild(row);

    });

}


/* =====================================================
   OPEN ADD ITEM MODAL
===================================================== */

addItemButton.addEventListener("click", function () {

    resetForm();

    modalTitle.textContent = "Add Dish";

    modalOverlay.style.display = "flex";

});


/* =====================================================
   OPEN EDIT MODAL
===================================================== */

window.editItem = function (id) {

    const item =
        menuItems.find(
            menuItem => menuItem.id === id
        );


    if (!item) return;


    itemId.value = item.id;

    itemName.value = item.name;

    itemCategory.value = item.category;

    itemPrice.value = item.price;

    

    itemDescription.value =
        item.description || "";

    itemAvailable.checked =
        item.available;


    modalTitle.textContent = "Edit Dish";

    formMessage.textContent = "";

    modalOverlay.style.display = "flex";

};



/* =====================================================
   SAVE MENU ITEM
===================================================== */

menuForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    formMessage.textContent = "Saving...";


    const id = itemId.value;

    let imageUrl = "";


    /* ================= UPLOAD NEW IMAGE ================= */

    if (itemImage.files.length > 0) {

        const file = itemImage.files[0];

        const fileExtension =
            file.name.split(".").pop();

        const fileName =
            `${Date.now()}.${fileExtension}`;


        const {
            error: uploadError
        } = await supabase
            .storage
            .from("menu-images")
            .upload(fileName, file);


        if (uploadError) {

            console.error(uploadError);

            formMessage.textContent =
                "Unable to upload image.";

            return;

        }


        const {
            data: publicUrlData
        } = supabase
            .storage
            .from("menu-images")
            .getPublicUrl(fileName);


        imageUrl =
            publicUrlData.publicUrl;

    }


    /* ================= EDIT ================= */

    if (id) {

        const existingItem =
            menuItems.find(
                item => item.id === Number(id)
            );


        /*
            If no new image was selected,
            keep the existing image.
        */

        if (!imageUrl && existingItem) {

            imageUrl =
                existingItem.image || "";

        }

    }


    /* ================= MENU DATA ================= */

    const itemData = {

        name:
            itemName.value.trim(),

        category:
            itemCategory.value,

        price:
            Number(itemPrice.value),

        image:
            imageUrl,

        description:
            itemDescription.value.trim(),

        available:
            itemAvailable.checked

    };


    let result;


    /* ================= EDIT ================= */

    if (id) {

        result = await supabase
            .from("menu_items")
            .update(itemData)
            .eq("id", id);

    }


    /* ================= ADD ================= */

    else {

        result = await supabase
            .from("menu_items")
            .insert([itemData]);

    }


    if (result.error) {

        console.error(result.error);

        formMessage.textContent =
            "Something went wrong. Please try again.";

        return;

    }


    formMessage.textContent =
        "Saved successfully.";


    await loadMenu();


    setTimeout(function () {

        closeMenuModal();

    }, 600);

});


/* =====================================================
   TOGGLE AVAILABILITY
===================================================== */

window.toggleAvailability = async function (id) {

    const item =
        menuItems.find(
            menuItem => menuItem.id === id
        );


    if (!item) return;


    const newStatus =
        !item.available;


    const {
        error
    } = await supabase
        .from("menu_items")
        .update({
            available: newStatus
        })
        .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Unable to update availability."
        );

        return;

    }


    await loadMenu();

};


/* =====================================================
   DELETE ITEM
===================================================== */

window.deleteItem = async function (id) {

    const item =
        menuItems.find(
            menuItem => menuItem.id === id
        );


    if (!item) return;


    const confirmed =
        confirm(
            `Delete "${item.name}" from the menu?`
        );


    if (!confirmed) return;


    const {
        error
    } = await supabase
        .from("menu_items")
        .delete()
        .eq("id", id);


    if (error) {

        console.error(error);

        alert(
            "Unable to delete this item."
        );

        return;

    }


    await loadMenu();

};


/* =====================================================
   CLOSE MODAL
===================================================== */

function closeMenuModal() {

    modalOverlay.style.display = "none";

    resetForm();

}


closeModal.addEventListener(
    "click",
    closeMenuModal
);


cancelButton.addEventListener(
    "click",
    closeMenuModal
);


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

modalOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modalOverlay
        ) {

            closeMenuModal();

        }

    }
);


/* =====================================================
   RESET FORM
===================================================== */

function resetForm() {

    menuForm.reset();

    itemId.value = "";

    itemAvailable.checked = true;

    formMessage.textContent = "";

}


/* =====================================================
   SEARCH
===================================================== */

adminSearch.addEventListener(
    "input",
    function () {

        const searchTerm =
            adminSearch.value
                .toLowerCase()
                .trim();


        const filteredItems =
            menuItems.filter(function (item) {

                return (

                    item.name
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    item.category
                        .toLowerCase()
                        .includes(searchTerm)

                );

            });


        renderMenu(filteredItems);

    }
);


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   AUTH STATE LISTENER
===================================================== */

supabase.auth.onAuthStateChange(
    function (event, session) {

        if (session) {

            showDashboard();

        } else {

            showLogin();

        }

    }
);


/* =====================================================
   START APPLICATION
===================================================== */

checkLogin();