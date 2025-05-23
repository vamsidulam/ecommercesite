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


document.querySelector('.js-input').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        renderproducts();
    }
});
document.querySelector('.js-search').addEventListener('click',()=>{
    renderproducts();
});
function renderproducts(){
    let found=0;
    let input_value=document.querySelector('.js-input').value;
    let htmlcode='';
    console.log(input_value);
    document.querySelector('.js-products').innerHTML=htmlcode;
    obj.forEach((item,index)=>{
    if(item.type===input_value){
        found=1;
        console.log(item.productname);
        htmlcode+=`
        <div class="product-container">
            <div class="product-top-container">
                <img class="product-pic" src=${item.productpic}>
            </div>
            <div class="product-bottom-container">
                <p class="product-name">${item.productname}</p>
                <div class="product-rating-section">
                    <img class="product-rating-pic" src=${item.productratingpic}>
                    <p class="product-rating-members-count">${item.productrating}</p>
                </div>
                <div class="product-cost-section">
                    <p class="product-cost">${item.productcost}</p>
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
        }
    });
    if(!found)
    {
        htmlcode=`no items found`;
    }
    document.querySelector('.js-products').innerHTML=htmlcode;
    document.querySelector('.js-input').value='';
}



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
