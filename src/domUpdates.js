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
      return 'agent';
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

  displayWelcome(theTraveler) {
    const welcome = document.querySelector('.welcome');
    return welcome.innerHTML = `Welcome ${theTraveler.user.name.split(" ")[0]}!`;
  },

  displayTrips(location, travelerData, status, format) {
    const pageSection = document.querySelector(location);
    const formattedTripDetails = this.getTripInfo(travelerData, status, format);
    pageSection.innerHTML = formattedTripDetails;  
  },

  getTripInfo(theTraveler, theStatus, format) {
    const tripDetails = theTraveler.getTrips(theStatus).sort((a, b) => moment(b.date) - moment(a.date));
    const formattedTripDetails = tripDetails.map(detail => this[format](detail)).join('');
    return formattedTripDetails;
  },
  
  getAllTripsFormat(travelerData) {
    return `<section class="image-container">
              <h3>${travelerData.destination.toUpperCase()}</h3>
              <p>
                Name: ${travelerData.name}
                <br>
                Date: ${travelerData.date}
                <br>
                Duration: ${travelerData.duration}
                <br>
                Travelers: ${travelerData.travelers}
                <br>
                Status: ${travelerData.status}
                <button id=${travelerData.tripID}-approve class="approve">Approve</button>
                <button id=${travelerData.tripID}-delete class="delete">Delete</button>
              </p>
              <img src="${travelerData.image}" alt="${travelerData.alt}">
            </section>`;
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

  displayTotalRevenue(allTravelers) {
    const revenueSection = document.querySelector('.revenue');
    const revenueDetails = allTravelers.calculateTotalCost()[0].fee;
    revenueSection.innerHTML = `<h3>Revenue YTD</h3>
                                <h3 class="revenue-details">$${revenueDetails}</h3>`;
  },

  displayNewTripCost(theTraveler) {
    const travelerPage = document.querySelector('.traveler');
    const estimatedCost = document.querySelector('.estimated-cost');
    const destinationName = document.getElementById('trip-destinations').value;
    const destination = theTraveler.destinations.find(dest => dest.destination === destinationName)
    const lodgingCost = destination.estimatedLodgingCostPerDay
    const flightCost = destination.estimatedFlightCostPerPerson
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
    const destinations = allData.destinations;
    const destinationNames = destinations.map(dest => this.getDestinationListFormat(dest)).join(''); 
    destinationNameId.innerHTML = destinationNames;
  },

  getDestinationListFormat(data) {
    return `<option value="${data.destination}">`;
  },

  displayTodaysTravelers(allTravelers) {
    const testId = document.getElementById('table-body');
    const todaysTravelersDetails = allTravelers.getTodaysTravelers(moment().format('YYYY/MM/DD'))
    const formattedTodaysTravelersDetails = todaysTravelersDetails.map(detail => this.getTodaysTravelersFormat(detail)).join('');
    testId.insertAdjacentHTML("beforeend", formattedTodaysTravelersDetails);
  },

  getTodaysTravelersFormat(data) {
    return `<tr>
              <td>${data.name}</td>
              <td>${data.destination}</td>
              <td>${data.daysLeft}</td>
            </tr>`; 
  },

  displaySearchPage() {
    const searchPage = document.querySelector('.agent-search');
    const agentPage = document.querySelector('.agent');
    searchPage.classList.remove('hidden');
    agentPage.classList.add('hidden');
  }
}

export default domUpdates;