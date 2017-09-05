const chai = require('chai');
const expect = chai.expect;

const renderer = require('../../src/services/render-builder');

describe('Render Builder', () =>{
   describe('build()', () => {
       it('should append global variables to variable bag', () =>{
           let variableBag = {
               testVariable: 'testValue'
           };

           let result = renderer.buildVariables(variableBag);

           expect(result).to.deep.equal({
               testVariable: 'testValue',
               SITE_TITLE: 'MY SITE'
           });
       });
   }) ;
});