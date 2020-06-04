// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import ApiFetch from './ApiFetch';
import domUpdates from './domUpdates';

// let users;

const fetchData = () => {
  let api = new ApiFetch();
  let travelersData = api.getTravelersData()
  let tripsData = api.getTripsData()
  let destinationsData = api.getDestinationsData()
  
  Promise.all([travelersData, tripsData, destinationsData])
    .then(dataSet => dataSet = {
      travelersData: dataSet[0].travelers,
      tripsData: dataSet[1].trips,
      destinationsData: dataSet[2].destinations, 
    }).then(dataSet => {
      let users = dataSet.travelersData.map(traveler => traveler.id)
      console.log(users)
    })
    .catch(error => console.log(error.message))
}



let loginButton = document.getElementById('login-button')

loginButton.addEventListener('click', domUpdates.submitLogin);

fetchData();



