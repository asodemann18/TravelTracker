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
    const tripDetails = theTraveler.getTrips().sort((a,b) => moment(b.date) - moment(a.date));
    const formattedTripDetails = tripDetails.map(detail => this.getTripFormat(detail)).join('');
    tripInfoSection.innerHTML = formattedTripDetails;
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
    const formattedCostDetails = costDetails.map(detail => this.getCostFormat(detail)).join('');
    costInfoSection.innerHTML = formattedCostDetails;
  },

  getCostFormat(data) {
    return `<h3>Total Spent YTD</h3>
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
                  <td>Flight:</td>
                  <td>$${data.flightCost}</td>
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
                  <td>Total:</td>
                  <td>$${data.total}</td>
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