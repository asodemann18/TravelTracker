import moment from 'moment'

const domUpdates = {
  submitLogin() {
    const login = document.querySelector('.login-container');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const traveler = document.querySelector('.traveler');
    const agency = document.querySelector('.agent');
    if (username === 'agency' && password === 'travel2020') {
      agency.classList.remove('hidden')
      login.classList.add('hidden')
      return 'agent' 
    } else if (username.includes('traveler') && 
              (username.split('traveler')[1] < 51 && username.split("traveler")[1] > 0) &&
               password === 'travel2020') {
      traveler.classList.remove('hidden')
      login.classList.add('hidden')
      return username
    } else {
      alert('Incorrect username or password');
    }
  },

  displayWelcome(theTraveler) {
    const welcome = document.querySelector('.welcome');
    return welcome.innerHTML = `Welcome ${theTraveler.user.name.split(" ")[0]}!`;
  },

  displayTravelersTrips(theTraveler) {
    const tripInfoSection = document.querySelector('.trip-info');
    const tripDetails = theTraveler.getTrips().sort((a,b) => moment(b.date) - moment(a.date));
    const formattedTripDetails = tripDetails.map(detail => this.getTripFormat(detail)).join('');
    console.log(formattedTripDetails)
    tripInfoSection.innerHTML = formattedTripDetails;
  },

  getTripFormat(data) {
    return `<section class="image-container">
              <h3>${data.destination}</h3>
              <p>
                Date: ${data.date}
                <br>
                Duration: ${data.duration}
                <br>
                Travelers: ${data.travelers}
                <br>
                Status: ${data.status}
              </p>
              <img src="https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80">
            </section>`;
  },

  displayTravelerCosts(theTraveler) {
    const costInfoSection = document.querySelector('.cost-info')
    const costDetails = theTraveler.calculateTotalCost();
    const formattedCostDetails = costDetails.map(detail => this.getCostFormat(detail)).join('');
    costInfoSection.innerHTML = formattedCostDetails;
  },

  getCostFormat(data) {
    return `<ul>
              <li>Lodging: $${data.lodgingCost}</li>
              <li>Flight: $${data.flightCost}</li>
              <li>Total: $${data.total}</li>
              <li>Fee: $${data.fee}</li>
            </ul>`;
  }
}

export default domUpdates;