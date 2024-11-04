window.onload = function() {
  console.log("JavaScript Loaded");

  function subscribetoNewsletter() { alert("Thank you for subscribing."); }

  let subscribe = document.getElementById("submit");
  subscribe.addEventListener("click", subscribetoNewsletter);

  /*====================Gallery====================*/

  const modal = document.getElementById("cart");
  const viewCart = document.getElementById("view-cart");
  const span = document.getElementsByClassName("close")[0];

  console.log("Modal:", modal);
  console.log("View Cart Button:", viewCart);
  console.log("Close Button:", span);

  if (modal && viewCart && closeButton) {
    viewCart.onclick = function() {
      console.log("View Cart Button Clicked");
      modal.style.display = "block";
    };

    span.onclick = function() {
      console.log("Close Button Clicked");
      modal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == modal) {
        console.log("Outside Modal Clicked");
        modal.style.display = "none";
      }
    };

    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    function addToCart(itemId, itemName, quantity = 1) {
      const itemIndex = cart.findIndex(item => item.id === itemId);

      if (itemIndex > -1) {
        cart[itemIndex].quantity += quantity;
      } else {
        cart.push({ id: itemId, name: itemName, quantity });
      }

      sessionStorage.setItem('cart', JSON.stringify(cart));
      console.log(`added ${quantity} of ${itemName} to cart`);
      updateCartDisplay();
    }

    const clearCartButton = document.getElementById("clear-cart");
    clearCartButton.onclick = clearCart;

    function clearCart() {
      if (cart.length === 0) {
        alert("No items to clear.");
      } else {
        cart = [];
        sessionStorage.removeItem('cart');
        console.log("Cart Cleared")
        alert("Cart Cleared")
        updateCartDisplay();
      }
    }

    const processOrderButton = document.getElementById("process-order");
    processOrderButton.onclick = processOrder;

    function processOrder() {
      if (cart.length === 0) {
        alert("Cart is empty.");
      } else {
        cart = [];
        sessionStorage.removeItem('cart');
        console.log("Thank you for your order.");
        alert("Order Processed");
        updateCartDisplay();
      }
    }

    function updateCartDisplay() {
      const cartContainer = document.getElementById('cart-container');
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

  } else {
    console.log("Cart elements are not present on this page.");
  }

  /*====================About Us====================*/

  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const customOrderInput = document.getElementById("customorder");
    const feedbackInput = document.getElementById("feedback");
    const submitButton = document.getElementById("form-submit");
    const clearButton = document.getElementById("form-clear");

    loadFormData();

    function saveFormData() {
      const formData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        customOrder: customOrderInput.checked,
        feedback: feedbackInput.value
      };

      localStorage.setItem(`contactFormData`, JSON.stringify(formData));
      alert("Thank you for your message.")
    }

    function loadFormData() {
      const savedData = JSON.parse(localStorage.getItem("contactFormData"));

      if (savedData) {
        nameInput.value = savedData.name;
        emailInput.value = savedData.email;
        phoneInput.value = savedData.phone;
        customOrderInput.checked = savedData.customOrder;
        feedbackInput.value = savedData.feedback;
      }
    }

    function clearFormData() {
      nameInput.value = "";
      emailInput.value = "";
      phoneInput.value = "";
      customOrderInput.checked = false;
      feedbackInput.value = "";

      localStorage.removeItem("contactFormData");
      alert("Form data has been cleared.");
    }

    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("Submit button clicked");
      saveFormData();
    });

    clearButton.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("Clear button clicked");
      clearFormData();
    });
  });
};