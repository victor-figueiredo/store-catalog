const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartTotal = document.getElementById("cart-total")
const cartItemsContainer = document.getElementById("cart-items")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCount = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

const cart = []

const products = [
    {
        name: "Conjunto-Rubi",
        imageUrl: "./assets/images/products/p1.jpeg",
        size: "M",
        price: 79.90
    },
    {
        name: "Conjunto-Cinderela",
        imageUrl: "./assets/images/products/p2.jpeg",
        size: "P e M",
        price: 51.90
    },
    {
        name: "Santa-Passion",
        imageUrl: "./assets/images/products/p3.jpeg",
        size: "P",
        price: 59.90
    },
    {
        name: "Conjunto-Delicada",
        imageUrl: "./assets/images/products/p4.jpeg",
        size: "P",
        price: 83.90
    },
    {
        name: "Baby-doll",
        imageUrl: "./assets/images/products/p5.jpeg",
        size: "P e M",
        price: 44.90
    },
];

const individualsProducts = [];

function renderProducts() {
    const productsContainer = document.getElementById("products-container");
    productsContainer.innerHTML = "";

    products.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
        <div class="flex gap-2">
            <a href=${product.imageUrl} target="_blank">
                <img src=${product.imageUrl} alt=${product.name} class="w-28 h-28 rounded-md hover:scale-110 hover:rotate-2 duration-300">
            </a>
            <div class="w-[100%]">
                <p class="font-bold">${product.name.replace("-", " ")}</p>
                <p class="text-sm">Tamanhos: ${product.size}.</p>
                    <div class="flex items-center gap-2 justify-between mt-3">
                        <p class="font-bold text-lg">${product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}</p>
                        <button 
                            class="bg-[#3E2337] px-5 rounded add-to-cart-btn"
                            data-name=${product.name}
                            data-price=${product.price}
                        >
                            <i class="fa fa-cart-plus text-lg text-white"></i>
                        </button>
                    </div>
                </div>    
            </div>
        `;

        productsContainer.appendChild(productElement);
    });
}

function renderIndividualProducts() {
    const productsContainer = document.getElementById("container-individuals-products");
    productsContainer.innerHTML = "";

    if(individualsProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="w-[100%]">
                <h1 class="text-4xl">
                    Em breve!
                </h1>
            </div>
        `
        return;
    }

    individualsProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        productElement.innerHTML = `
        <div class="flex gap-2">
            <a href=${product.imageUrl} target="_blank">
                <img src=${product.imageUrl} alt=${product.name} class="w-28 h-28 rounded-md hover:scale-110 hover:rotate-2 duration-300">
            </a>
            <div class="w-[100%]">
                <p class="font-bold">${product.name.replace("-", " ")}</p>
                <p class="text-sm">Tamanhos: ${product.size}.</p>
                <div class="flex items-center gap-2 justify-between mt-3">
                    <p class="font-bold text-lg">${product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}</p>
                    <button 
                        class="bg-[#3E2337] px-5 rounded add-to-cart-btn"
                        data-name=${product.name}
                        data-price=${product.price}
                    >
                        <i class="fa fa-cart-plus text-lg text-white"></i>
                    </button>
                </div>
            </div>    
        </div>
        `;

        productsContainer.appendChild(productElement);
    });
}

window.addEventListener("DOMContentLoaded", () => {
    renderProducts()
    renderIndividualProducts()
});

// abrir modal do carrinho
cartBtn.addEventListener("click", function () {
    cartModal.style.display = "flex"
})

cartModal.addEventListener("click", function (e) {
    if (e.target === cartModal) {
        cartModal.style.display = "none"
    }
})

closeModalBtn.addEventListener("click", function () {
    cartModal.style.display = "none"
})

menu.addEventListener("click", function (e) {
    let parentButton = e.target.closest(".add-to-cart-btn")
    if (parentButton) {
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name, price)
    }
})

function addToCart(name, price){
    console.log(name, price)
    const existingItem = cart.find((item) => item.name === name)

    if (existingItem) {
        existingItem.quantity += 1
    } else {
        cart.push({
            name,
            price,
            quantity: 1
        })
    }
    updateCartModal()
}

function updateCartModal() {
    cartItemsContainer.innerHTML = ""
    let total = 0
    let count = 0
    cart.forEach((item) => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")
        
        cartItemElement.innerHTML= `
            <div class="flex items-center justify-between">
                <div>
                    <p class="font-bold">${item.name}</p>
                    <p>Qtd: ${item.quantity}</p>
                    <p class="font-bold mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <button class="remove-from-cart-btn" data-name="${item.name}">
                        Remover
                    </button>
                </div>
            </div>
        `

        total += item.price * item.quantity
        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
    cartCount.innerText = cart.length
}

cartItemsContainer.addEventListener("click", function (e) {{
    if (e.target.classList.contains("remove-from-cart-btn")) {
        const name = e.target.getAttribute("data-name")

        removeItemCart(name)
    }
}})

function removeItemCart(name) {
    const index = cart.findIndex((item) => item.name === name)
    if (index !== -1) {
        const item = cart[index];

        if (item.quantity > 1) {
        item.quantity -= 1
        } else {
            cart.splice(index, 1)
        }
        updateCartModal()
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value;

    if(inputValue !== ""){
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }

})

checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return;

    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    // Enviar pedido para api whats
    const cartItems = cart.map((item) => {
        return `${item.name} por ${item.price.toFixed(2)}, quantidade: ${item.quantity} | `
    }).join("")
    const phane = "5581985718557"
    const message = encodeURI(`Olá, gostaria de fazer o pedido:\n${cartItems}\nTotal: ${cartTotal.textContent}\nEndereço: ${addressInput.value}`)
    window.open(`https://wa.me/${phane}?text=${message}`, "_blank")

    Toastify({
        text: "Finalizando o pedido...",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#22C55E",
        }
      }).showToast();

      cart.length = 0
      cartModal.style.display = "none"
      updateCartModal()
})

// function checkStoreOpen () {
//     const data = new Date();
//     const hora = data.getHours();
//     return hora >= 18 && hora < 22
//     // true, loja está aberta
// }

// const spanItem = document.getElementById("date-span")
// const isOpen = checkRestaurantOpen()
 
// if(isOpen){
    // spanItem.classList.remove("bg-red-500")
    // spanItem.classList.add("bg-green-500")
// } else {    
    // spanItem.classList.add("bg-red-500")
    // spanItem.classList.remove("bg-green-500")
// }