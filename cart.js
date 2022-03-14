// Make sure it's loaded
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
//  Run when page is loaded
function ready() {
    let removeCartItemButtons = document.getElementsByClassName('cart-remove')
console.log(removeCartItemButtons)
for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem) 
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity')
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToCartButtons = document.getElementsByClassName('add-cart')
    for (let i = 0; i < addToCartButtons.length; i++) {
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener('click', purchasedClicked)
};

//Purchase Remove Items
function purchasedClicked() {
    alert('Thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-content')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}




// Removing a cart item
function removeCartItem(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateCartTotal() 
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}
// Add to Cart

function addToCartClicked(event) {
    let button = event.target
    let shopItem = button.parentElement
    let title = shopItem.getElementsByClassName('shop-title')[0].innerText
    let price = shopItem.getElementsByClassName('price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('shop-img')[0].src 
    console.log(title, price, imageSrc)
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div') 
    let cartItems = document.getElementsByClassName('cart-content')[0]
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title')
    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to your cart')
            return
        }
    }
    let cartRowContent = `
    <div class="cart-box">
    <img src="${imageSrc}" alt="" class="cart-img">
    <div class="detail-box">
        <div class="cart-product-title">${title}</div>
        <div class="cart-price">${price}</div>
        <input type="number" value="1" class="cart-quantity">
        <!-- <button class="btn btn-remove">Remove</button> -->
    </div>
        <!--Remove Cart-->
        <i class="fa fa-trash cart-remove"></i> 
    </div>`
    cartRow.innerHTML = cartRowContent
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)
}



//Cart Total
function updateCartTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-content')[0]
    let cartRows = cartItemContainer.getElementsByClassName('cart-box')
    let total = 0
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('cart-price')[0]
        let quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}

let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active")
};
//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active")
};