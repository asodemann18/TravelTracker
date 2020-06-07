class ApiFetch {
  constructor() {
    this.rootUrl = "https://fe-apps.herokuapp.com/api/v1/travel-tracker/data";
  }

  getTravelersData() {
    let url = `${this.rootUrl}/travelers/travelers`
    return fetch(url).then(response => response.json())
  }

  getTripsData() {
    let url = `${this.rootUrl}/trips/trips`
    return fetch(url).then(response => response.json())
  }

  getDestinationsData() {
    let url = `${this.rootUrl}/destinations/destinations`
    return fetch(url).then(response => response.json())
  }

  postTripRequest(tripDetails) {
    let url = `${this.rootUrl}/trips/trips`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripDetails),
    })
      .then(response => console.log(response.json()))
      .catch(err => console.log(err.message));
  }
}
// https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips
export default ApiFetch;