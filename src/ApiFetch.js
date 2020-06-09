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
      .then(response => response.json())
      .catch(err => console.log(err.message));
  }

  postApproveRequest(tripDetails) {
    let url = `${this.rootUrl}/trips/updateTrip`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tripDetails),
    })
      .then(response => response.json())
      .catch(err => console.log(err.message));
  }
}
export default ApiFetch;