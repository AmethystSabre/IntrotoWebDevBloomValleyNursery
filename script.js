window.onload = function() {
  console.log("JavaScript Loaded");

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
    return emailPattern.test(email);
  }

  function subscribeToNewsletter(event) {
    event.preventDefault();

    const emailInput = document.getElementById("subscribe");
    const email = emailInput.value.trim();

    if (validateEmail(email)) {
      alert("Thank you for subscribing.");
      emailInput.value = "";
    } else {
      alert("Please fill out this field");
      emailInput.focus();
    }
  }
  document.getElementById("newsletter-form").addEventListener("submit", subscribeToNewsletter);



  document.querySelector('.navbutton').addEventListener('click', function() {
    const mobileMenu = document.querySelector('.navlinks-mobile');
    mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
  });

  /*====================Gallery====================*/

  const modal = document.getElementById("cart");
  const viewCart = document.getElementById("view-cart");
  const span = document.getElementsByClassName("close")[0];

  console.log("Modal:", modal);
  console.log("View Cart Button:", viewCart);
  console.log("Close Button:", span);

  if (modal && viewCart && close) {
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
        console.log("Order Processed");
        alert("Thank you for your order.");
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
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const customOrderInput = document.getElementById("customorder");
  const feedbackInput = document.getElementById("feedback");
  const submitButton = document.getElementById("form-submit");
  const clearButton = document.getElementById("form-clear");

  loadFormData();

  function saveFormData() {
    const formData = {
      name: (nameInput.value || "").trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      customOrder: customOrderInput.checked,
      feedback: feedbackInput.value.trim()
    };

    console.log("Saving form Data:", formData);

    try {
      localStorage.setItem(`contactFormData`, JSON.stringify(formData));
      console.log("Data saved to localStorage");
      alert("Thank you for your message.");
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }

  function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem("contactFormData"));

    if (savedData) {
      nameInput.value = savedData.name || "";
      emailInput.value = savedData.email || "";
      phoneInput.value = savedData.phone || "";
      customOrderInput.checked = savedData.customOrder || false;
      feedbackInput.value = savedData.feedback || "";
    }
  }

  function clearFormData() {
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";
    customOrderInput.checked = false;
    feedbackInput.value = "";

    console.log("Clearing localStorage data");
    localStorage.removeItem("contactFormData");
    alert("Form data has been cleared.");
  }

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
  const phonePattern = /^[0-9]{10}$/;

  function validateInputs() {
    if (nameInput.value.trim() === "") {
      nameInput.setCustomValidity("please fill out this field.");
      nameInput.reportValidity();
      return false;
    } else {
      nameInput.setCustomValidity("");
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      emailInput.setCustomValidity("please fill out this field.");
      emailInput.reportValidity();
      return false;
    } else {
      emailInput.setCustomValidity("");
    }

    if (!phonePattern.test(phoneInput.value.trim())) {
      phoneInput.setCustomValidity("please fill out this field.");
      phoneInput.reportValidity();
      return false;
    } else {
      phoneInput.setCustomValidity("");
    }

    if (feedbackInput.value.trim() === "") {
      feedbackInput.setCustomValidity("please fill out this field.");
      feedbackInput.reportValidity();
      return false;
    } else {
      feedbackInput.setCustomValidity("");
    }

    return true
  }

  if (submitButton && clearButton) {
    submitButton.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("Submit button clicked");
      if (validateInputs()) {
        saveFormData();

        nameInput.value = "";
        emailInput.value = "";
        phoneInput.value = "";
        customOrderInput.checked = false;
        feedbackInput.value = "";
      }
    });

    clearButton.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("Clear button clicked");
      clearFormData();
    });
  } else {
    console.warn("submit or Clear button not found");
  }
};