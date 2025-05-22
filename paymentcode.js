import {cost_details,cart_items} from './cart.js';
// export const cost_details = JSON.parse(localStorage.getItem('cost_items')) || 
//     {
//         total_cost_of_products:0,
//         shipping_tax:0,
//         tax:0,
//         final_cost:0 
//     };
document.querySelector('.js-order-summary-section').innerHTML=`
<p class="order-title-name">Order Summary</p>
    <div class="cost-section">
        <div class="cost-details-section">
            <div class="shipping-details">
                <p>Items (${cart_items.length}) :</p>
                <p>Shipping & handling:</p>
                <p>Total before tax:</p>
                <p>Estimated tax (10%):</p>
            </div>
            <div class="cost-details">
                <p>&#8377 ${cost_details.total_cost_of_products}</p>
                <p>&#8377 ${cost_details.shipping_tax}</p>
                <p>&#8377 ${cost_details.total_cost_of_products+cost_details.shipping_tax}</p>
                <p>&#8377 ${cost_details.tax}</p>
            </div>
        </div>
        <div class="total-cost-analysis">
            <div><p class="total-cost-name">Order total:</p></div>
            <div><p class="total-cost">&#8377 ${cost_details.final_cost}</p></div>
        </div>
        <div class="place-order-btn">
            <button class="confirm-btn">confirm your order</button>
            <div class="order-placed-text js-order-text">
                Your order has been Placed!✅
            </div>
        </div>
    </div>
`;
function renderaddress(){
    event.preventDefault();
    let name=document.querySelector('.js-name').value;
    let phno=document.querySelector('.js-phno').value;
    let address=document.querySelector('.js-address').value;
    let city=document.querySelector('.js-city-name').value;
    let staterow=document.querySelector('.js-state-section');
    let state=staterow.querySelector('.js-state').value;
    let email=document.querySelector('.js-email').value;
    console.log(name);
    console.log(phno);
    console.log(address);
    console.log(state);
    document.querySelector('.js-user-address').innerHTML=`
    <p>Delivering to ${name}</p>
    <p>${address}</p>
    <p>${city},${state}</p>
    <p>${phno} , ${email}</p>
    `;
        
    document.querySelector('.js-name').value='';
    document.querySelector('.js-phno').value='';
    document.querySelector('.js-address').value='';
    document.querySelector('.js-city-name').value='';
    let state_row=document.querySelector('.js-state-section');
    state_row.querySelector('.js-state').value='';
    document.querySelector('.js-email').value='';
}

 document.querySelector('.js-change-btn').addEventListener('click',()=>{
    document.querySelector('.form-section').style.display="block";
    document.querySelector('.js-change-btn').innerHTML='';
});
    document.querySelector('.js-close-btn').addEventListener('click',()=>{
    event.preventDefault();
    document.querySelector('.js-change-btn').innerHTML='Change';
    document.querySelector('.form-section').style.display="none";
});
    document.querySelector('.js-save-btn').addEventListener('click',()=>{
    event.preventDefault();
    let name=document.querySelector('.js-name').value;
    let phno=document.querySelector('.js-phno').value;
    let address=document.querySelector('.js-address').value;
    // console.log(name);
    // console.log(address);
    // console.log(phno);
    if(name==='' && phno==='' && address==='' ){
        document.querySelector('.js-note').style.display="block";
        setTimeout(() => {
            document.querySelector('.js-note').style.display="none";
        }, 2000);
    }
    else{
        renderaddress();
        event.preventDefault();
        document.querySelector('.js-save-result').style.display="block";
        setTimeout( ()=>{
            document.querySelector('.js-save-result').style.display="none";
        },2000 );

    }
    
});
document.querySelector('.confirm-btn').addEventListener('click',()=>{
    showOrderPlaced();
    setTimeout(() => {
        document.querySelector('.js-order-text').style.display='block';
    }, 3000);
    setTimeout(() => {
        document.querySelector('.js-order-text').style.display='none';
    }, 6000);
});

function showOrderPlaced() {
    Swal.fire({
      title: 'Order Placed!',
      text: 'Thank you for your purchase.',
      icon: 'success',
      showConfirmButton: false,
      timer: 3000,
      customClass: {
        popup: 'my-fullscreen-swal'
      },
      background: '#4CAF50',
      color: '#fff',
    });
  }