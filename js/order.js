// Cart logic
let cart = [];

// Tambah ke cart
function addToCart(item) {
    const found = cart.find(i => i.name === item.name);
    if (found) {
        found.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartDisplay();
}

// Tampilkan cart di modal
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align:center;color:#888;">Cart is empty.</p>';
    } else {
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            cartItemsDiv.innerHTML += `
              <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" style="width:38px;height:38px;border-radius:8px;margin-right:10px;vertical-align:middle;">
                <b>${item.name}</b> x${item.qty} <span style="float:right;">Rp. ${(item.price*item.qty).toLocaleString()}</span>
                <button class="cart-remove-btn" data-idx="${idx}" title="Remove">&times;</button>
              </div>
            `;
        });
    }
    cartTotalSpan.textContent = 'Rp. ' + total.toLocaleString();

    // Event handler untuk tombol hapus
    cartItemsDiv.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(btn.getAttribute('data-idx'));
            cart.splice(idx, 1);
            updateCartDisplay();
        });
    });
}

// Kirim order ke backend (async/await)
async function sendOrder(orderData) {
    try {
        const response = await fetch('http://localhost:3000/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        const data = await response.json();
        showOrderNotif('success', 'Order berhasil dikirim! Terima kasih.');
        cart = [];
        updateCartDisplay();
        closeCartModal();
    } catch (error) {
        showOrderNotif('error', 'Gagal mengirim order. Coba lagi.');
        console.error('Order error:', error);
    }
}

// Modal logic
function openCartModal() {
    document.getElementById('cartModal').style.display = 'block';
    updateCartDisplay();
}
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout Modal logic
function openCheckoutModal() {
    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('customerName').focus();
}
function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.getElementById('checkoutForm').reset();
}

// Checkout handler
function handleCheckout() {
    if (cart.length === 0) {
        alert('Cart masih kosong!');
        return;
    }
    closeCartModal();
    setTimeout(openCheckoutModal, 200); // animasi transisi
}

// Event listeners
window.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const item = {
                name: btn.getAttribute('data-name'),
                price: parseInt(btn.getAttribute('data-price')),
                img: btn.getAttribute('data-img')
            };
            addToCart(item);
        });
    });
    document.getElementById('showCartBtn').addEventListener('click', openCartModal);
    document.getElementById('closeCart').addEventListener('click', closeCartModal);
    document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);

    // Checkout modal events
    const checkoutModal = document.getElementById('checkoutModal');
    const closeCheckout = document.getElementById('closeCheckout');
    const checkoutForm = document.getElementById('checkoutForm');
    closeCheckout.addEventListener('click', closeCheckoutModal);
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) closeCheckoutModal();
    });
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        if (!name || !phone) return;
        const orderData = {
            customer: { name, phone },
            cart,
            total: cart.reduce((sum, item) => sum + item.qty * item.price, 0)
        };
        await sendOrder(orderData);
        closeCheckoutModal();
    });
});

function showOrderNotif(type, message) {
    const notif = document.getElementById('orderNotif');
    let icon = '';
    if (type === 'success') {
        icon = '<span class="notif-icon">✔️</span>';
    } else if (type === 'error') {
        icon = '<span class="notif-icon">❌</span>';
    }
    notif.innerHTML = icon + message;
    notif.className = 'order-notif ' + type + ' show';
    setTimeout(() => {
        notif.classList.remove('show');
    }, 3200);
} 