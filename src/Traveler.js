import AllTravelers from "./AllTravelers";

class Traveler extends AllTravelers {
  constructor(id, allTravelerData, allTripsData, allDestinationsData) {
    super(allTravelerData, allTripsData, allDestinationsData);
    this.user = allTravelerData.find(traveler => traveler.id === id);
    this.trips = allTripsData.filter(trip => trip.userID === id);
    this.destinations = this.getDestinations(allDestinationsData);
  }

  getDestinations(data) {
    return data.reduce((acc, destination) => {
      this.trips.forEach(trip => {
        if (trip.destinationID === destination.id) {
          acc.push(destination);
        }
      })
      return acc;
    }, [])
  }
}

export default Traveler;
