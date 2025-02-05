function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".menu-container");
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("menu-card");

      cartItem.innerHTML = `
                <div class="card-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="card-content">
                    <h1 class="card-title">${item.title}</h1>
                    <p class="card-des">${item.description}</p>
                </div>

                <div class="card-right-container">
                   
                    </div>
                </div>
                <div class="flex-end">
                 <div class="arrows-container">
                        <span class="count">${item.quantity}</span>
                        <div class="arrows">
                            <button class="increment" onclick="changeQuantity(${
                              item.id
                            }, 'increase')"><i class="fa-solid fa-caret-up"></i></button>
                            <button class="decrement" onclick="changeQuantity(${
                              item.id
                            }, 'decrease')"><i class="fa-solid fa-caret-down"></i></button>
                        </div>
                    <span class="price">$${(item.price * item.quantity).toFixed(
                      2
                    )}</span>
                    <button class="trash-can" onclick="removeFromCart(${
                      item.id
                    })">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
      cartContainer.appendChild(cartItem);
    });
  }
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  calculateTotal();
}
function changeQuantity(id, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find((item) => item.id === id);

  if (item) {
    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
  calculateTotal();
}

function calculateTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = 0.05 * subtotal;
  const shipping = 10;

  const total = subtotal + tax + shipping;
  document.querySelector(".subtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(".Shipping").textContent = `$${shipping.toFixed(2)}`;
  document.querySelector(".tax").textContent = `$${tax.toFixed(2)}`;
  document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
}

function addToCart(id, title, price, image, description) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItemIndex = cart.findIndex((item) => item.id === id);
  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ id, title, price, image, description, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  calculateTotal();
}
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  calculateTotal();
});
