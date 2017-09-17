const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('HomePage Handler', () =>{
    let responseObject;
    let handler;
    let buildRender;
    let allPosts;

    describe('get()', () => {
        beforeEach(() => {
            responseObject = {
                buildRender: () => { }
            };

            buildRender = sinon.spy(
                responseObject, 'buildRender');

            allPosts = {
                obj: 'All Posts'
            };

            handler = proxyquire('../../src/handlers/homepage-handler', {
                '../services/posts-service': {
                    getPosts: () => { return allPosts; },
                }
            });
        });

        afterEach(() => {
            buildRender.reset();
        });

        it('should call buildRender() on the response object', async () => {
            await handler.get(null, responseObject);

            assert(buildRender.calledOnce);
            assert(buildRender.calledWithMatch(
                '../views/public/home/home.pug', {
                latestPosts: allPosts
            }));
        });
    }) ;
});