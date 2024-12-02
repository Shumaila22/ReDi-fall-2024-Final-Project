


let cart = [];


function addToCart(productId, productName, productPrice) {
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }

  updateCartUI();
  updateCartCount();
}


function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}


function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
    cartItemsContainer.appendChild(li);

    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = `Total: $${total}`;
}


document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", event => {
    const productCard = event.target.closest(".product-card");
    const productId = productCard.getAttribute("data-id");
    const productName = productCard.querySelector("h2").textContent;
    const productPrice = parseFloat(productCard.querySelector("p").textContent.replace("Price: $", ""));

    addToCart(productId, productName, productPrice);
  });
});


const cartWindow = document.getElementById("cart-window");
const cartIcon = document.getElementById("cart-icon");
const closeCartButton = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {
  cartWindow.classList.remove("hidden");
});

closeCartButton.addEventListener("click", () => {
  cartWindow.classList.add("hidden");
});
