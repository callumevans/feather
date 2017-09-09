const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;

const renderer = require('../../src/services/renderer');

describe('Renderer', () =>{
   describe('build()', () => {

       let response = {
           render: () => { }
       };

       let renderFunction = sinon.spy(response, 'render');
       let view = './views/test';

       afterEach(() => {
           renderFunction.reset();
       });

       it('should call res.render', () => {
           renderer.build(response, view, {});
           assert(renderFunction.calledOnce);
       });

       it('should populate variables passed into res.render', () => {
           renderer.build(response, view, {
               'test': 123
           });

           assert(renderFunction.calledWith(view, {
               'test': 123,
               SITE_TITLE: 'MY SITE'
           }));
       });

       it('should call with default object when null passed in to variables', () => {
           renderer.build(response, view, null);
           assert(renderFunction.calledWith(view, {
               SITE_TITLE: 'MY SITE'
           }));
       });

       it('should call with default object when undefined passed in to variables', () => {
           renderer.build(response, view, undefined);
           assert(renderFunction.calledWith(view, {
               SITE_TITLE: 'MY SITE'
           }));
       });

       it('should call with default object when nothing passed in to variables', () => {
           renderer.build(response, view);
           assert(renderFunction.calledWith(view, {
               SITE_TITLE: 'MY SITE'
           }));
       });
   }) ;
});