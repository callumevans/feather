const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('Handler', () =>{
    describe('handle()', () => {

        let responseObject = {
            buildRender: () => { }
        };

        let buildRenderFunction = sinon.spy(
            responseObject, 'buildRender');

        let allPosts = {
            obj: 'All Posts' 
        };

        let handler = proxyquire('../../src/handlers/homepage-handler', {
            '../services/posts-service': {
                getPosts: () => { return allPosts; }
            }
        });

        afterEach(() => {
            buildRenderFunction.reset();
        });

        it('should call buildRender() on the response object', async () => {
            await handler.handle(null, responseObject, null);

            assert(buildRenderFunction.calledOnce);
            assert(buildRenderFunction.calledWithMatch(
                '../views/home/home.pug', {
                latestPosts: allPosts
            }));
        });
    }) ;
});