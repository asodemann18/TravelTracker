import chai from 'chai';
const expect = chai.expect;
import AllTravelers from '../src/AllTravelers';
import travelerData from '../src/sampleData/traveler-data';

describe('See if the tests are running', function() {
  let travelersInfo, travelers;

  beforeEach(function() {
    travelersInfo = travelerData;
    travelers = new AllTravelers(travelersInfo);
  })
  
  it('should be a function', () => {
    expect(AllTravelers).to.be.a('function')
  });

  it('should return new instance of AllTravelers', () => {
    expect(travelers).to.be.an.instanceOf(AllTravelers);
  });

  it('should take in every travelers\'s data', () => {
    expect(travelers.travelers.length).to.be.equal(6);
  });
});
