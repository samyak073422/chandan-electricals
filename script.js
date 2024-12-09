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

    // Open the payment modal
    $('#paymentModal').modal('show');
});

// WhatsApp payment functionality
document.getElementById('whatsapp-checkout').addEventListener('click', function () {
    // Generate product details message
    let message = "Checkout Details:\n";
    cart.forEach(product => {
        message += `Product: ${product.name}, Quantity: ${product.quantity}, Price: ₹${(product.price * product.quantity).toFixed(2)}\n`;
    });
    message += `Total: ₹${cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}`;

    // Encode the message for URL
    const whatsappMessage = encodeURIComponent(message);

    // Open WhatsApp with the generated message
    window.open(`https://wa.me/9121919036?text=${whatsappMessage}`, '_blank');

    // Clear the cart after checkout
    cart = [];
    updateCart(); // Refresh cart display
    $('#paymentModal').modal('hide'); // Close the payment modal
});


// UPI payment functionality
document.getElementById('upi-checkout').addEventListener('click', function () {
    alert("UPI Payment option will be integrated soon.");
    $('#paymentModal').modal('hide'); // Close the payment modal
});



// Google Pay functionality
document.getElementById('googlepay-checkout').addEventListener('click', function () {
    alert("Google Pay option will be integrated soon.");
    $('#paymentModal').modal('hide'); // Close the payment modal
});

    // Generate product details message
    let message = "Checkout Details:\n";
    cart.forEach(product => {
        message += `Product: ${product.name}, Quantity: ${product.quantity}, Price: ₹${(product.price * product.quantity).toFixed(2)}\n`;
    });
    message += `Total: ₹${cart.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}`;

    // Encode the message for URL
    const whatsappMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the generated message
    window.open(`https://wa.me/9121919036?text=${whatsappMessage}`, '_blank');

    // Clear the cart after checkout
    cart = [];
    updateCart(); // Refresh cart display
;

// Scroll to Home function
function scrollToHome() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const fileInput = document.getElementById('fileUpload');

    // Collect all file names into a string
    let fileNames = 'No files uploaded';
    if (fileInput.files.length > 0) {
        fileNames = Array.from(fileInput.files).map(file => file.name).join(', ');
    }

    // Format the WhatsApp message
    const whatsappMessage = `Hello, my name is ${name}.\nEmail: ${email}\nMessage: ${message}\nFiles: ${fileNames}`;

    // Encode the message for the WhatsApp link
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Open WhatsApp link with the formatted message
    window.open(`https://wa.me/9121919036?text=${encodedMessage}`, '_blank');
});


//new 


document.addEventListener("DOMContentLoaded", function() {
    const categoryButtons = document.querySelectorAll(".dropdown-item[data-category]");
    const productItems = document.querySelectorAll(".product-item");

    categoryButtons.forEach(button => {
        button.addEventListener("click", function() {
            const category = this.getAttribute("data-category");

            // Show/Hide products
            productItems.forEach(item => {
                if (category === "all") {
                    item.style.display = "block";
                } else {
                    if (item.getAttribute("data-category") === category) {
                        item.style.display = "block";
                    } else {
                        item.style.display = "none";
                    }
                }
            });
        });
    });
});

document.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.fade-in');
    const viewportHeight = window.innerHeight;

    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < viewportHeight) {
            element.classList.add('visible');
        }
    });
});

// Path to the folder containing your photos
const imagesFolder = 'images/';

// Array of photo filenames
const photos = [
  'photo1.jpg', 'photo2.jpg', 'photo3.jpg', 
  // Add all 500 filenames here
  'photo500.jpg'
];

// Function to generate the photo gallery
function loadGallery() {
  const gallery = document.querySelector('.gallery');
  
  photos.forEach(photo => {
    const img = document.createElement('img');
    img.src = `${imagesFolder}${photo}`;
    img.alt = photo;
    gallery.appendChild(img);
  });
}

// Load the gallery after the DOM is ready
window.onload = loadGallery;

document.getElementById('checkout').addEventListener('click', function () {
    // Collect cart items
    const cartItems = document.querySelectorAll('#cart-items li');
    let cartDetails = '';

    cartItems.forEach((item) => {
        const name = item.querySelector('.item-name').textContent;
        const quantity = item.querySelector('.item-quantity').textContent;
        const price = item.querySelector('.item-price').textContent;
        cartDetails += `- ${name}: ${quantity} x ₹${price}\n`;
    });

    const total = document.getElementById('cart-total').textContent;

    // Get the address from user input
    const address = prompt('Please enter your delivery address:');

    if (address) {
        // Prepare the WhatsApp message
        const whatsappMessage = `Hello, I would like to place an order:\n\n${cartDetails}\nTotal: ₹${total}\n\nDelivery Address: ${address}`;

        // Encode the message
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Open WhatsApp link with the message
        window.open(`https://wa.me/9121919036?text=${encodedMessage}`, '_blank');
    } else {
        alert('Please enter a valid address to proceed.');
    }
});

// Function to add a new product input field dynamically
function addProduct() {
    const productContainer = document.getElementById('productContainer');
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
  
    productItem.innerHTML = `
      <input type="text" name="productName[]" placeholder="Enter product name" required />
      <input type="number" name="productQuantity[]" placeholder="Quantity" required min="1" />
    `;
  
    productContainer.appendChild(productItem);
  }
  
  // Handling form submission
  document.getElementById('quotationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents page refresh
  
    const formData = new FormData(e.target);
    let message = `Quotation Request:\n`;
  
    // Collect product details
    const productNames = formData.getAll('productName[]');
    const productQuantities = formData.getAll('productQuantity[]');
    productNames.forEach((name, index) => {
      message += `Product: ${name}, Quantity: ${productQuantities[index]}\n`;
    });
  
    // Collect customer details
    message += `\nCustomer Name: ${formData.get('customerName')}\n`;
    message += `Email: ${formData.get('customerEmail')}\n`;
    message += `Phone: ${formData.get('customerPhone')}`;
  
    // Redirect to WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/9121919036?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  });
  
