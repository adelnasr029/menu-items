import products from "./products.js";

const cart = () => {
    let iconCart = document.querySelector('.icon-cart');
    let body = document.querySelector('body');
    let closeBtn = document.querySelector('.cartTab .close');
    let cart = []

    // open and close tab
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    closeBtn.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })

    const setProductInCart = (idProduct, quantity, position) => {
        if(quantity > 0){
            if(position < 0){
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            }else{
                cart[position].quantity = quantity;
            }
        }else {
            cart.splice(position, 1)
        }
        localStorage.setItem('cart', JSON.stringify(cart))
        refreshCartHtml();
    }
    const refreshCartHtml = () => {
        let listHTML = document.querySelector('.listCart')
        let totalHTML = document.querySelector('.icon-cart span')
        let totalQuantity = 0
        listHTML.innerHTML = null
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity
            let position = products.findIndex((value) => value.id == item.product_id)
            let info = products[position]
            let newItem = document.createElement('div')
            newItem.classList.add('item')
            listHTML.appendChild(newItem)
            newItem.innerHTML = 
            `
                <div class="image">
                    <img src="${info.image}"/>
                </div>
                <div class="name">Name</div>
                <div class="totalPrice">$
                ${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${info.id}" >+</span>
                </div>
            `
        })
        totalHTML.innerText = totalQuantity
    }
    //event click
    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id
        let position = cart.findIndex((value) => value.product_id == idProduct)
        let quantity = position < 0 ? 0 : cart[position].quantity
        if(buttonClick.classList.contains('addCart') || buttonClick.classList.contains('plus') ){
            quantity++;
            setProductInCart(idProduct, quantity, position)
        }else if(buttonClick.classList.contains('minus') ){
            quantity--;
            setProductInCart(idProduct, quantity, position)
        }
    })
    const initApp = () => {
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        refreshCartHtml();
    }
    initApp()
}

export default cart;

