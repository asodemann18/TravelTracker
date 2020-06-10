const chai = require('chai');
import { expect } from 'chai';
import domUpdates from '../src/domUpdates';

const spies = require('chai-spies'); 
chai.use(spies)

describe('DOM Manipulation', function () {
  beforeEach(function() {
    global.document = {};
    chai.spy.on(document, "querySelector", () => {
      return {
        classList: {
          add: () => {},
          remove: () => {}
        },
      };
    });
  });

  it('should be an object', () => {
    expect(domUpdates).to.be.an('object');
  });

  it('should spy on querySelector functions being called on the document', () => {
    domUpdates.displaySearchPage();
    expect(document.querySelector).to.have.been.called(2);
    expect(document.querySelector).to.have.been.called.with(".agent-search");
    expect(document.querySelector).to.have.been.called.with(".agent");
  });
})