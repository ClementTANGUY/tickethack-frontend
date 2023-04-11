



document.querySelector('#search-btn').addEventListener('click', function() {
   let departureInput= document.querySelector('#departureInput').value;
   let arrivalInput= document.querySelector('#arrivalInput').value;
   let dateInput= document.querySelector('#trip-date').value;
   fetch('http://localhost:3000/trips'
//    method:' GET'

    .then(response => response.json())
		.then(data => {
            if (data) {for (const trip of data) {
                document.querySelector('#resultDiv').innerHTML = 
                `<div>
                <div> ${trip.departure} > ${trip.arrival}</div>
                <div>${trip.date}</div>
                <div>${trip.price}</div>
                <button id="btn-cart">Cart</button>
                </div>`
            }}
   }))
}
)
