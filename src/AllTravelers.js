import moment from 'moment'
import _ from 'lodash'
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
        tripsObj.status = trip.status;
        return tripsObj;
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

  calculateIndividualCost() {
    return this.trips.filter(trip => trip.status === 'approved').map(trip => {
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

  calculateTotalCost() {
    const allCosts = this.calculateIndividualCost();
    const currentYearCost = allCosts.filter(cost => moment(cost.date, 'YYYY/MM/DD').format('YYYY') === moment().format('YYYY'));
    const costInfoOnly = _.map(currentYearCost, _.partialRight(_.pick, ['lodgingCost', 'flightCost', 'total', 'fee',]));
    return [_.mergeWith({}, ..._.map(costInfoOnly), _.add)];
  }

  getTodaysTravelers(date) {
    if (date === moment(new Date(date)).format('YYYY/MM/DD')) {
      return this.trips.filter(trip => {
        const endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD')
        return trip.date === date || moment(date, 'YYYY/MM/DD').isBetween(trip.date, endDate)
      }).map(trip => {
        const tripsObj = {};
        const endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD')
        tripsObj.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsObj.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;
        tripsObj.daysLeft = moment(endDate, 'YYYY/MM/DD').diff(date, 'days')
        return tripsObj;
      })
    } else {
      return 'Please enter date in this format: "YYYY/MM/DD';
    }
  }
}

export default AllTravelers;
