// Section fade/slide in on scroll
function revealSections() {
  const sections = document.querySelectorAll('.section-animate');
  const trigger = window.innerHeight * 0.92;
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < trigger) sec.classList.add('visible');
    else sec.classList.remove('visible');
  });
}
window.addEventListener('scroll', revealSections);
window.addEventListener('DOMContentLoaded', revealSections);

// Tilt/parallax effect for .card and .kue
function tiltCard(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const xc = rect.width/2, yc = rect.height/2;
  const dx = (x - xc)/xc, dy = (y - yc)/yc;
  card.style.transform = `rotateY(${dx*8}deg) rotateX(${-dy*8}deg) scale(1.04)`;
  card.classList.add('tilt');
}
function resetTilt(e) {
  const card = e.currentTarget;
  card.style.transform = '';
  card.classList.remove('tilt');
}
function enableTilt() {
  if(window.innerWidth > 900) {
    document.querySelectorAll('.card, .kue').forEach(card => {
      card.addEventListener('mousemove', tiltCard);
      card.addEventListener('mouseleave', resetTilt);
    });
  }
}
window.addEventListener('DOMContentLoaded', enableTilt);
window.addEventListener('resize', enableTilt);

// Navbar shadow on scroll
window.addEventListener('scroll', function() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  if (window.scrollY > 10) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Hamburger menu
window.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    // Close menu on link click (mobile UX)
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }
});

// Typing animation for hero title (width grows by 1ch per char, cursor always aligned)
window.addEventListener('DOMContentLoaded', function() {
  var typing = document.querySelector('.typing');
  var cursor = document.querySelector('.typing-cursor');
  if (typing && cursor) {
    var text = typing.getAttribute('data-text') || typing.textContent;
    typing.textContent = '';
    typing.style.width = '0ch';
    let i = 0;
    function type() {
      if (i <= text.length) {
        typing.textContent = text.slice(0, i);
        typing.style.width = i + 'ch';
        i++;
        setTimeout(type, 38);
      }
    }
    type();
  }
});

// Wave (ripple) effect on button click
window.addEventListener('DOMContentLoaded', function() {
  function createWave(e, btn) {
    const wave = document.createElement('span');
    wave.className = 'wave-span';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    wave.style.width = wave.style.height = size + 'px';
    wave.style.left = (e.clientX - rect.left - size/2) + 'px';
    wave.style.top = (e.clientY - rect.top - size/2) + 'px';
    btn.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }
  document.querySelectorAll('.cta-btn, .shop-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      createWave(e, btn);
    });
  });
});

// Fade-in animation for buttons on section reveal
window.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-btn');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.cta-btn, .shop-btn').forEach(btn => {
    observer.observe(btn);
  });
});

// Bounce icon in button on hover
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.cta-btn i, .shop-btn i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      icon.classList.add('icon-bounce');
    });
    icon.addEventListener('animationend', function() {
      icon.classList.remove('icon-bounce');
    });
  });
});

// Parallax background pada hero saat scroll
window.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const offset = window.scrollY * 0.3;
    hero.style.backgroundPosition = `center calc(50% + ${offset}px)`;
  }
});

// Reveal animasi pada gambar card (fade+scale)
window.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('img-reveal');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.card img, .kue img').forEach(img => {
    observer.observe(img);
  });
});

// Floating animasi pada icon WhatsApp/Instagram di tombol
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.fa-whatsapp, .fa-instagram').forEach(icon => {
    icon.classList.add('floating-icon');
  });
});

// Efek smooth scroll untuk anchor link
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Efek hover subtle pada section
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('section').forEach(sec => {
    sec.addEventListener('mouseenter', function() {
      sec.classList.add('section-hovered');
    });
    sec.addEventListener('mouseleave', function() {
      sec.classList.remove('section-hovered');
    });
  });
});

// Add to Cart & Show Cart (MenuPage)
window.addEventListener('DOMContentLoaded', function() {
  const cart = [];
  const showCartBtn = document.getElementById('showCartBtn');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  const checkoutBtn = document.getElementById('checkoutBtn');

  function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
      cartItems.innerHTML = '<p style="text-align:center;color:#888;">Cart is empty.</p>';
    } else {
      cart.forEach((item, idx) => {
        total += item.price * item.qty;
        cartItems.innerHTML += `
          <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" style="width:38px;height:38px;border-radius:8px;margin-right:10px;vertical-align:middle;">
            <b>${item.name}</b> x${item.qty} <span style="float:right;">Rp. ${(item.price*item.qty).toLocaleString()}</span>
            <button class="cart-remove-btn" data-idx="${idx}" title="Remove">&times;</button>
          </div>
        `;
      });
    }
    cartTotal.textContent = 'Rp. ' + total.toLocaleString();
  }

  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = btn.getAttribute('data-name');
      const price = parseInt(btn.getAttribute('data-price'));
      const img = btn.getAttribute('data-img');
      const found = cart.find(item => item.name === name);
      if (found) found.qty++;
      else cart.push({ name, price, img, qty: 1 });
      updateCart();
      // animasi feedback pada tombol
      btn.classList.add('added');
      setTimeout(() => btn.classList.remove('added'), 600);
    });
  });

  showCartBtn && showCartBtn.addEventListener('click', function() {
    cartModal.classList.add('open');
    setTimeout(() => cartModal.querySelector('.cart-modal-content').focus(), 100);
    updateCart();
  });
  closeCart && closeCart.addEventListener('click', function() {
    cartModal.classList.remove('open');
  });
  cartModal && cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) cartModal.classList.remove('open');
  });
  cartItems && cartItems.addEventListener('click', function(e) {
    if (e.target.classList.contains('cart-remove-btn')) {
      const idx = parseInt(e.target.getAttribute('data-idx'));
      cart.splice(idx, 1);
      updateCart();
    }
  });
});