function addTocartEventListener() {
	for (let i = 0; i < document.querySelectorAll('.addToCart').length; i++) {
		document.querySelectorAll('.addToCart')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/trips/${this.id}`)
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
          `
        window.location.assign('pageCart.html');
				}
			});
		});
	}
}

document.querySelector('#search-btn').addEventListener('click', function() {
   const departure = document.querySelector('#departureInput').value;
   const arrival = document.querySelector('#arrivalInput').value;
   const date = document.querySelector('#trip-date').value;
   fetch('http://localhost:3000/trips/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ departure, arrival, date }),
	  })
    .then(response => response.json())
		.then(data => {
      if (data.trips.length !== 0) {
        document.querySelector('#resultDiv').innerHTML = '';
        for (const trip of data.trips) {
          const hours = new Date(trip.date).getUTCHours();
          const minutes = new Date(trip.date).getUTCMinutes();
          document.querySelector('#resultDiv').innerHTML +=`
            <div class="flex flex-row justify-between items-center w-64 h-12 bg-[#F2F3F4] m-1">
              <div class="text-xs">
                ${trip.departure} > ${trip.arrival}
              </div>
              <div class="text-xs">
                ${hours}:${minutes}
              </div>
              <div class="text-xs">
                ${trip.price}€
              </div>
              <button class="addToCart w-10 h-6 bg-[#50A791] text-white text-xs font-bold rounded" id="${trip._id}">Book</button>
            </div>
          `
        }
      } else {
        document.querySelector('#resultDiv').innerHTML =`
          <div id="Not found img">
            <img src="/images/notfound.png" alt="Train" class="h-24 w-24">
          </div>
          <div id="hook" class=" h-1/4 border-[#50A791] border-solid border-t-2 p-8">
          <p>No Trip found</p>
          </div>
        `
      }
    })
    addTocartEventListener();
    document.querySelector('#departureInput').value ='';
    document.querySelector('#arrivalInput').value = '';
    document.querySelector('#trip-date').value ='';
  })
