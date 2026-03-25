let dotCount = 0;
const PASS = "201108";

// 1. Secret Trigger
function handleDotClick() {
    dotCount++;
    if (dotCount === 3) {
        document.getElementById('admin-modal').style.display = 'block';
        dotCount = 0; // Reset
    }
    setTimeout(() => { dotCount = 0; }, 2000); // Reset if not tapped fast enough
}

function closeModal() { document.getElementById('admin-modal').style.display = 'none'; }

// 2. Password Check
function checkPassword() {
    const input = document.getElementById('admin-pass').value;
    if (input === PASS) {
        document.getElementById('admin-panel').style.display = 'block';
        closeModal();
        alert("Admin Mode Active");
    } else {
        alert("Wrong Password");
    }
}

// 3. Data Handling
let menuData = JSON.parse(localStorage.getItem('myMenu')) || [];

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    menuData.forEach((item, index) => {
        grid.innerHTML += `
            <div class="menu-card">
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <div style="color:var(--orange); font-weight:bold;">${item.price}</div>
            </div>
        `;
    });
}

function addItem() {
    const newItem = {
        name: document.getElementById('new-name').value,
        price: document.getElementById('new-price').value,
        desc: document.getElementById('new-desc').value,
        img: document.getElementById('new-img').value
    };
    menuData.push(newItem);
    localStorage.setItem('myMenu', JSON.stringify(menuData));
    renderMenu();
}

function clearMenu() {
    localStorage.removeItem('myMenu');
    menuData = [];
    renderMenu();
}

function logout() { location.reload(); }

// Initialize
window.onload = renderMenu;

