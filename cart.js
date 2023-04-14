let totalPrice = 0;

// Call the function to delete a trip into the cart
function deleteTripOfcartEventListener() {
  for (let i = 0; i < document.querySelectorAll(".deleteTrip").length; i++) {
    document.querySelectorAll(".deleteTrip")[i].addEventListener("click", function () {
      const id = this.id;
      fetch(`http://localhost:3000/carts/${id}`, {method: "Delete"})
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            this.parentNode.remove();
            totalPrice -= trip.trip.price;
            if (data.cart.length === 0) {
              document.querySelector('#cart-container').innerHTML +=`
              <p class="text-center text-xl p-6">
              No tickets in your cart.<br/><br/>
              Why not to plan a trip?
            </p>
            `
            }
          }
        });
    });
  }
}

//Get all trips into the cart
fetch('http://localhost:3000/carts/')
.then(response => response.json())
.then(data => {
    if (data.result) {
      if (data.cart.length === 0) {
        document.querySelector('#cart-container').innerHTML =`
          <p class="text-center text-xl p-6">
            No tickets in your cart.<br/><br/>
            Why not to plan a trip?
          </p>
        `
      } else {
        document.querySelector('#cart-container').innerHTML = '';
        document.querySelector('#cart-container').innerHTML += `
        <div class="text-center">My Cart</div>
        `
        for (const trip of data.cart) {
          const hours = new Date(trip.trip.date).getUTCHours();
          const minutes = new Date(trip.trip.date).getUTCMinutes();
          totalPrice += trip.trip.price;
          document.querySelector('#cart-container').innerHTML +=`
            <div class="flex flex-row justify-around items-center w-9/12 h-12 bg-[#F2F3F4] m-0">
              <div class="text-xs">
                ${trip.trip.departure} > ${trip.trip.arrival}
              </div>
              <div class="text-xs">
                ${hours}:${minutes}
              </div>
              <div class="text-xs">
                ${trip.trip.price}€
              </div>
              <button class="deleteTrip w-10 h-6 bg-[#50A791] text-white text-xs font-bold rounded" id="${trip._id}">X</button>
            </div>
          `
        }
        document.querySelector('#background').innerHTML +=`
          <div class="flex flex-row justify-between items-center w-2/3 h-20 bg-blue-950 m-0 text-white pl-20 pr-20 rounded-b-lg">
            <div id="total-price">
              Total : ${totalPrice}€
            </div>
            <button id="" class=" w-20 h-8 bg-[#50A791] text-white text-xs font-bold rounded">Purchase</button>
          </div>
        `
      }
    }
    // Call the function to delete a trip into the cart ⬆︎
    deleteTripOfcartEventListener();
  }
)
