import moment from 'moment'

class AllTravelers {
  constructor(allTravelerData, allTripsData, allDestinationsData) {
    this.travelers = allTravelerData;
    this.trips = allTripsData;
    this.destinations = allDestinationsData;
  }

  getTrips(theStatus) {
    if (theStatus === 'pending') {
      return this.trips.filter(trip => trip.date >= moment().format('YYYY/MM/DD') && trip.status === 'pending').map(trip => {
        const tripsObj = {};
        tripsObj.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsObj.date = trip.date;
        tripsObj.duration = trip.duration;
        tripsObj.travelers = trip.travelers;
        tripsObj.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;
        tripsObj.status = trip.status
        return tripsObj
      })
    } else {
      return this.trips.map(trip => {
        const tripsObj = {};
        tripsObj.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsObj.date = trip.date;
        tripsObj.duration = trip.duration;
        tripsObj.travelers = trip.travelers;
        tripsObj.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;        
        tripsObj.status = trip.status;
        return tripsObj;
      })
    }
  }

  calculateIndividualCost() { //and status === approved
    return this.trips.map(trip => {
      const tripsObj = {};
      tripsObj.userID = trip.userID;
      tripsObj.date = trip.date;
      tripsObj.lodgingCost = trip.duration * this.destinations.find(dest => dest.id === trip.destinationID).estimatedLodgingCostPerDay;
      tripsObj.flightCost = trip.travelers * this.destinations.find(dest => dest.id === trip.destinationID).estimatedFlightCostPerPerson;
      tripsObj.total = tripsObj.lodgingCost + tripsObj.flightCost;
      tripsObj.fee = tripsObj.total * .10;
      return tripsObj;
    });
  }

  // calculateTotalCost() {
  //   const currentYearCost = this.trips.filter(trip => moment(trip.date, 'YYYY/MM/DD').format('YYYY') === moment().format('YYYY')).map(trip => {
  //     const tripsObj = {};
  //     tripsObj.lodgingCost = 0;
  //     tripsObj.flightCost = 0;
  //     tripsObj.total = 0; //lodging + flight
  //     tripsObj.fee = 0; // total*.10
  //   })
  //   //&& trip.status === 'approved')
  //   currentYearCost
  //   console.log(currentYearCost)
  //   return currentYearCost
  // }

}

// Total income generated this year (should be 10% of user trip cost)
//return array of object with:

//Userid
//date
//lodgingCost * days
//flightCost * Travelers
//total
//fee (10% of total)
//////////////////////////////
//filter for this year - trips
//calc destinations 
//find cost for every person in separate func travelCost - name and id
//

export default AllTravelers;
