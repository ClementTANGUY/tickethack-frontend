//requete get

fetch('http://localhost:3000/carts/'), {
method: 'GET'
}
.then(response => response.json())
.then(data => {
    if (data.result) {
const hours = new Date(data.trips[0].date).getUTCHours();
const minutes = new Date(data.trips[0].date).getUTCMinutes();
document.querySelector('#cart-container').innerHTML ='';
document.querySelector('#cart-container').innerHTML +=`
<div class="text-center">My Cart</div>
<div class="flex flex-row justify-between items-center w-120 h-12 bg-[#F2F3F4] m-1">
  <div class="text-xs">
    ${data.trips[0].departure} > ${data.trips[0].arrival}
</div>
<div class="text-xs">
  ${hours}:${minutes}
</div>
<div class="text-xs">
  ${data.trips[0].price}€
</div>
<button class="deleteTrip w-10 h-6 bg-[#50A791] text-white text-xs font-bold rounded" id="${data.trips[0]._id}">X</button>
</div>
`}})

//cart.delete pour supprimer les voyages du panier
//cart.post pour enregistrer les voyages dans Bookings quand on clique sur "purchase"
