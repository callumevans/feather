const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const proxyquire = require('proxyquire').noCallThru();

describe('Login Handler', () =>{
    let requestObject;
    let responseObject;
    let handler;

    let authService;
    let userService;

    let buildRender;
    let setStatus;
    let sendResponse;
    let generateToken;

    let userResult;
    let passwordValidResult;
    let tokenResult;
    let allPosts;

    beforeEach(() => {
        authService = {
            verifyPassword: () => { return passwordValidResult },
            generateToken: () => { return tokenResult }
        };

        userService = {
            getUser: () => { return userResult }
        };

        userResult = {};
        passwordValidResult = true;
        tokenResult = 'token';

        requestObject = {
            body: {
                email: 'test',
                password: 'password'
            }
        };

        responseObject = {
            buildRender: () => {},
            status: () => {},
            send: () => {}
        };

        buildRender = sinon.spy(
            responseObject, 'buildRender');

        setStatus = sinon.spy(
            responseObject, 'status');

        sendResponse = sinon.spy(
            responseObject, 'send');

        generateToken = sinon.spy(
            authService, 'generateToken');

        allPosts = {
            obj: 'All Posts'
        };

        handler = proxyquire('../../src/handlers/public/login-handler', {
            '../../services/auth-service': authService,
            '../../services/user-service': userService
        });
    });

    afterEach(() => {
        buildRender.reset();
    });

    describe('get()', () => {
        it('should call buildRender() on the response object', () => {
            handler.get(null, responseObject);

            assert(buildRender.calledOnce);
            assert(buildRender.calledWithMatch(
                '../../views/admin/login/login.pug'));
        });
    }) ;

    describe('post()', () => {
        describe('when no email provided', () => {
            beforeEach(() => {
                requestObject = {
                    body: {
                        email: null,
                        password: '123'
                    }
                }
            });

            it('should return a 400', async () => {
                await handler.post(requestObject, responseObject);
                assert(setStatus.calledWith(400));
            });
        });

        describe('when no passowrd provided', () => {
            beforeEach(() => {
                requestObject = {
                    body: {
                        email: 'test',
                        password: null
                    }
                }
            });

            it('should return a 400', async () => {
                await handler.post(requestObject, responseObject);
                assert(setStatus.calledWith(400));
            });
        });

        describe('when user is not found', () => {
            beforeEach(() => {
                userResult = null;
            });

            it('should return a 400', async () => {
                await handler.post(requestObject, responseObject);
                assert(setStatus.calledWith(400));
            });
        });

        describe('when password is', () => {
            describe('incorrect', () => {
                beforeEach(() => {
                    passwordValidResult = false;
                });

                it('should return a 400', async () => {
                    await handler.post(requestObject, responseObject);
                    assert(setStatus.calledWith(400));
                });
            });

            describe('correct', () => {
                beforeEach(() => {
                    passwordValidResult = true;
                });

                it('should generate a token', async () => {
                    await handler.post(requestObject, responseObject);
                    assert(generateToken.calledWith({
                        email: requestObject.body.email
                    }));
                });

                it('should return the generated token', async () => {
                    await handler.post(requestObject, responseObject);
                    assert(sendResponse.calledWith(tokenResult));
                });
            });
        });
    });
});