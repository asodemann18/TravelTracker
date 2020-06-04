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
}

export default ApiFetch;