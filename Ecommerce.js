let cart = {
    Rose: { price: 10, quantity: 0 },
    Cactus: { price: 15, quantity: 0 },
    Jhumar: { price: 10, quantity: 0 },
    total: 0
};

// Add to Cart
function addToCart(product, price) {
    cart[product].quantity++;
    cart.total += price;
    document.getElementById('cartCount').innerText = cart.Rose.quantity + cart.Cactus.quantity + cart.Jhumar.quantity;
    updateCartDisplay();
}

// Increase Quantity
function increaseQuantity(product) {
    cart[product].quantity++;
    cart.total += cart[product].price;
    updateCartDisplay();
}

// Decrease Quantity
function decreaseQuantity(product) {
    if (cart[product].quantity > 0) {
        cart[product].quantity--;
        cart.total -= cart[product].price;
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    let cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    // Display items in cart
    for (let product in cart) {
        if (cart[product].quantity > 0 && product !== 'total') {
            cartItems.innerHTML += `
                <li>
                    ${product} x${cart[product].quantity} - ₹${cart[product].price * cart[product].quantity} 
                    <button onclick="increaseQuantity('${product}')">+</button>
                    <button onclick="decreaseQuantity('${product}')">-</button>
                </li>
            `;
        }
    }


    // Update total price
    document.getElementById('cartTotal').innerText = `Total: ₹${cart.total}`;
}


// Buy Now Function
document.getElementById('buyNowBtn').addEventListener('click', function() {
    let emailBody = "Order Summary:%0D%0A"; // URL encoded line break
    for (let product in cart) {
        if (cart[product].quantity > 0 && product !== 'total') {
            emailBody += `${product}: x${cart[product].quantity} - ₹${cart[product].price * cart[product].quantity}%0D%0A`;
        }
    }
    emailBody += `Total: ₹${cart.total}%0D%0AThank you for your purchase!`;

    // Open the user's email client with pre-filled cart details
    window.location.href = `mailto:subhendu.contemsys11@gmail.com?subject=Order Confirmation&body=${emailBody}`;
});


// Modal Toggle - Show Cart
document.getElementById('cartBtn').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'block'; // Show cart when clicking button
});

// Modal Toggle - Close Cart
document.getElementById('closeCart').addEventListener('click', function() {
    document.getElementById('cartModal').style.display = 'none'; // Hide cart when clicking close
});