import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import travelerData from '../src/sampleData/traveler-data';
import tripsData from '../src/sampleData/trip-data';
import destinationData from '../src/sampleData/destination-data';

describe('Traveler', function() {
  let travelersInfo, traveler, tripsInfo, destinationInfo;

  beforeEach(function() {
    travelersInfo = travelerData;
    tripsInfo = tripsData;
    destinationInfo = destinationData;
    traveler = new Traveler(4,travelersInfo, tripsInfo, destinationInfo);
    
  })

  it('should be a function', () => {
    expect(Traveler).to.be.a('function')
  });

  it('should return new instance of Traveler', () => {
    expect(traveler).to.be.an.instanceOf(Traveler);
  });

  it('should throw an error if no arguments is passed as an argument', () => {
    expect(() => { new Traveler() }).to.throw(Error);
  })

  it('should hold individual user\'s information', () => {
    expect(traveler.user).to.deep.equal({ id: 4, name: 'Leila Thebeaud', travelerType: 'photographer' })
  })

  it('should hold individual user\'s trips', () => {
    const trip = [
      {
        id: 4,
        userID: 4,
        destinationID: 4,
        travelers: 2,
        date: '2020/02/25',
        duration: 10,
        status: 'approved',
        suggestedActivities: []
      }
    ]
    expect(traveler.trips).to.deep.equal(trip)
  })

  it('should get travelers destinations', () => {
    const destinations = [
      {
        id: 4,
        destination: 'Cartagena, Colombia',
        estimatedLodgingCostPerDay: 65,
        estimatedFlightCostPerPerson: 350,
        image: 'https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
        alt: 'boats at a dock during the day time'
      }
    ]
    expect(traveler.getDestinations(destinationInfo)).to.deep.equal(destinations);
  });

  it('should not return an error if no argument is passed', () => {
    expect(() => { traveler.getDestinations() }).to.throw(Error)
  }) 
})