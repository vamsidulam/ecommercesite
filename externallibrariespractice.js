import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
const daytime= dayjs();
console.log(daytime);
const time=daytime.format();
console.log(time);
console.log(daytime.format('DD-MMM-YY'));
console.log(daytime.format('hh-m-ss-a'));
console.log(daytime.format('dddd'));
console.log(daytime.day());
console.log(daytime.add('2','day').format('DD-MMM-YY'));
console.log(daytime.add('2','day').format('dddd,DD,YYYY'));

// Swal.fire({
//         title: "sweet!",
//         text: "how are you man",
//         icon: "question"
// } ).then ( ()=>{
//         Swal.fire({   
//         title: "Drag me!",
//         icon: "Sucess",
//         draggable: true
//         }).then ( ()=>{
//                 Swal.fire({
//                         icon: "success",
//                         title: "Done your confirmation"
                        
//                 });
//         } )
// } );

// Swal.fire({
//         imageUrl : "amazonpagepics/shirt.jpg",
//         imageHeight: 120,
//         imageAlt: "A tall image"
// });


Swal.fire({
        title: "htmltag",
        icon: "success",
        showCloseButton: true,
        showConfirmButton :true,
        confirmButtonText: 'save',
        showDenyButton: true,
        denyButtonText: "Don't save",
        showCancelButton: true,
        html: `
        <p>Hello from <b>HTML</b> content!</p>
        <button onclick="alert('Clicked!')">Click Me</button>
        `,
        
});
        
// Swal.fire({
//   title: "Do you want to save the changes?",
//   showDenyButton: true,
//   showCancelButton: true,
//   confirmButtonText: "Save",
//   denyButtonText: `Don't save`
// }).then((result) => {
//   /* Read more about isConfirmed, isDenied below */
//   if (result.isConfirmed) {
//     Swal.fire("Saved!", "", "success");
//   } else if (result.isDenied) {
//     Swal.fire("Changes are not saved", "", "info");
//   }
// });