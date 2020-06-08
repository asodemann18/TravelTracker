import moment from 'moment'

const domUpdates = {
  submitLogin() {
    const login = document.querySelector('.login-container');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const traveler = document.querySelector('.traveler');
    const agency = document.querySelector('.agent');
    if (username === 'agency' && password === 'travel2020') {
      agency.classList.remove('hidden');
      login.classList.add('hidden');
      return 'agent' ;
    } else if (username.includes('traveler') && 
              (username.split('traveler')[1] < 51 && username.split("traveler")[1] > 0) &&
               password === 'travel2020') {
      traveler.classList.remove('hidden');
      login.classList.add('hidden');
      return username;
    } else {
      alert('Incorrect username or password');
    }
  },

  // getId() {
  //   const username = document.getElementById('username').value;
  //   console.log('getId', username.split('traveler')[1]);
  //   return username.split('traveler')[1]
  // },

  displayWelcome(theTraveler) {
    const welcome = document.querySelector('.welcome');
    return welcome.innerHTML = `Welcome ${theTraveler.user.name.split(" ")[0]}!`;
  },

  displayTravelersTrips(theTraveler) {
    const tripInfoSection = document.querySelector('.trip-info');
    const formattedTripDetails = this.getTripInfo(theTraveler);
    tripInfoSection.innerHTML = formattedTripDetails;    
  },
  
  displayAllTravelersTrips(allTravelers) {
    const agentInfoSection = document.querySelector('.agent-info')
    const formattedTripDetails = this.getTripInfo(allTravelers, 'pending');
    agentInfoSection.innerHTML = formattedTripDetails;  
  },

  getTripInfo(theTraveler, theStatus) {
    const tripDetails = theTraveler.getTrips(theStatus).sort((a,b) => moment(b.date) - moment(a.date));
    const formattedTripDetails = tripDetails.map(detail => this.getTripFormat(detail)).join('');
    return formattedTripDetails
  },

  
  getTripFormat(travelerData) {
    return `<section class="image-container">
              <h3>${travelerData.destination.toUpperCase()}</h3>
              <p>
                Date: ${travelerData.date}
                <br>
                Duration: ${travelerData.duration}
                <br>
                Travelers: ${travelerData.travelers}
                <br>
                Status: ${travelerData.status}
              </p>
              <img src="${travelerData.image}" alt="${travelerData.alt}">
            </section>`;
  },

  displayTravelerCosts(theTraveler) {
    const costInfoSection = document.querySelector('.cost-info')
    const costDetails = theTraveler.calculateTotalCost();
    const formattedCostDetails = costDetails.map(detail => this.getCostFormat('Total Spent YTD', detail)).join('');
    costInfoSection.innerHTML = formattedCostDetails;
  },

  displayNewTripCost(theTraveler) {
    const travelerPage = document.querySelector('.traveler');
    const estimatedCost = document.querySelector('.estimated-cost');
    const destinationName = document.getElementById('trip-destinations').value;
    const lodgingCost = theTraveler.destinations.find(dest => dest.destination === destinationName).estimatedLodgingCostPerDay
    const flightCost = theTraveler.destinations.find(dest => dest.destination === destinationName).estimatedFlightCostPerPerson
    const numTravelers = Number(document.getElementById('trip-travelers').value);
    const duration = Number(document.getElementById('trip-duration').value);
    const costDetails = {}
    costDetails.lodgingCost = lodgingCost * duration;
    costDetails.flightCost = flightCost * numTravelers;
    costDetails.subTotal = costDetails.lodgingCost + costDetails.flightCost;
    costDetails.fee = Math.round(costDetails.subTotal * .10);
    costDetails.total = costDetails.subTotal + costDetails.fee;
    const formattedCostDetails = this.getCostFormat('Estimated Cost', costDetails)
    estimatedCost.classList.remove('hidden')
    travelerPage.classList.add('overlay');
    estimatedCost.innerHTML = formattedCostDetails;
  },

  getCostFormat(title, data) {
    return `<h3>${title}</h3>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lodging:</td>
                  <td>$${data.lodgingCost}</td>
                </tr>
                <tr>
                  <td class="total-border">Flight:</td>
                  <td class="total-border">$${data.flightCost}</td>
                </tr>
                <tr>
                  <td>Sub Total:</td>
                  <td>$${data.subTotal}</td>
                </tr>
                <tr>
                  <td>Fee (10%):</td>
                  <td>$${data.fee}</td>
                </tr>
                <tr>
                  <td><b>Total:</b></td>
                  <td><b>$${data.total}</b></td>
                </tr>
              </tbody>
            </table>`;
  },

  displayDestinationList(allData) {
    const destinationNameId = document.getElementById('destination-name');
    const destinations = allData.destinations
    const destinationNames = destinations.map(dest => this.getDestinationListFormat(dest)).join(''); 
    destinationNameId.innerHTML = destinationNames;
  },

  getDestinationListFormat(data) {
    return `<option value="${data.destination}">`
  }
}

export default domUpdates;