import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import travelerData from '../src/sampleData/traveler-data';
import tripsData from '../src/sampleData/trip-data';
import destinationData from '../src/sampleData/destination-data';

describe.only('Traveler', function() {
  let travelersInfo, traveler, tripsInfo, destinationInfo;

  beforeEach(function() {
    travelersInfo = travelerData;
    tripsInfo = tripsData;
    destinationInfo = destinationData;
    traveler = new Traveler(2,travelersInfo, tripsInfo, destinationInfo);
    
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should return new instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should get travelers destinations', () => {
    const destinations = [
      {
        id: 2,
        destination: 'Stockholm, Sweden',
        estimatedLodgingCostPerDay: 100,
        estimatedFlightCostPerPerson: 780,
        image: 'https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
        alt: 'city with boats on the water during the day time'
      }
    ]

    expect(traveler.getDestinations(destinationInfo)).to.deep.equal(destinations);
  });

  it('should not return an error if no argument is passed', () => {
    expect(() => { traveler.getDestinations() }).to.throw(Error)
  }) 
})