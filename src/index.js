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
      getDynamicUser(dataSet);
    })
    .catch(error => console.log(error.message));
}

function getId() {
  const username = document.getElementById('username').value;
  if (username.includes('traveler')) {
    const travelerID = Number(username.split('traveler')[1]);
    return Number(travelerID);
  }
}

function getDynamicUser(dataSet) {
  const loginButton = document.getElementById('login-button')
  loginButton.addEventListener('click', function() {
    domUpdates.submitLogin();
    const travelID = getId()
    console.log(travelID)
    if (travelID === undefined) {
      allTravelers = new AllTravelers(dataSet.travelersData, dataSet.tripsData, dataSet.destinationsData); 
      agentPage(allTravelers);
    } else { 
      allTravelers = new AllTravelers(dataSet.travelersData, dataSet.tripsData, dataSet.destinationsData); 
      traveler = new Traveler(travelID, dataSet.travelersData, dataSet.tripsData, dataSet.destinationsData);
      travelerPage(traveler, allTravelers);
    }
  })
}

function travelerPage(traveler, allTravelers) {
  const tripDestinations = document.getElementById('trip-destinations');
  const submitBtn = document.getElementById('submit-btn');
  const costBtn = document.getElementById('cost-btn');
  const travelerDisplay = document.querySelector('.traveler');
  const estimatedCost = document.querySelector('.estimated-cost')
  if (travelerDisplay) {
    domUpdates.displayWelcome(traveler);
    domUpdates.displayTrips('.trip-info', traveler, "", 'getTripFormat');
    tripDestinations.addEventListener('click', domUpdates.displayDestinationList(allTravelers));     
    submitBtn.addEventListener('click', function() {
      postTrip(allTravelers, traveler);
    });
    costBtn.addEventListener('click', function() {
      domUpdates.displayNewTripCost(traveler);
      document.addEventListener('click', function(event) {
        const eventParent = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('overlay')
        const travelerSection = document.querySelector('.traveler')
        if (!eventParent) {
          estimatedCost.classList.add('hidden');
          travelerSection.classList.remove('overlay');
        } 
      })
    });
    domUpdates.displayTravelerCosts(traveler);
  } 
}

function agentPage(allTravelers) {
  const agentDisplay = document.querySelector('.agent');
  const searchButton = document.querySelector('.search-btn');
  if (agentDisplay) {
    domUpdates.displayTrips('.agent-info', allTravelers, 'pending', 'getAllTripsFormat');
    domUpdates.displayTotalRevenue(allTravelers);  
    domUpdates.displayTodaysTravelers(allTravelers);
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('approve')) {
        postApproveTrip(event);
        event.target.parentNode.parentNode.classList.add('hidden');
      } else if (event.target.classList.contains('delete')) {
        deleteTrip(event);
        event.target.parentNode.parentNode.classList.add('hidden');
      }
    });
    searchButton.addEventListener('click', domUpdates.displaySearchPage);
  } 
}

function postTrip(allTravelers, traveler) {
  const api = new ApiFetch();
  const form = document.querySelector('.trip-form');
  const tripDetails = postTripFormat(allTravelers);
  api.postTripRequest(tripDetails)
    .then(data => traveler.trips.push(data.newResource))
    .then(() => domUpdates.displayTrips('.trip-info', traveler, "", 'getTripFormat'))
    .then(() => form.reset())
    .catch(error => console.log(error));
}

function postTripFormat(allTravelers) {
  const username = document.getElementById('username').value;  
  let destinationName = document.getElementById('trip-destinations').value;
  const destinationID = allTravelers.destinations.find(dest => dest.destination === destinationName).id;
  const numTravelers = Number(document.getElementById('trip-travelers').value);
  const travelDate = moment(document.getElementById('trip-date').value).format('YYYY/MM/DD');
  const duration = Number(document.getElementById('trip-duration').value);
  return {
    "id": Date.now(),
    "userID": Number(username.split('traveler')[1]),
    "destinationID": destinationID,
    "travelers": numTravelers,
    "date": travelDate,
    "duration": duration,
    "status": "pending",
    "suggestedActivities": []
  }
}

function postApproveTrip(event) {
  const api = new ApiFetch();
  const tripID = Number(event.target.closest(".approve").id.split("-")[0])
  const approvedTripDetails = {
    "id": tripID,
    "status": "approved"
  }
  api.postApproveRequest(approvedTripDetails)
    .then(data => data)
    .catch(error => console.log(error))
}

function deleteTrip(event) {
  const api = new ApiFetch();
  const tripID = Number(event.target.closest(".delete").id.split("-")[0])
  const deleteTripDetails = {"id": tripID}
  api.deleteRequest(deleteTripDetails)
    .then(data => data)
    .catch(error => console.log(error))
}

fetchData();







