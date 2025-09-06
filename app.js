document.addEventListener('DOMContentLoaded', () => {
  const mockProducts = [
    { id: 1, title: 'Vintage Leather Chair', price: 150.00, category: 'furniture', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Chair' },
    { id: 2, title: 'Used Smartphone X1', price: 220.00, category: 'electronics', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Phone' },
    { id: 3, title: 'Classic Denim Jacket', price: 45.00, category: 'clothing', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Jacket' },
    { id: 4, title: 'Set of 5 Novels', price: 25.00, category: 'books', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Books' },
    { id: 5, title: 'Wooden Coffee Table', price: 80.00, category: 'furniture', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Table' },
    { id: 6, title: 'Wireless Headphones', price: 75.00, category: 'electronics', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Headphones' },
    { id: 7, title: 'Designer Handbag', price: 120.00, category: 'clothing', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Handbag' },
    { id: 8, title: 'Ceramic Vase Set', price: 30.00, category: 'home', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Vases' },
    { id: 9, title: 'Antique Bookshelf', price: 200.00, category: 'furniture', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Bookshelf' },
    { id: 10, title: 'Digital Camera', price: 180.00, category: 'electronics', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Camera' },
    { id: 11, title: 'Leather Boots', price: 60.00, category: 'clothing', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Boots' },
    { id: 12, title: 'History Encyclopedia', price: 40.00, category: 'books', image: 'https://placehold.co/400x400/A3B18A/344E41?text=Encyclopedia' },
  ];

  const productGrid = document.getElementById('product-grid');
  const loggedOutNav = document.getElementById('logged-out-nav');
  const loggedInNav = document.getElementById('logged-in-nav');
  const authModal = document.getElementById('auth-modal');
  const modalContent = authModal.querySelector('div');
  const loginBtn = document.getElementById('login-btn');
  const signupBtn = document.getElementById('signup-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const authForm = document.getElementById('auth-form');
  const logoutBtn = document.getElementById('logout-btn');
  const searchBar = document.getElementById('search-bar');
  const categoryFilters = document.getElementById('category-filters');

  let isLoggedIn = false;
  let currentCategory = 'all';
  let currentSearchTerm = '';

  function renderProducts() {
    productGrid.innerHTML = '';

    const filteredProducts = mockProducts.filter(product => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
      const matchesSearch = product.title.toLowerCase().includes(currentSearchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
      productGrid.innerHTML = `<p class="col-span-full text-center text-stone-500">No products found. Try adjusting your filters!</p>`;
      return;
    }

    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg flex flex-col';
      productCard.innerHTML = `
        <div class="relative">
          <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-cover">
          <span class="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">${product.category}</span>
        </div>
        <div class="p-4 flex flex-col flex-grow">
          <h3 class="font-bold text-lg mb-2 truncate">${product.title}</h3>
          <p class="text-stone-500 text-2xl font-semibold mb-4 mt-auto">$${product.price.toFixed(2)}</p>
          <button class="w-full mt-2 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Buy Now
          </button>
        </div>
      `;
      productGrid.appendChild(productCard);
    });
  }

  function updateNav() {
    if (isLoggedIn) {
      loggedOutNav.classList.add('hidden');
      loggedInNav.classList.remove('hidden');
      loggedInNav.classList.add('flex');
    } else {
      loggedOutNav.classList.remove('hidden');
      loggedOutNav.classList.add('flex');
      loggedInNav.classList.add('hidden');
    }
  }

  function openModal() {
    authModal.classList.remove('hidden');
    setTimeout(() => {
      modalContent.classList.remove('scale-95', 'opacity-0');
      modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
  }

  function closeModal() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
      authModal.classList.add('hidden');
    }, 200);
  }

  loginBtn.addEventListener('click', openModal);
  signupBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);

  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
      closeModal();
    }
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    isLoggedIn = true;
    updateNav();
    closeModal();
    authForm.reset();
  });

  logoutBtn.addEventListener('click', () => {
    isLoggedIn = false;
    updateNav();
  });

  searchBar.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;
    renderProducts();
  });

  categoryFilters.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-green-100', 'text-green-800', 'font-semibold');
        btn.classList.add('hover:bg-stone-100');
      });

      e.target.classList.add('bg-green-100', 'text-green-800', 'font-semibold');
      e.target.classList.remove('hover:bg-stone-100');

      currentCategory = e.target.dataset.category;
      renderProducts();
    }
  });

  renderProducts();
  updateNav();
});
