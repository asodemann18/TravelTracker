import chai from 'chai';
const expect = chai.expect;
import AllTravelers from '../src/AllTravelers';
import travelerData from '../src/sampleData/traveler-data';
import tripsData from '../src/sampleData/trip-data';
import destinationData from '../src/sampleData/destination-data'
// import moment from 'moment';


describe('See if the tests are running', function() {
  let travelersInfo, travelers, tripsInfo, destinationInfo;

  beforeEach(function() {
    travelersInfo = travelerData;
    tripsInfo = tripsData;
    destinationInfo = destinationData;
    travelers = new AllTravelers(travelersInfo, tripsInfo, destinationInfo);
  })
  
  it('should be a function', () => {
    expect(AllTravelers).to.be.a('function')
  });

  it('should return new instance of AllTravelers', () => {
    expect(travelers).to.be.an.instanceOf(AllTravelers);
  });

  it('should take in every travelers\'s data', () => {
    expect(travelers.travelers.length).to.equal(6);
  });

  it('should take in all trip data', () => {
    expect(travelers.trips.length).to.equal(6);
  });

  it('should take in all destination data', () => {
    expect(travelers.destinations.length).to.equal(6);
  });

  it('should be undefined if no arguments are passed', () => {
   let travelers = new AllTravelers()
    expect(travelers.trips).to.equal(undefined)
  })

  it('should show travelers who have a status of pending with a trip date in the future', () => {
    const pendingTravelers = [
      {name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', status: 'pending'},
      {name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', status: 'pending'}
    ]
    expect(travelers.getPendingTrips()).to.deep.equal(pendingTravelers)
  })


  it('should still show travelers who have a status of pending with a trip date in the future even when an argument is passed', () => {
    const pendingTravelers = [
      {name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', status: 'pending'},
      {name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', status: 'pending'}
    ]
    expect(travelers.getPendingTrips('test')).to.deep.equal(pendingTravelers)
  })
});
