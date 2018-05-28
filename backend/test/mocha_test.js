/**
 * New node file
 */
const request = require('request');
const express = require('express');
const assert = require("assert");
const http = require("http");


/*       ///////////////////////////
            POSITIVE TEST CASES
**/      ///////////////////////////


describe('http test', function() {

    it('should give parameters', function(done) {
        request.get('http://localhost:3000/', 
        function(error, response, body) {
            // console.log(response.statusCode);
            // console.log(response.body);
            assert.equal(200, response.statusCode);
            console.log(response.body)
            assert.equal('{"dataparameters":["Name","DOB","Selfie"]}', response.body);
            done();
        });
    });
});


describe('http test', function () {

    it('should give details', function (done){
        request.get('http://localhost:3000/getdetails/?merchantId=testmerchant',
            function(error, response, body) {
                // console.log(response.body);
                assert.equal(200, response.statusCode);
                done();
            }
        )
    })
})


/*       ///////////////////////////
            NEGATIVE TEST CASES
**/      ///////////////////////////


describe('http test', function () {

    it('should give details', function (done){
        request.get('http://localhost:3000/fakeurl/',
            function(error, response, body) {
                console.log(response.statusCode);
                assert.equal(404, response.statusCode);
                done();
            }
        )
    })
})


describe('http test', function() {

    it('should give bad request status', function(done) {
        request.get('http://localhost:3000/getdetails?', 
        function(error, response, body) {
            console.log(response.statusCode);
            assert.equal(400, response.statusCode);
            done();
        });
    });
});


describe('http test', function () {

    it('should give merchnat not found', function (done){
        request.get('http://localhost:3000/getdetails/?merchantId=fakemerchantId',
            function(error, response, body) {
                console.log(response.statusCode);
                assert.equal(404, response.statusCode);
                done();
            }
        )
    })
})

