async function fetchCategories() {
  try {
    const response = await fetch("https://dummyjson.com/products/categories");
    const categories = await response.json();
    renderCategories(categories);
  } catch (error) {
    console.error("error fetching categories", error);
  }
}

function renderCategories(categories) {
  const buttonsContainer = document.querySelector(".buttons");
  buttonsContainer.innerHTML =
    '<button class="button1 active" data-category="all" onclick="setActiveCategory(this, "all")">All</button>';

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add("button");
    button.textContent = category.name;
    button.dataset.category = category.slug;
    button.addEventListener("click", () => {
      setActiveCategory(button, category.slug);
    });
    buttonsContainer.appendChild(button);
  });
}

function setActiveCategory(selectedButton, category) {
  document.querySelectorAll(".buttons button").forEach((button) => {
    button.classList.remove("active");
  });
  selectedButton.classList.add("active");
  filterProducts(category);
}

async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=194");
    const data = await response.json();
    renderProducts(data.products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
function renderProducts(products) {
  const productsContainer = document.querySelector(".cards-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.innerHTML = `
            <div class="card-img">
                <img src="${product.thumbnail}" alt="${product.title}">
            </div>
            <div class="card-content">
                <h1 class="card-title">${product.title}</h1>
                <p class="card-des">${product.description}</p>
                <div class="card-buttons">
                    <span class="price">$${product.price}</span>
                    <button class="add-to-card" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}', '${product.description}')">Add to Cart</button>
                    <span class="heart"><i class="fa-solid fa-heart"></i></span>
                </div>
            </div>
        `;
    productsContainer.appendChild(productCard);
  });
}

async function filterProducts(category) {
  if (category === "all") {
    fetchProducts();
    return;
  }
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}`
  );
  const data = await response.json();
  renderProducts(data.products);
}

function addToCart(id, title, price, image, description) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find((item) => item.id === id);
  if (!existingItem) {
    cart.push({ id, title, price, image, description, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
  } else {
    alert("This item is already in your cart.");
  }
}

function updateCartBadge() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.querySelector(".card-badge").textContent = cart.length;
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCategories();
  fetchProducts();
  updateCartBadge();
});
//<!-- copyright this code is writed by  leonard Dani -->
