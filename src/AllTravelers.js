import moment from 'moment'

class AllTravelers {
  constructor(allTravelerData, allTripsData, allDestinationsData) {
    this.travelers = allTravelerData;
    this.trips = allTripsData;
    this.destinations = allDestinationsData;
  }

  getPendingTrips(theStatus) {
    if (theStatus === 'pending') {
      let filteredTrips = this.trips.filter(trip => trip.date >= moment().format('YYYY/MM/DD') && trip.status === 'pending').map(trip => {
        let tripsObj = {};
        tripsObj.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsObj.date = trip.date;
        tripsObj.duration = trip.duration;
        tripsObj.travelers = trip.travelers;
        tripsObj.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;
        tripsObj.status = trip.status
        return tripsObj
      })
      return filteredTrips;
    } else {
      return this.trips.map(trip => {
        let tripsObj = {};
        tripsObj.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsObj.date = trip.date;
        tripsObj.duration = trip.duration;
        tripsObj.travelers = trip.travelers;
        tripsObj.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;        
        tripsObj.status = trip.status
        return tripsObj
      })
    }
  }
}

// Total income generated this year (should be 10% of user trip cost)
//return array of object with:
//lodgingCost total
//flightCost * Travelers
//total
//fee (10% of total)
//////////////////////////////
//filter for this year - trips
//calc destinations 

export default AllTravelers;
