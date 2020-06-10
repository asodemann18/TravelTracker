const chai = require('chai');
import { expect } from 'chai';
import domUpdates from '../src/domUpdates';

const spies = require('chai-spies'); 
chai.use(spies)

describe('DOM Manipulation', function () {
  beforeEach(function() {
    global.document = {};
    chai.spy.on(document, "querySelector", () => {return global.document});
    chai.spy.on(document, "getElementById", () => {})
  });
  it('should call submitLogin', function() {
    domUpdates.submitLogin();
    expect(document.querySelector).to.have.been.called(1);
    expect(document.querySelector).to.have.been.called.with(".login-container");
    expect(document.getElementById).to.have.been.called(1);
    expect(document.getElementById).to.have.been.called.with("username");
  })
})