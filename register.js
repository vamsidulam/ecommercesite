
document.querySelector('.js-confirm-btn').addEventListener('click',()=>{
    newmailpassword();
});
function newmailpassword(){
    let email=document.querySelector('.js-new-email').value;
    let password=document.querySelector('.js-new-password').value;
    let users=JSON.parse(localStorage.getItem('users'))||[
        
    ];
    let found=0;
    users.forEach( (pair)=>{
        if(pair.email===email && pair.password===password){
            found=1;
            Swal.fire({
            icon: 'error',
            title: 'failure',
            text: 'Already Registered',
            confirmButtonText: 'OK'
        });
        }
    } );
    if(!found){
        users.push(
            {
                email:email,
                password:password
            }
        )
        localStorage.setItem('users',JSON.stringify(users));
        console.log(users);
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Password changed successfully',
            confirmButtonText: 'OK'
        });

    }
    
}
