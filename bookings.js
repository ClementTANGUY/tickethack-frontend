//Get all trips booked when the page is loaded
fetch('http://localhost:3000/bookings/')
.then(response => response.json())
.then(data => {
    if (data.result) {
      if (data.booking.length === 0) {
        document.querySelector('#bookings-container').innerHTML =`
          <p class="text-center text-xl p-6">
            No tickets in your cart.<br/><br/>
            Why not to plan a trip?
          </p>
        `
      } else {
        document.querySelector('#bookings-container').innerHTML = '';
        document.querySelector('#bookings-container').innerHTML += `
        <div class="text-center">My bookings</div>
        `
        for (const booking of data.booking) {
          for (const trip of booking.trips) {
            let hours = new Date(trip.date).getUTCHours();
            hours < 10 ? hours = `0${hours}` : hours;
            let minutes = new Date(trip.date).getUTCMinutes();
            minutes < 10 ? minutes = `0${minutes}` : minutes;
            const now = new Date();
            let deadline = new Date(trip.date) - now;
            deadline = Math.round(Math.abs(deadline)/36e5);
            document.querySelector('#bookings-container').innerHTML +=`
              <div class="flex flex-row justify-around items-center w-9/12 h-12 bg-[#F2F3F4] m-0">
                <div class="text-xs">
                  ${trip.departure} > ${trip.arrival}
                </div>
                <div class="text-xs">
                  ${hours}:${minutes}
                </div>
                <div class="text-xs">
                  ${trip.price}€
                </div>
                <div class="text-xs">
                  Departure in ${deadline} hours
                </div>
              </div>
            `
          }
        }
        document.querySelector('#bookings-container').innerHTML +=`
          <div class="text-[#50A791] w-80 h-12 text-center border-t-2 p-2 m-2">
            Enjoy your travels with Tickethack!
          </div>
        `
      }
    }
  }
)
