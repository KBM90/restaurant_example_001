// === ORDER MODAL FUNCTIONALITY ===

let currentDishName = '';
let currentDishPrice = '';

// Open order modal
function openOrderModal(dishName, dishPrice) {
    currentDishName = dishName;
    currentDishPrice = dishPrice;

    const modal = document.getElementById('orderModal');
    const dishNameElement = document.getElementById('orderDishName');
    const quantityInput = document.getElementById('orderQuantity');

    if (modal && dishNameElement) {
        dishNameElement.textContent = dishName;
        quantityInput.value = 1;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Submit order via WhatsApp
function submitOrder() {
    const quantity = document.getElementById('orderQuantity').value;

    if (!quantity || quantity < 1) {
        alert('Please enter a valid quantity');
        return;
    }

    // WhatsApp business number
    const whatsappNumber = '491771357521';

    // Create message
    const message = `Hello! I would like to order:\n\n` +
        `Dish: ${currentDishName}\n` +
        `Price: ${currentDishPrice}\n` +
        `Quantity: ${quantity}\n\n` +
        `Thank you!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Close modal
    closeOrderModal();
}

// Add click handlers to all menu items
document.addEventListener('DOMContentLoaded', () => {
    // Wait for translations to load
    setTimeout(() => {
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            // Get dish name and price
            const dishNameElement = item.querySelector('h4');
            const dishPriceElement = item.querySelector('.menu-item-price');

            if (dishNameElement && dishPriceElement) {
                const dishName = dishNameElement.textContent.trim();
                const dishPrice = dishPriceElement.textContent.trim();

                // Create order button
                const orderBtn = document.createElement('button');
                orderBtn.className = 'menu-item-order-btn';
                orderBtn.setAttribute('data-i18n', 'order_btn_order');
                orderBtn.textContent = translations[currentLanguage]?.order_btn_order || 'Order';

                // Add click handler
                orderBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openOrderModal(dishName, dishPrice);
                });

                // Append button to menu item info
                const menuItemInfo = item.querySelector('.menu-item-info');
                if (menuItemInfo) {
                    menuItemInfo.appendChild(orderBtn);
                }
            }
        });
    }, 100);
});

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('orderModal');
    if (e.target === modal) {
        closeOrderModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeOrderModal();
    }
});
