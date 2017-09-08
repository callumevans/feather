const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const homepageHandler = require('../../src/handlers/homepage-handler');

describe('Handler', () =>{
    describe('handle()', () => {

        let responseObject = {
            buildRender: () => { }
        };

        let buildRenderFunction = sinon.spy(responseObject, 'buildRender');
        let view = './views/test';

        afterEach(() => {
            buildRenderFunction.reset();
        });

        it('should call response object\'s buildRender() function', () => {
            homepageHandler.handle(null, responseObject, null);
            assert(buildRenderFunction.calledOnce);
        });
    }) ;
});