//Get all trips in cart
fetch('http://localhost:3000/carts/')
.then(response => response.json())
.then(data => {
    if (data.result) {
      document.querySelector('#cart-container').innerHTML ='';
      for (const trip of data.carts) {
        const hours = new Date(trip.date).getUTCHours();
        const minutes = new Date(trip.date).getUTCMinutes();
        document.querySelector('#cart-container').innerHTML +=`
          <div class="text-center">My Cart</div>
            <div class="flex flex-row justify-between items-center w-120 h-12 bg-[#F2F3F4] m-1">
              <div class="text-xs">
                ${trip.departure} > ${trip.arrival}
              </div>
              <div class="text-xs">
                ${hours}:${minutes}
              </div>
              <div class="text-xs">
                ${trip.price}€
              </div>
              <button class="deleteTrip w-10 h-6 bg-[#50A791] text-white text-xs font-bold rounded" id="${data.trips[0]._id}">X</button>
            </div>
          `
      }
    }
})

//cart.delete pour supprimer les voyages du panier
//cart.post pour enregistrer les voyages dans Bookings quand on clique sur "purchase"
