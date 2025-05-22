import {obj} from './amazonpage-data.js';
import {cart_items, removecart} from './cart.js';
let cart_count=JSON.parse(localStorage.getItem('cart_count'))||0;
window.addEventListener('DOMContentLoaded',()=>{
    
    document.querySelector('.js-cart-count').innerHTML = cart_count || 0;
});



let product_pic='';
let product_name='';
let product_rating_pic='';
let product_rating_count='';
let product_cost='';

let htmlcode='';
obj.forEach( (product,index)=>{
    product_pic=product.productpic;
    product_name=product.productname;
    product_rating_pic=product.productratingpic;
    product_rating_count=product.productrating;
    product_cost=product.productcost;
    
    htmlcode+=`
    <div class="product-container">
                <div class="product-top-container">
                    <img class="product-pic" src=${product_pic}>
                </div>
                <div class="product-bottom-container">
                    <p class="product-name">${product_name}</p>
                    <div class="product-rating-section">
                        <img class="product-rating-pic" src=${product_rating_pic}>
                        <p class="product-rating-members-count">${product_rating_count}</p>
                    </div>
                    <div class="product-cost-section">
                        <p class="product-cost">${product_cost}</p>
                        <select class="product-selection-count js-cart-count-increase">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                    </div>
                    <div class="product-addtocart-btn-section">
                    <p class="added-text js-added-text">Added ✅</p>
                        <button data-index="${index}" class="addtocart-btn js-addtocart-btn">Add to cart</button>
                    </div>
                    
                </div>
            </div>
    `;
    
} )
document.querySelector('.js-products').innerHTML=htmlcode;





    document.querySelectorAll('.js-addtocart-btn').forEach((cart_button)=>{
        cart_button.addEventListener('click',function(){
            // let count=document.querySelectorAll('.js-cart-count-increase').value;
            // console.log(count);
            
            
            const container = cart_button.closest('.product-bottom-container');
            console.log(container);
            const added_text=container.querySelector('.js-added-text');
            added_text.style.display="block";
                setTimeout(()=>{
                added_text.style.display="none";
                },2000);
            let count=container.querySelector('.js-cart-count-increase').value;
            
            
            const index = cart_button.dataset.index;
            console.log(index);
            let found='';
            cart_items.forEach( (product,cart_index)=>{
                if(cart_items[cart_index].name===obj[index].productname){
                    cart_items[cart_index].count+=parseInt(count);
                    found=1;
                }
                
            } );
            if(!found)
            {
                cart_items.push(
                    {
                        name:obj[index].productname,
                        count:parseInt(count),
                        dataidx: 0
                    }
                );
                found='';
            }
           console.log(cart_items);
           localStorage.setItem('cart_items',JSON.stringify(cart_items));
            increasecartcount(parseInt(count));
            
        });
    }
        
    );


document.querySelector('.js-reset-cart-btn').addEventListener('click',()=>{
    cart_count=0;
    removecart();
    localStorage.setItem('cart_count',JSON.stringify(cart_count));
    document.querySelector('.js-cart-count').innerHTML=cart_count;
    localStorage.setItem('cart_items',JSON.stringify(cart_items));
});

function increasecartcount(value){
    cart_count+=value;
    localStorage.setItem('cart_count',JSON.stringify(cart_count));
    document.querySelector('.js-cart-count').innerHTML=cart_count;
    
    
}


// import { obj } from './amazonpage-data.js';

// // Product class
// class Product {
//     constructor({ productpic, productname, productratingpic, productrating, productcost }) {
//         this.productpic = productpic;
//         this.productname = productname;
//         this.productratingpic = productratingpic;
//         this.productrating = productrating;
//         this.productcost = productcost;
//     }

//     render(index) {
//         return `
//         <div class="product-container">
//             <div class="product-top-container">
//                 <img class="product-pic" src="${this.productpic}">
//             </div>
//             <div class="product-bottom-container">
//                 <p class="product-name">${this.productname}</p>
//                 <div class="product-rating-section">
//                     <img class="product-rating-pic" src="${this.productratingpic}">
//                     <p class="product-rating-members-count">${this.productrating}</p>
//                 </div>
//                 <div class="product-cost-section">
//                     <p class="product-cost">${this.productcost}</p>
//                     <select class="product-selection-count js-cart-count-increase">
//                         <option>1</option><option>2</option><option>3</option>
//                         <option>4</option><option>5</option><option>6</option>
//                     </select>
//                 </div>
//                 <div class="product-addtocart-btn-section">
//                     <button data-index="${index}" class="addtocart-btn js-addtocart-btn">Add to cart</button>
//                 </div>
//             </div>
//         </div>
//         `;
//     }
// }

// // CartItem class
// class CartItem {
//     constructor(name, count = 1) {
//         this.name = name;
//         this.count = count;
//     }
// }

// // Cart class
// class Cart {
//     constructor() {
//         this.cartItems = JSON.parse(localStorage.getItem('cart_items')) || [];
//         this.cartCount = JSON.parse(localStorage.getItem('cart_count')) || 0;
//     }

//     addItem(name, count) {
//         let found = false;
//         for (let item of this.cartItems) {
//             if (item.name === name) {
//                 item.count += count;
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) {
//             this.cartItems.push(new CartItem(name, count));
//         }
//         this.cartCount += count;
//         this.save();
//     }

//     removeAll() {
//         this.cartItems = [];
//         this.cartCount = 0;
//         this.save();
//     }

//     save() {
//         localStorage.setItem('cart_items', JSON.stringify(this.cartItems));
//         localStorage.setItem('cart_count', JSON.stringify(this.cartCount));
//         document.querySelector('.js-cart-count').innerHTML = this.cartCount;
//     }
// }

// window.addEventListener('DOMContentLoaded', () => {
//     const cart = new Cart();

//     // Show initial cart count
//     document.querySelector('.js-cart-count').innerHTML = cart.cartCount || 0;

//     // Create Product instances and render
//     const products = obj.map(prodData => new Product(prodData));
//     const htmlcode = products.map((prod, index) => prod.render(index)).join('');
//     document.querySelector('.js-products').innerHTML = htmlcode;

//     // Add event listeners to buttons
//     document.querySelectorAll('.js-addtocart-btn').forEach(button => {
//         button.addEventListener('click', () => {
//             const container = button.closest('.product-bottom-container');
//             const count = parseInt(container.querySelector('.js-cart-count-increase').value);
//             const index = parseInt(button.dataset.index);

//             cart.addItem(products[index].productname, count);
//             console.log(cart.cartItems);
//         });
//     });

//     // Reset cart button
//     document.querySelector('.js-reset-cart-btn').addEventListener('click', () => {
//         cart.removeAll();
//     });
// });
