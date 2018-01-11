const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('Posts Handler', () =>{
    let responseObject;
    let requestObject;
    let handler;

    let buildRender;
    let setStatus;

    let post;

    describe('get()', () => {
        beforeEach(() => {
            responseObject = {
                status: () => {},
                send: () => {},
                buildRender: () => {}
            };

            requestObject = {
                params: {
                    seoTitle: 'seo title'
                }
            };

            buildRender = sinon.spy(
                responseObject, 'buildRender');

            setStatus = sinon.spy(
                responseObject, 'status');

            handler = proxyquire('../../src/handlers/posts-handler', {
                '../services/posts-service': {
                    getPost: () => { return post; }
                }
            });
        });

        afterEach(() => {
            buildRender.reset();
        });

        describe('post found', () => {
            beforeEach(() => {
                post = { obj: 'Post!' }
            });

            it('should call buildRender() on the response object', async () => {
                await handler.get(requestObject, responseObject);

                assert(buildRender.calledOnce);
                assert(buildRender.calledWithMatch(
                    '../views/public/post/post.pug', {
                        post: post
                    }));
            });
        });

        describe('no post found', () => {
            beforeEach(() => {
               post = null;
            });

            it('should not call buildRender()', async () => {
                await handler.get(requestObject, responseObject);
                assert(buildRender.notCalled);
            });

           it('should return a 404', async () => {
               await handler.get(requestObject, responseObject);
               assert(setStatus.calledWith(404));
           });
        });
    });
});