import cart from "./cart.js"
import products from "./products.js";

// the el tht we use to contain the content file content
let app = document.getElementById('app');
//where the content of this page is stored
let temporaryContent = document.getElementById('temporaryContent')

// load template file
const loadTemplate = () => {
    fetch('/template.html')//path containing the template file 
    .then(response => response.text())
    .then(html => {
        app.innerHTML = html;//the template file content has been displayed on the index.html page
        let contentTab = document.getElementById('contentTab')
        contentTab.innerHTML = temporaryContent.innerHTML;
        temporaryContent.innerHTML = null
        cart()
        initApp()
    })
}
loadTemplate();
const initApp = () => {
    //load list product 
    console.log(products)
    let listProduct = document.querySelector('.listProduct');
    listProduct.innerHTML = null;
    products.forEach(product => {
        let newProduct = document.createElement('div')
        newProduct.classList.add('item')

        listProduct.appendChild(newProduct)
        newProduct.innerHTML = `
        <img src="${product.image}"/>
        <h2>${product.name}</h2>
        <div class="price">${product.price}$</div>
        <button class="addCart"
        data-id="${product.id}">
            Add To Cart
        </button>
        `
    })

}
