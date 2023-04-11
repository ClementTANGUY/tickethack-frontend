document.querySelector('#search-btn').addEventListener('click', function() {
   let departureInput= document.querySelector('#departureInput').value;
   let arrivalInput= document.querySelector('#arrivalInput').value;
   let dateInput= document.querySelector('#trip-date').value;
   fetch(`http://localhost:3000/trips/`)
    .then(response => response.json())
		.then(data => {
      if (data) {
        for (const trip of data) {
          document.querySelector('#resultDiv').innerHTML =`
            <div class="flex flex-row justify-around items-center w-64 h-8 bg-[#C1CBD4]">
              <div>
                ${trip.departure} > ${trip.arrival}
              </div>
              <div>
                ${trip.date}
              </div>
              <div>
                ${trip.price}
              </div>
              <button id="btn-cart" class="w-12 h-4 bg-[#50A791] text-white rounded">Book</button>
            </div>
          `
        }
      }
    })
  })
