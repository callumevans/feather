const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('HomePage Handler', () =>{
    describe('get()', () => {

        let responseObject = {
            buildRender: () => { }
        };

        let nextFunction = () => {};

        let buildRenderFunction = sinon.spy(
            responseObject, 'buildRender');

        let allPosts = {
            obj: 'All Posts'
        };

        let handler = proxyquire('../../src/handlers/homepage-handler', {
            '../services/posts-service': {
                getPosts: () => { return allPosts; },
            }
        });

        afterEach(() => {
            buildRenderFunction.reset();
        });

        it('should call buildRender() on the response object', async () => {
            await handler.get(null, responseObject, nextFunction);

            assert(buildRenderFunction.calledOnce);
            assert(buildRenderFunction.calledWithMatch(
                '../views/public/home/home.pug', {
                latestPosts: allPosts
            }));
        });
    }) ;
});