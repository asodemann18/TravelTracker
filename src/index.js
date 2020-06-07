// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

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
      const tripDestinations= document.getElementById('trip-destinations')
      tripDestinations.addEventListener('click', domUpdates.displayDestinationList(allTravelers)); 
      
      // domUpdates.displayTravelerCosts(traveler);
    })
    .catch(error => console.log(error.message));
}

const loginButton = document.getElementById('login-button')
loginButton.addEventListener('click', domUpdates.submitLogin); 
fetchData();

// const tripDestinations= document.getElementById('trip-destinations')
// tripDestinations.addEventListener('click', domUpdates.displayDestinationList(allTravelers)); 





