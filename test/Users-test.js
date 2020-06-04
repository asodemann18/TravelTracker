import chai from 'chai';
import Users from '../src/User';
const expect = chai.expect;


describe('See if the tests are running', function() {
  
  it('should be a function', () => {
    expect(Users).to.be.a('function')
  });

  it('should return new instance of Hydration', () => {
    const users = new Users();
    expect(users).to.be.an.instanceOf(Users);
  });

  // it('should have a username property', () => {
  //   const Users = new Users();
  //   expect(Users.username).to.be.an.instanceOf(Users);
  // });
});
