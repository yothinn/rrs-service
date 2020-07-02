'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    RrsCustomer = mongoose.model('RrsCustomer');

var credentials,
    token,
    mockup;

describe('RrsCustomer CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            title: 'นาย',
            firstName: 'ธรรมธุรกิจ',
            lastName: 'วิสาหกิจเพื่อสังคม',
            displayName: 'ธรรมธุรกิจ วิสาหกิจเพื่อสังคม',
            contactAddress: {
                addressLine1: '194 ซ.พระราม 9 ที่ 17',
                addressStreet: 'ถ.พระราม 9',
                addressSubDistrict: 'ห้วยขวาง',
                addressDistrict: 'บางกะปิ',
                addressProvince: 'กรุงเทพมหานคร',
                addressPostalCode: '10310',
                latitude: '13.0100',
                logitude: '100.1234',
            },
            mobileNo: '0921234567',
            email: 'thamturakit@gmail.com',
            lineUserID: 'th0123456789',
            memberID: 'tham001/0001'
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be RrsCustomer get use token', (done)=>{
        request(app)
        .get('/api/rrscustomers')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be RrsCustomer get by id', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/rrscustomers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.title, mockup.title);
                        assert.equal(resp.data.firstName, mockup.firstName);
                        assert.equal(resp.data.lastName, mockup.lastName);
                        assert.equal(resp.data.displayName, mockup.displayName);
                        assert.equal(resp.data.contactAddress.addressLine1, mockup.contactAddress.addressLine1);
                        assert.equal(resp.data.contactAddress.addressStreet, mockup.contactAddress.addressStreet);
                        assert.equal(resp.data.contactAddress.addressSubDistrict, mockup.contactAddress.addressSubDistrict);
                        assert.equal(resp.data.contactAddress.addressDistrict, mockup.contactAddress.addressDistrict);
                        assert.equal(resp.data.contactAddress.addressProvince, mockup.contactAddress.addressProvince);
                        assert.equal(resp.data.contactAddress.addressPostalCode, mockup.contactAddress.addressPostalCode);
                        assert.equal(resp.data.contactAddress.latitude, mockup.contactAddress.latitude);
                        assert.equal(resp.data.contactAddress.logitude, mockup.contactAddress.logitude);
                        assert.equal(resp.data.mobileNo, mockup.mobileNo);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.lineUserID, mockup.lineUserID);
                        assert.equal(resp.data.memberID, mockup.memberID);
                        done();
                    });
            });

    });

    it('should be RrsCustomer post use token', (done)=>{
        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.title, mockup.title);
                assert.equal(resp.data.firstName, mockup.firstName);
                assert.equal(resp.data.lastName, mockup.lastName);
                assert.equal(resp.data.displayName, mockup.displayName);
                assert.equal(resp.data.contactAddress.addressLine1, mockup.contactAddress.addressLine1);
                assert.equal(resp.data.contactAddress.addressStreet, mockup.contactAddress.addressStreet);
                assert.equal(resp.data.contactAddress.addressSubDistrict, mockup.contactAddress.addressSubDistrict);
                assert.equal(resp.data.contactAddress.addressDistrict, mockup.contactAddress.addressDistrict);
                assert.equal(resp.data.contactAddress.addressProvince, mockup.contactAddress.addressProvince);
                assert.equal(resp.data.contactAddress.addressPostalCode, mockup.contactAddress.addressPostalCode);
                assert.equal(resp.data.contactAddress.latitude, mockup.contactAddress.latitude);
                assert.equal(resp.data.contactAddress.logitude, mockup.contactAddress.logitude);
                assert.equal(resp.data.mobileNo, mockup.mobileNo);
                assert.equal(resp.data.email, mockup.email);
                assert.equal(resp.data.lineUserID, mockup.lineUserID);
                assert.equal(resp.data.memberID, mockup.memberID);
                done();
            });
    });

    it('should be rrscustomer put use token', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    firstName: 'name update'
                }
                request(app)
                    .put('/api/rrscustomers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.title, mockup.title);
                        assert.equal(resp.data.firstName, update.firstName);
                        assert.equal(resp.data.lastName, mockup.lastName);
                        assert.equal(resp.data.displayName, mockup.displayName);
                        assert.equal(resp.data.contactAddress.addressLine1, mockup.contactAddress.addressLine1);
                        assert.equal(resp.data.contactAddress.addressStreet, mockup.contactAddress.addressStreet);
                        assert.equal(resp.data.contactAddress.addressSubDistrict, mockup.contactAddress.addressSubDistrict);
                        assert.equal(resp.data.contactAddress.addressDistrict, mockup.contactAddress.addressDistrict);
                        assert.equal(resp.data.contactAddress.addressProvince, mockup.contactAddress.addressProvince);
                        assert.equal(resp.data.contactAddress.addressPostalCode, mockup.contactAddress.addressPostalCode);
                        assert.equal(resp.data.contactAddress.latitude, mockup.contactAddress.latitude);
                        assert.equal(resp.data.contactAddress.logitude, mockup.contactAddress.logitude);
                        assert.equal(resp.data.mobileNo, mockup.mobileNo);
                        assert.equal(resp.data.email, mockup.email);
                        assert.equal(resp.data.lineUserID, mockup.lineUserID);
                        assert.equal(resp.data.memberID, mockup.memberID);
                        done();
                    });
            });

    });

    it('should be rrscustomer delete use token', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrscustomers/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be rrscustomer get not use token', (done)=>{
        request(app)
        .get('/api/rrscustomers')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    xit('should be rrscustomer post not use token', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    xit('should be rrscustomer put not use token', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/rrscustomers/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be rrscustomer delete not use token', function (done) {

        request(app)
            .post('/api/rrscustomers')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrscustomers/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        RrsCustomer.deleteMany().exec(done);
    });

});