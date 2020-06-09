import chai from 'chai';
const expect = chai.expect;
import AllTravelers from '../src/AllTravelers';
import travelerData from '../src/sampleData/traveler-data';
import tripsData from '../src/sampleData/trip-data';
import destinationData from '../src/sampleData/destination-data';

describe('AllTravelers', function() {
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

  it('should show all travelers with the correct info display', () => {
    const allTravelersInfo = [
      {tripID: 1, name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', image: destinationInfo[5].image, alt: destinationInfo[5].alt, status: 'pending'},
      {tripID: 2, name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', image: destinationInfo[1].image, alt: destinationInfo[1].alt, status: 'pending'},
      {tripID: 3, name: 'Sibby Dawidowitsch', date: '2020/05/22', duration: 17, travelers: 4, destination: 'Sydney, Austrailia', image: destinationInfo[2].image, alt: destinationInfo[2].alt, status: 'pending'},
      {tripID: 4, name: 'Leila Thebeaud', date: '2020/02/25', duration: 10, travelers: 2, destination: 'Cartagena, Colombia', image: destinationInfo[3].image, alt: destinationInfo[3].alt, status: 'approved'},
      {tripID: 5, name: 'Tiffy Grout', date: '2020/04/30', duration: 18, travelers: 3, destination: 'Madrid, Spain', image: destinationInfo[4].image, alt: destinationInfo[4].alt, status: 'approved'},
      {tripID: 6, name: 'Laverna Flawith', date: '2020/06/29', duration: 9, travelers: 3, destination: 'Lima, Peru', image: destinationInfo[0].image, alt: destinationInfo[0].alt, status: 'approved'}
    ]
    expect(travelers.getTripDetailsFormat(travelers.trips)).to.deep.equal(allTravelersInfo)
  })

  it('should return an error if no argument is passed', () => {
    expect(() => travelers.getTripDetailsFormat()).to.throw(Error);

  })

  it('should show travelers who have a status of pending with a trip date in the future', () => {
    const pendingTravelers = [
      {tripID: 1, name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', image: destinationInfo[5].image, alt: destinationInfo[5].alt, status: 'pending'},
      {tripID: 2, name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', image: destinationInfo[1].image, alt: destinationInfo[1].alt, status: 'pending'}
    ]
    expect(travelers.getTrips('pending')).to.deep.equal(pendingTravelers)
  })


  it('should show ALL travelers trip info when no argument is passed', () => {
    const allTravelersInfo = [
      {tripID: 1, name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', image: destinationInfo[5].image, alt: destinationInfo[5].alt, status: 'pending'},
      {tripID: 2, name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', image: destinationInfo[1].image, alt: destinationInfo[1].alt, status: 'pending'},
      {tripID: 3, name: 'Sibby Dawidowitsch', date: '2020/05/22', duration: 17, travelers: 4, destination: 'Sydney, Austrailia', image: destinationInfo[2].image, alt: destinationInfo[2].alt, status: 'pending'},
      {tripID: 4, name: 'Leila Thebeaud', date: '2020/02/25', duration: 10, travelers: 2, destination: 'Cartagena, Colombia', image: destinationInfo[3].image, alt: destinationInfo[3].alt, status: 'approved'},
      {tripID: 5, name: 'Tiffy Grout', date: '2020/04/30', duration: 18, travelers: 3, destination: 'Madrid, Spain', image: destinationInfo[4].image, alt: destinationInfo[4].alt, status: 'approved'},
      {tripID: 6, name: 'Laverna Flawith', date: '2020/06/29', duration: 9, travelers: 3, destination: 'Lima, Peru', image: destinationInfo[0].image, alt: destinationInfo[0].alt, status: 'approved'}
    ]
    expect(travelers.getTrips()).to.deep.equal(allTravelersInfo)
  })

  it('should show ALL travelers trip info when argument passed is not "pending', () => {
    const allTravelersInfo = [
      {tripID: 1, name: 'Ham Leadbeater', date: '2020/08/04', duration: 8, travelers: 1, destination: 'Jakarta, Indonesia', image: destinationInfo[5].image, alt: destinationInfo[5].alt, status: 'pending'},
      {tripID: 2, name: 'Rachael Vaughten', date: '2020/10/04', duration: 18, travelers: 5, destination: 'Stockholm, Sweden', image: destinationInfo[1].image, alt: destinationInfo[1].alt, status: 'pending'},
      {tripID: 3, name: 'Sibby Dawidowitsch', date: '2020/05/22', duration: 17, travelers: 4, destination: 'Sydney, Austrailia', image: destinationInfo[2].image, alt: destinationInfo[2].alt, status: 'pending'},
      {tripID: 4, name: 'Leila Thebeaud', date: '2020/02/25', duration: 10, travelers: 2, destination: 'Cartagena, Colombia', image: destinationInfo[3].image, alt: destinationInfo[3].alt, status: 'approved'},
      {tripID: 5, name: 'Tiffy Grout', date: '2020/04/30', duration: 18, travelers: 3, destination: 'Madrid, Spain', image: destinationInfo[4].image, alt: destinationInfo[4].alt, status: 'approved'},
      {tripID: 6, name: 'Laverna Flawith', date: '2020/06/29', duration: 9, travelers: 3, destination: 'Lima, Peru', image: destinationInfo[0].image, alt: destinationInfo[0].alt, status: 'approved'}
    ]
    expect(travelers.getTrips('xyz')).to.deep.equal(allTravelersInfo)
  })

  it('should calculate cost of each trip for each traveler', () => {
    const individualTravelCosts = [
      {
        userID: 4,
        date: '2020/02/25',
        lodgingCost: 650,
        flightCost: 700,
        subTotal: 1350,
        fee: 135, 
        total: 1485
      },
      {
        userID: 5,
        date: '2020/04/30',
        lodgingCost: 2700,
        flightCost: 1950,
        subTotal: 4650,
        fee: 465,
        total: 5115
      }
    ]
    expect(travelers.calculateTravelerCost()).to.deep.equal(individualTravelCosts)
   })

   it('should calculate cost of each trip for each traveler even when an argument is passed', () => {
    expect(travelers.calculateTravelerCost('test').length).to.equal(2);
   })

  it('should calculate costs/revenue for the current year', () => {
    const travelCosts = [{
      lodgingCost: 3350,
      flightCost: 2650,
      subTotal: 6000,
      fee: 600,
      total: 6600
    }]
    expect(travelers.calculateTotalCost()).to.deep.equal(travelCosts)
   })

   it('should calculate cost of lodging for the current year even when an argument is passed', () => {
    const travelCosts = [{
      lodgingCost: 3350,
      flightCost: 2650,
      subTotal: 6000,
      fee: 600,
      total: 6600
    }]
    expect(travelers.calculateTotalCost(123)).to.deep.equal(travelCosts)
   })

   it('should show travelers who are traveling on a certain date', () => {
    const traveler = [{
      name:'Ham Leadbeater',
      destination: 'Jakarta, Indonesia',
      daysLeft: 8
    }]
    expect(travelers.getTodaysTravelers('2020/08/04')).to.deep.equal(traveler)
   })

   it('should show travelers who are traveling on a certain date if their trip date falls during the date argument', () => {
    const traveler = [{
      name:'Ham Leadbeater',
      destination: 'Jakarta, Indonesia',
      daysLeft: 4
    }]
    expect(travelers.getTodaysTravelers('2020/08/08')).to.deep.equal(traveler)
   })

   it('should show an error message if no date argument is passed', () => {
    expect(travelers.getTodaysTravelers('test')).to.deep.equal('Please enter date in this format: "YYYY/MM/DD')
   })

   it('should show an error message if date is passed in the incorrect format', () => {
    expect(travelers.getTodaysTravelers('08-08-2020')).to.deep.equal('Please enter date in this format: "YYYY/MM/DD')
   })
});
