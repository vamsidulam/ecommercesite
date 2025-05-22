import { obj } from './amazonpage-data.js';
// import { cost_details } from './paymentcode.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let cart_items = JSON.parse(localStorage.getItem('cart_items')) || [];

export function removecart() {
    cart_items = [];
    
    localStorage.setItem('cart_items', JSON.stringify(cart_items));
    const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.innerText = 0;
  }
    
}
export const cost_details = JSON.parse(localStorage.getItem('cost_details')) || 
    {
        total_cost_of_products:0,
        shipping_tax:0,
        tax:0,
        final_cost:0 
    };

const shippingcost=[
    {
        radioidx:0,
        cost:0
    },
    {
        radioidx:1,
        cost:100
    },
    {
        radioidx:2,
        cost:150
    }
];
const daytime=dayjs();
console.log(daytime);
console.log(cost_details);

let product_name='';
let product_img='';
let product_quantity=0;
let product_cost=0;



console.log(cart_items);
window.addEventListener('DOMContentLoaded',()=>{
    load_cart_items();
    load_cost_summary();
    updatequantitybuttons();
    deletecart();
    shipping_date();
});


function load_cart_items(){
    let cart_items_code='';
    cart_items.forEach( (cart_product,index)=>{
        product_name=cart_product.name;
        console.log(product_name);
        obj.forEach( (product_data)=>{
            if(product_name===product_data.productname){
                product_cost=product_data.productcost;
                product_img=product_data.productpic;
                product_quantity=cart_product.count;
            }
        });
        
        
        const daytime=dayjs();
        const daysofshipping_7 = daytime.add(7,'day').format('dddd, DD MMM');
        const daysofshipping_5 = daytime.add(5,'day').format('dddd, DD MMM');
        const daysofshipping_3 = daytime.add(3,'day').format('dddd, DD MMM');
        cart_items_code +=`
        <div class="product-section">
            <div class="left-section">
                <img src="${product_img}">
            </div>
            <div class="middle-section">
                <div class="product-name">
                    <p>${product_name}</p>
                </div>
                <div class="product-shipping">
                    <p>Sold by The Modern Soul</p>
                    <p>🚌 Amazon Delivered</p>
                </div>
                <div class="product-size-color">
                    <p><strong>Size:</strong> M</p>
                    <p><strong>Color:</strong> Beige</p>
                </div>
                <div class="quantity-section">
                    <button data-index="${index}" class="quantity-btn js-quantity-decrease">-</button>
                    <p class="js-product-quantity product-quantity">Quantity: ${product_quantity}</p>
                    <button data-index="${index}" class="quantity-btn js-quantity-increase">+</button>
                    <button data-index="${index}" class="js-delete-btn delete-btn">Delete</button>
                </div>
            </div>
            <div class="right-section">
                <p class="offer-title">Limited time deal</p>
                <div class="offer">
                    <p class="offer-percent">-50%</p>
                    <p class="offer-price">&#8377; ${product_quantity*product_cost}</p>
                </div>
                <div class="shipping-date-box">
                    <div class="date-box">
                        <div class="left-section">
                            <input  data-product-index="${index}" 
                             ${ parseInt(cart_product.dataidx) ===  0 ? 'checked' : ''}
                            data-shipping-index="0" class="js-radio-btn radio_btn" name="radio_btn_${index}" type="radio">
                        </div>
                        <div class="right-section">
                            <p style="color: red; font-weight: bold;">${daysofshipping_7}</p>
                            <p>FREE Shipping</p>
                        </div>
                    </div>
                    <div class="date-box">
                        <div class="left-section">
                            <input data-product-index="${index}" 
                             ${ parseInt(cart_product.dataidx) === 1 ? 'checked' : ''}
                            data-shipping-index="1" class="js-radio-btn" name="radio_btn_${index}" type="radio">
                        </div>
                        <div class="right-section">
                            <p style="color: red; font-weight: bold;">${daysofshipping_5}</p>
                            <p>&#8377;100 Shipping</p>
                        </div>
                    </div>
                    <div class="date-box">
                        <div class="left-section">
                            <input data-product-index="${index}"
                             ${ parseInt(cart_product.dataidx) === 2 ? 'checked' : ''}
                             data-shipping-index="2" class="js-radio-btn" name="radio_btn_${index}" type="radio">
                        </div>
                        <div class="right-section">
                            <p style="color: red; font-weight: bold;">${daysofshipping_3}</p>
                            <p>&#8377;150 Shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    window.addEventListener('DOMContentLoaded',()=>{
        
    });
    document.querySelector('.js-cart-box').innerHTML=cart_items_code;
    
    updatequantitybuttons();
    deletecart();
    shipping_date();
}





function load_cost_summary(){
    let total_cost_of_products=0;
    let quantity = 0;
    let shipping_tax=0;
    
    cart_items.forEach((product) => {
        let cost = 0;
        obj.forEach((item) => {
            if (item.productname === product.name) {
                cost = item.productcost;
            }
        });
        total_cost_of_products=parseInt(total_cost_of_products) + parseInt(cost) * parseInt(product.count);
        quantity += product.count;
        let index= product.dataidx;
        shipping_tax +=shippingcost[index].cost;
        
        
    });
    console.log("The shipping tax is: ",shipping_tax);
    
    
    
    let total_before_tax=total_cost_of_products+shipping_tax;
    let tax = Math.round(total_before_tax * 0.10);
    let final_cost = total_cost_of_products + tax + shipping_tax;
    let cost_code=`
    <div>
        <p class="order-title-name">Order Summary</p>
        <div class="cost-details-section">
            <div class="shipping-details">
                <p>Items (${cart_items.length}) :</p>
                <p>Shipping & handling:</p>
                <p>Total before tax:</p>
                <p>Estimated tax (10%):</p>
            </div>
            <div class="cost-details">
                <p>&#8377 ${total_cost_of_products}</p>
                <p>&#8377 ${shipping_tax}</p>
                <p>&#8377 ${total_cost_of_products+shipping_tax}</p>
                <p>&#8377 ${tax}</p>
            </div>
        </div>
        <div class="total-cost-analysis">
            <div><p class="total-cost-name">Order total:</p></div>
            <div><p class="total-cost">&#8377 ${final_cost}</p></div>
        </div>
        <div class="place-order-btn">
            <a href="payment.html"><button>Place your order</button></a>
            
        </div>
    </div>
    `;
    document.querySelector('.js-order-summary-section').innerHTML = cost_code;
    document.querySelector('.js-title').innerHTML=`Check out ${cart_items.length} items`;
    cost_details.total_cost_of_products=total_cost_of_products;
    cost_details.shipping_tax=shipping_tax;
    cost_details.tax=tax;
    cost_details.final_cost=final_cost;
    localStorage.setItem('cost_details',JSON.stringify(cost_details));
    console.log(cost_details);

}



function updatequantitybuttons(){
    increasecartcount();
    decreasecartcount();

}
function increasecartcount(){
    document.querySelectorAll('.js-quantity-increase').forEach( (count_increase_button)=>{
        count_increase_button.addEventListener('click',()=>{
            let count=count_increase_button.dataset.index;
            cart_items[count].count+=1;
            updatecartitems(cart_items[count].count,count);
            load_cart_items();
            load_cost_summary();
        });
        
    });
}
function decreasecartcount(){
    document.querySelectorAll('.js-quantity-decrease').forEach( (count_decrease_button)=>{
        count_decrease_button.addEventListener('click',()=>{
            let count=count_decrease_button.dataset.index;
            if(cart_items[count].count===1){
                
                cart_items.splice(count,1);
                console.log(cart_items);
                localStorage.setItem('cart_items',JSON.stringify(cart_items));
                let total_quantity=0;
                cart_items.forEach( (product) =>{
                    total_quantity+=product.count;
                });
                localStorage.setItem('cart_count',JSON.stringify(total_quantity));
                window.addEventListener('DOMContentLoaded',()=>{
                document.querySelector('.js-cart-count').innerHTML = total_quantity;
                });
                load_cart_items();
                updatequantitybuttons();
                load_cost_summary();
            }
            else{
                cart_items[count].count-=1;
            }
            
            updatecartitems(cart_items[count].count,count);
            load_cart_items();
            load_cost_summary();
            
        });
        
    });
    
}
function updatecartitems(product_quantity,index){
    localStorage.setItem('cart_items',JSON.stringify(cart_items));
    let total_quantity=0;
    cart_items.forEach( (product) =>{
        total_quantity+=product.count;
    });
    localStorage.setItem('cart_count',JSON.stringify(total_quantity));
    window.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('.js-cart-count').innerHTML = total_quantity;
    });
    updatequantitybuttons();
    deletecart();
    
}
function deletecart(){
    document.querySelectorAll('.js-delete-btn').forEach( (item)=>{
        item.addEventListener('click',()=>{
            let item_index=item.dataset.index;
            console.log(cart_items[item_index].count);
            cart_items.splice(item_index,1);
            console.log(cart_items);
            localStorage.setItem('cart_items',JSON.stringify(cart_items));
            let total_quantity=0;
            cart_items.forEach( (product) =>{
                total_quantity+=product.count;
            });
            localStorage.setItem('cart_count',JSON.stringify(total_quantity));
            window.addEventListener('DOMContentLoaded',()=>{
            document.querySelector('.js-cart-count').innerHTML = total_quantity;
            });
            load_cart_items();
            updatequantitybuttons();
            load_cost_summary();
            
        });
    } ); 
}

function shipping_date(){
    document.querySelectorAll('.js-radio-btn').forEach( (radio_btn) => {
        radio_btn.addEventListener('click',()=>{
            console.log(radio_btn);
            let product_index=radio_btn.dataset.productIndex;
            let shipping_index=radio_btn.dataset.shippingIndex;
            console.log(product_index);
            console.log(shipping_index);
            console.log(shippingcost[shipping_index].cost);
            cart_items[product_index].dataidx=shipping_index;
            localStorage.setItem('cart_items',JSON.stringify(cart_items));
            load_cost_summary();
            console.log(cart_items);
            console.log(shippingcost);
        });
    });
}