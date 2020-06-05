import moment from 'moment'

class AllTravelers {
  constructor(allTravelerData, allTripsData, allDestinationsData) {
    this.travelers = allTravelerData;
    this.trips = allTripsData;
    this.destinations = allDestinationsData;
  }

  getPendingTrips() {
    let filteredTrips = this.trips.filter(trip => trip.date >= moment().format('YYYY/MM/DD') && trip.status === 'pending').map(trip => {
      let trips = {};
      trips.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
      trips.date = trip.date;
      trips.duration = trip.duration;
      trips.travelers = trip.travelers;
      trips.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;
      trips.status = trip.status
      return trips
    })
    return filteredTrips;
  }

}

export default AllTravelers;

//New trip requests (a user’s “pending” trips)


//array of objects with:
//name = travelers
//date = trips - most recent date 
//duration = trips
//num travelers = trips
//destination = destinations  
//pending status = trips