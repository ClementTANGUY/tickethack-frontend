// Call this function when add a trip in cart
function addTripTocartEventListener() {
  for (let i = 0; i < document.querySelectorAll(".addToCart").length; i++) {
    document.querySelectorAll(".addToCart")[i].addEventListener("click", function () {
      const tripId = this.id;
        fetch('http://localhost:3000/carts/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tripId }),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            window.location.assign("cart.html");
          }
        });
    });
  }
}
// Set the minimum value of departure to today
document.querySelector("#trip-date").min = new Date().toISOString().split("T")[0];

// Get all trips by  departure, arrival & date filled in input
document.querySelector("#search-btn").addEventListener("click", function () {
  const departure = document.querySelector("#departureInput").value;
  const arrival = document.querySelector("#arrivalInput").value;
  const date = document.querySelector("#trip-date").value;
  fetch("http://localhost:3000/trips/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ departure, arrival, date }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.trips.length !== 0) {
        document.querySelector("#resultDiv").innerHTML = "";
        for (const trip of data.trips) {
          let hours = new Date(trip.date).getUTCHours();
          hours < 10 ? hours = `0${hours}` : hours;
          let minutes = new Date(trip.date).getUTCMinutes();
          minutes < 10 ? minutes = `0${minutes}` : minutes;
          document.querySelector("#resultDiv").innerHTML += `
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
        // Call the function to add a trip into the cart ⬆︎
        addTripTocartEventListener();

      } else {
        document.querySelector("#resultDiv").innerHTML = `
        <div id="Not found img">
          <img src="/images/notfound.png" alt="Train" class="h-24 w-24">
        </div>
        <div id="hook" class=" h-1/4 border-[#50A791] border-solid border-t-2 p-8">
          <p>No Trip found</p>
        </div>
        `
      }
    });
  document.querySelector("#departureInput").value = "";
  document.querySelector("#arrivalInput").value = "";
  document.querySelector("#trip-date").value = "";
});
