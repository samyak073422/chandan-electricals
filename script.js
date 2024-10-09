let cart = [];

// Function to update cart display
function updateCart() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');

    cartItemsElement.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `${item.name} (x${item.quantity}) <span>₹${itemTotal.toFixed(2)}</span>`;

        // Create a discard button
        const discardButton = document.createElement('button');
        discardButton.className = 'btn btn-danger btn-sm ml-3';
        discardButton.textContent = 'Discard';
        discardButton.onclick = () => {
            discardItem(index);
        };

        listItem.appendChild(discardButton);
        cartItemsElement.appendChild(listItem);
    });

    cartTotalElement.textContent = total.toFixed(2);
    cartCountElement.textContent = cart.length;
}

// Function to discard an item from the cart
function discardItem(index) {
    cart.splice(index, 1); // Remove the item from the cart
    updateCart(); // Update the cart display
    showNotification('Item removed from the cart');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = 'block';

    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 3000); // Display for 3 seconds
}

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        const quantity = parseInt(this.closest('.card-body').querySelector('.quantity').value);

        const existingProduct = cart.find(item => item.name === productName);
        if (existingProduct) {
            existingProduct.quantity += quantity; // Increase quantity if already in cart
            showNotification(`${productName} quantity updated in cart!`);
        } else {
            cart.push({ name: productName, price: productPrice, quantity: quantity });
            showNotification(`${productName} added to cart!`);
        }

        updateCart(); // Update the cart display
    });
});

// Checkout functionality
document.getElementById('checkout').addEventListener('click', function () {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart.");
        return;
    }

    // Generate product details message
    let message = "Checkout Details:\n";
    cart.forEach(product => {
        message += `Product: ${product.name}, Quantity: ${product.quantity}, Price: ₹${(product.price * product.quantity).toFixed(2)}\n`;
    });
    message += `Total: ₹${cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}`;

    // Encode the message for URL
    const whatsappMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the generated message
    window.open(`https://wa.me/7981726626?text=${whatsappMessage}`, '_blank');

    // Clear the cart after checkout
    cart = [];
    updateCart(); // Refresh cart display
});

// Scroll to Home function
function scrollToHome() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the default way

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Format the WhatsApp message
    const whatsappMessage = `Hello, my name is ${name}.\nEmail: ${email}\nMessage: ${message}\n`;

    // Encode the message for the WhatsApp link
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp link (replace 'YOUR_PHONE_NUMBER' with your WhatsApp phone number)
    window.open(`https://wa.me/7981726626?text=${whatsappMessage}`, '_blank');
});








