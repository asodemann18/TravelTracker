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
      const filteredTrips = this.trips.filter(trip => trip.date >= moment().format('YYYY/MM/DD') && trip.status === 'pending')
      return this.getTripDetailsFormat(filteredTrips);
    } else {
      return this.getTripDetailsFormat(this.trips);
    }
  }

  getTripDetailsFormat(data) {
    return data.map(trip => {
      const destination = this.destinations.find(dest => dest.id === trip.destinationID)
      const tripsDetails = {};
      tripsDetails.tripID = trip.id;
      tripsDetails.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
      tripsDetails.date = trip.date;
      tripsDetails.duration = trip.duration;
      tripsDetails.travelers = trip.travelers;
      tripsDetails.destination = destination.destination;
      tripsDetails.image = destination.image;
      tripsDetails.alt = destination.alt;
      tripsDetails.status = trip.status;
      return tripsDetails;
    })
  }

  calculateTravelerCost() {
    return this.trips.filter(trip => trip.date <= moment().format('YYYY/MM/DD') && trip.status === 'approved').map(trip => {
      const destination = this.destinations.find(dest => dest.id === trip.destinationID)
      const tripsDetails = {};
      tripsDetails.userID = trip.userID;
      tripsDetails.date = trip.date;
      tripsDetails.lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
      tripsDetails.flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
      tripsDetails.subTotal = tripsDetails.lodgingCost + tripsDetails.flightCost;
      tripsDetails.fee = Math.round(tripsDetails.subTotal * .10);
      tripsDetails.total = tripsDetails.subTotal + tripsDetails.fee;
      return tripsDetails;
    });
  }

  calculateTotalCost() {
    const allCosts = this.calculateTravelerCost();
    const currentYearCost = allCosts.filter(cost => moment(cost.date, 'YYYY/MM/DD').format('YYYY') === moment().format('YYYY'));
    const costInfoOnly = _.map(currentYearCost, _.partialRight(_.pick, ['lodgingCost', 'flightCost', 'subTotal', 'fee', 'total']));
    return [_.mergeWith({}, ..._.map(costInfoOnly), _.add)];
  }

  getTodaysTravelers(date) {
    if (date === moment(new Date(date)).format('YYYY/MM/DD')) {
      return this.trips.filter(trip => {
        const endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD')
        return trip.date === date || moment(date, 'YYYY/MM/DD').isBetween(trip.date, endDate)
      }).map(trip => {
        const tripsDetails = {};
        const endDate = moment(trip.date, 'YYYY/MM/DD').add(trip.duration, 'days').format('YYYY/MM/DD')
        tripsDetails.name = this.travelers.find(traveler => traveler.id === trip.userID).name;
        tripsDetails.destination = this.destinations.find(dest => dest.id === trip.destinationID).destination;
        tripsDetails.daysLeft = moment(endDate, 'YYYY/MM/DD').diff(date, 'days')
        return tripsDetails;
      })
    } else {
      return 'Please enter date in this format: "YYYY/MM/DD';
    }
  }
}

export default AllTravelers;
