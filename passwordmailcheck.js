const users=JSON.parse(localStorage.getItem('users'))||[

];

const otps=[
    1234,3344,6789,5423,5643,9876,1122,4356
];
let otp_generated=0;
console.log(users);


document.querySelector('.js-password').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        check();
    }
});


document.querySelector('.js-signin-btn').addEventListener('click',()=>{
    check();
});
function check(){
    let email=document.querySelector('.js-email').value;
    let password=document.querySelector('.js-password').value;
    console.log(email);
    console.log(password);
    console.log(users);
    // let n1=document.querySelector('.js-otp1').value;
    // let n2=document.querySelector('.js-otp2').value;
    // let n3=document.querySelector('.js-otp3').value;
    // let n4=document.querySelector('.js-otp4').value;
    // console.log(n1+n2+n3+n4);
    // let otp=`${n1}${n2}${n3}${n4}`;
    let found=0;
    let count=0;
    // console.log(otp)
    // console.log(otp_generated);
    users.forEach( (pair,index)=>{
        if(pair.email===email&&pair.password===password){
            found=1;
            location.href='https://vamsidulam.github.io/ecommercesite/amazonpage.html';
        }
        if(pair.email===email){
            count=1;
        }
    });
    if(!found && !count){
        Swal.fire({
            icon: 'error',
            title: 'Log in Failure!',
            text: 'No Registered email',
            confirmButtonText: 'OK'
        });
    }
    if(count===1 && found===0){
        Swal.fire({
            icon: 'error',
            title: 'Failure!',
            text: 'Incorrect Password',
            confirmButtonText: 'OK'
        });
    }
    // document.querySelector('.js-otp1').value='';
    // document.querySelector('.js-otp2').value='';
    // document.querySelector('.js-otp3').value='';
    // document.querySelector('.js-otp4').value='';
    document.querySelector('.js-email').value='';
    document.querySelector('.js-password').value='';
}

// document.querySelector('.js-generate-otp-btn').addEventListener('click',()=>{
//     let index=Math.floor((Math.random())*otps.length);
//     console.log(otps[index]);
//     otp_generated=otps[index];
//     alert(`Your otp is: ${otp_generated}`);
// });


// const otpInputs = document.querySelectorAll('.otp-box');

// otpInputs.forEach((input, index) => {
//     input.setAttribute('maxlength', '1');

//     input.addEventListener('input', () => {
//         if (input.value.length === 1 && index < otpInputs.length - 1) {
//             otpInputs[index + 1].focus();
//         }
//     });

//     input.addEventListener('keydown', (e) => {
//         if (e.key === 'Backspace' && input.value === '' && index > 0) {
//             otpInputs[index - 1].focus();
//         }
//     });
// });


// document.querySelector('.js-auto-fetch').addEventListener('click',()=>{
    
//     let n=otp_generated.length;
//     let n1=0;
//     let n2=0;
//     let n3=0;
//     let n4=0;
//     let otp=otp_generated;
//     for(let i=0;i<4;i++){
//         let rem=Math.floor(otp%10);
//         console.log(rem);
//         if(i===0){
//             n4=rem
//         }
//         else if(i===1){
//             n3=rem;
//         }
//         else if(i===2){
//             n2=rem;
//         }
//         else{
//             n1=rem;
//         }
//         otp/=10;

//     }
//     // console.log(n1);
//     // console.log(n2);
//     // console.log(n3);
//     // console.log(n4);
//     document.querySelector('.js-otp1').value=n1;
//     document.querySelector('.js-otp2').value=n2;
//     document.querySelector('.js-otp3').value=n3;
//     document.querySelector('.js-otp4').value=n4;
// });