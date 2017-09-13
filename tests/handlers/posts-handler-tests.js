const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('Posts Handler', () =>{
    describe('get()', () => {

        let responseObject = {
            status: () => {},
            send: () => {},
            buildRender: () => {}
        };

        let requestObject = {
            params: {
                seoTitle: 'seo title'
            }
        };

        let nextFunction = () => {};

        let buildRenderFunction = sinon.spy(
            responseObject, 'buildRender');

        let setStatusFunction = sinon.spy(
            responseObject, 'status');

        let post;

        let handler = proxyquire('../../src/handlers/post-handler', {
            '../services/posts-service': {
                getPost: () => { return post; }
            }
        });

        afterEach(() => {
            buildRenderFunction.reset();
        });

        describe('post found', () => {
            it('should call buildRender() on the response object', async () => {
                post = { obj: 'A post' };

                await handler.get(requestObject, responseObject, nextFunction);

                assert(buildRenderFunction.calledOnce);
                assert(buildRenderFunction.calledWithMatch(
                    '../views/public/post/post.pug', {
                        post: post
                    }));
            });
        });

        describe('no post found', () => {
            it('should not call buildRender()', async () => {
                post = null;
                await handler.get(requestObject, responseObject, nextFunction);
                assert(buildRenderFunction.notCalled);
            });

           it('should return a 404', async () => {
               post = null;
               await handler.get(requestObject, responseObject, nextFunction);
               assert(setStatusFunction.calledWith(404));
           });
        });
    });
});