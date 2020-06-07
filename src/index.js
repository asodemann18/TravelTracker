// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import moment from 'moment'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates';
import AllTravelers from './AllTravelers';
import Traveler from './Traveler';

let allTravelers;
let traveler;

const fetchData = () => {
  const api = new ApiFetch();
  const travelersData = api.getTravelersData()
  const tripsData = api.getTripsData()
  const destinationsData = api.getDestinationsData()
  
  Promise.all([travelersData, tripsData, destinationsData])
    .then(dataSet => dataSet = {
      travelersData: dataSet[0].travelers,
      tripsData: dataSet[1].trips,
      destinationsData: dataSet[2].destinations, 
    }).then(dataSet => {
      allTravelers = new AllTravelers(dataSet.travelersData, dataSet.tripsData, dataSet.destinationsData); 
      traveler = new Traveler(2, dataSet.travelersData, dataSet.tripsData, dataSet.destinationsData);
      domUpdates.displayWelcome(traveler);
      domUpdates.displayTravelersTrips(traveler);
      tripDestinations.addEventListener('click', domUpdates.displayDestinationList(allTravelers));     
      submitBtn.addEventListener('click', function() {
        postTrip(allTravelers)
      });
      domUpdates.displayTravelerCosts(traveler);
    })
    .catch(error => console.log(error.message));
}

const loginButton = document.getElementById('login-button')
const tripDestinations= document.getElementById('trip-destinations')
const submitBtn = document.getElementById('submit-btn');

loginButton.addEventListener('click', domUpdates.submitLogin); 

function postTrip(allTravelers) {
  const api = new ApiFetch();
  const form = document.querySelector('.trip-form');
  const username = document.getElementById('username').value;  
  const destinationName = document.getElementById('trip-destinations').value;
  const destinationID = allTravelers.destinations.find(dest => dest.destination === destinationName).id;
  const numTravelers = Number(document.getElementById('trip-travelers').value);
  const travelDate = moment(document.getElementById('trip-date').value).format('YYYY/MM/DD');
  const duration = Number(document.getElementById('trip-duration').value);
  const tripDetails = {
    "id": allTravelers.trips.length + 1,
    "userID": Number(username.split('traveler')[1]),
    "destinationID": destinationID,
    "travelers": numTravelers,
    "date": travelDate,
    "duration": duration,
    "status": "pending",
    "suggestedActivities": []
  }
  api.postTripRequest(tripDetails)
    .then(data => data)
    .catch(error => console.log(error));
  form.reset();
  // domUpdates.displayDestinationList(allTravelers);
}

fetchData();







