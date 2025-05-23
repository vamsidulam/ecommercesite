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
 
    let found=0;
    let count=0;
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
    
    document.querySelector('.js-email').value='';
    document.querySelector('.js-password').value='';
}
