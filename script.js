window.onload = function() {
  console.log("JavaScript Loaded");

  function subscribetoNewsletter() { alert("Thank you for subscribing."); }

  let subscribe = document.getElementById("submit");
  subscribe.addEventListener("click", subscribetoNewsletter);

  var modal = document.getElementById("cart");
  var viewCart = document.getElementById("view-cart");
  var span = document.getElementsByClassName("close")[0];

  console.log("Modal:", modal);
  console.log("View Cart Button:", viewCart);
  console.log("Close Button:", span);

  viewCart.onclick = function() {
    console.log("View Cart Button Clicked");
    modal.style.display = "block";
  }

  span.onclick = function() {
    console.log("Close Button Clicked");
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      console.log("Outside Modal Clicked");
      modal.style.display = "none";
    }
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function addToCart(itemId, itemName, quantity = 1) {
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity;
    } else {
      cart.push({ id: itemId, name: itemName, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`added ${quantity} of ${itemName} to cart`);
    updateCartDisplay();
  }

  function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    console.log("Cart Cleared")
    alert("Cart Cleared")
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.textContent = `${item.name} - Quantity: ${item.quantity}`;
      cartContainer.appendChild(itemElement);
    });
  }

  updateCartDisplay();



  document.querySelectorAll(".add-to-cart").forEach(buttontocart => {
    buttontocart.addEventListener("click", () => {
      const itemId = buttontocart.getAttribute("data-item-id");
      const itemName = buttontocart.getAttribute("data-item-name");
      addToCart(Number(itemId), itemName);
      alert(`${itemName} has been added to your cart!`);
    });
  });

};