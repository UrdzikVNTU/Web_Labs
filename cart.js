const cartItems = document.querySelector(".cart-items");
const cartTotal = document.getElementById("total-amount");
const clearCartButton = document.getElementById("clear-cart");
let totalAmount = 0;

// Функція для оновлення ціни товару та загальної вартості корзини
function updateCartItemPrice(cartItem) {
    const quantityInput = cartItem.querySelector(".quantity");
    const itemPrice = parseFloat(cartItem.querySelector(".item-price").textContent);
    const itemTotal = itemPrice * parseInt(quantityInput.value);
    cartItem.querySelector(".item-total").textContent = itemTotal + " грн";

    totalAmount = Array.from(cartItems.children).reduce((total, item) => {
        const itemTotal = parseFloat(item.querySelector(".item-total").textContent);
        return total + itemTotal;
    }, 0);
    cartTotal.textContent = totalAmount + " грн";
}

// Функція для видалення товару з корзини
function removeCartItem() {
    const cartItem = this.parentElement;
    const itemTotal = parseFloat(cartItem.querySelector(".item-total").textContent);
    totalAmount -= itemTotal;
    cartTotal.textContent = totalAmount;
    cartItem.remove();

    // Оновіть кількість доданих товарів в корзині
    updateCartCount();
}

// Функція для оновлення кількості елементів у корзині та в меню
function updateCartCount() {
    const itemCount = cartItems.children.length;
    document.getElementById("cart-count").textContent = itemCount;
}

// Функція для додавання товару до корзини
function addToCart(product) {
    const quantityInput = this.parentElement.querySelector(".quantity");
    const quantity = parseInt(quantityInput.value);

    if (quantity <= 0) {
        alert("Виберіть коректну кількість товару.");
        return;
    }

    // Створіть новий елемент списку для товару
    const cartItem = document.createElement("li");
    const itemPrice = product.price;
    const itemTotal = itemPrice * quantity;
    cartItem.innerHTML = `
        <img src="${product.imgSrc}" alt="${product.name}">
        <span>${product.name}</span>
        <input type="number" value="${quantity}" min="1" class="quantity">
        <span class="item-price">${itemPrice} грн</span>
        <span class="item-total">${itemTotal} грн</span>
        <button class="remove-item">Видалити</button>
    `;

    // Додайте обробник подій для кнопки видалення товару з корзини
    cartItem.querySelector(".remove-item").addEventListener("click", removeCartItem);

    // Додайте обробник подій для зміни кількості товару
    cartItem.querySelector(".quantity").addEventListener("change", function () {
        updateCartItemPrice(cartItem);
    });

    // Додайте товар до корзини
    cartItems.appendChild(cartItem);

    // Оновіть ціни
    updateCartItemPrice(cartItem);

    // Оновіть кількість доданих товарів в корзині
    updateCartCount();
}

// Реєструємо обробник подій для кнопки "Очистити корзину"
clearCartButton.addEventListener("click", function () {
    while (cartItems.firstChild) {
        cartItems.removeChild(cartItems.firstChild);
    }
    totalAmount = 0;
    cartTotal.textContent = "0 грн";
    updateCartCount();
});


// Додайте обробник подій для кнопок "Додати до корзини"
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
        const product = {
            imgSrc: this.parentElement.querySelector("img").src,
            name: this.parentElement.querySelector("h3").textContent,
            price: parseFloat(this.parentElement.querySelector(".product-price").textContent),
        };
        addToCart.call(this, product); // Викликаємо addToCart з контекстом кнопки
    });
});



const cartContainer = document.querySelector(".cart-container");
const openCartButton = document.getElementById("open-cart");

// Функція для відкриття корзини
function openCart() {
    cartContainer.classList.add("cart-open");
    openCartButton.style.display = "none"; // Приховати кнопку "Відкрити корзину"
}

// Функція для закриття корзини
function closeCart() {
    cartContainer.classList.remove("cart-open");
    openCartButton.style.display = "block"; // Показати кнопку "Відкрити корзину"
}

// Встановіть обробник подій для кнопки "Відкрити корзину"
openCartButton.addEventListener("click", openCart);

// Встановіть обробник подій для корзини для її закриття при кліку за межами корзини
cartContainer.addEventListener("click", function (event) {
    if (event.target === cartContainer) {
        closeCart();
    }
});

