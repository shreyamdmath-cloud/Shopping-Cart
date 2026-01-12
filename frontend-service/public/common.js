const API = {
    auth: '/api/auth',
    groceries: '/api/groceries',
    cart: '/api/cart',
    orders: '/api/orders'
};

const UI = {
    showToast(message, actionText, actionLink) {
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `
            <span>${message}</span>
            ${actionText ? `<button class="btn btn-accent" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;" onclick="window.location.href='${actionLink}'">${actionText}</button>` : ''}
        `;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 5000);
    },

    checkAuth() {
        const user = localStorage.getItem('shop_user');
        const token = localStorage.getItem('shop_token');
        if (!user || !token) {
            window.location.href = 'login.html';
            return null;
        }
        return { user, token };
    },

    logout() {
        localStorage.clear();
        window.location.href = 'login.html';
    }
};

// Common Header Component
function renderHeader() {
    const user = localStorage.getItem('shop_user');
    const header = document.querySelector('header');
    if (!header) return;

    header.innerHTML = `
        <h1>Smart Grocery Cart</h1>
        <nav>
            <a href="products.html">Catalog</a>
            <a href="cart.html">Cart</a>
            <a href="orders.html">Orders</a>
            <span style="border-left: 1px solid #475569; padding-left: 1rem; margin-left: 0.5rem; color: #94a3b8;">Hello, <strong>${user}</strong></span>
            <a href="#" onclick="UI.logout()" class="btn-logout">Logout</a>
        </nav>
    `;
}
