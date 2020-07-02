'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Restuarant = mongoose.model('Restuarant');

var credentials,
    token,
    mockup;

describe('Restuarant CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            name: 'ร้านอาหารชุมพรคาบาน่า',
            displayName: 'ร้านในสวน',
            logo: 'https://drive.google.com/xudadekf,ve',
            description: 'รายละเอียดร้านค้า',
            location: {
                addressLine1: '69 หมู่ 8 ',
                addressStreet: 'หาดทุ่งวัวแล่น',
                addressSubDistrict: 'สะพลี',
                addressDistrict: 'ปะทิว',
                addressProvince: 'ชุมพร',
                addressPostalCode: '86230',
                latitude: '13.45678',
                logitude: '1000.345678'
            },
            mobileNo: '0897249319',
            otherNo: '',
            maxGuestCapacity: 50,
            activate: true,
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

    it('should be Restuarant get use token', (done)=>{
        request(app)
        .get('/api/restuarants')
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

    it('should be Restuarant get by id', function (done) {

        request(app)
            .post('/api/restuarants')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/restuarants/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.displayName, mockup.displayName);
                        assert.equal(resp.data.logo, mockup.logo);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.location.addressLine1, mockup.location.addressLine1);
                        assert.equal(resp.data.location.addressStreet, mockup.location.addressStreet);
                        assert.equal(resp.data.location.addressSubDistrict, mockup.location.addressSubDistrict);
                        assert.equal(resp.data.location.addressDistrict, mockup.location.addressDistrict);
                        assert.equal(resp.data.location.addressProvince, mockup.location.addressProvince);
                        assert.equal(resp.data.location.addressPostalCode, mockup.location.addressPostalCode);
                        assert.equal(resp.data.location.latitude, mockup.location.latitude);
                        assert.equal(resp.data.location.logitude, mockup.location.logitude);
                        assert.equal(resp.data.mobileNo, mockup.mobileNo);
                        assert.equal(resp.data.otherNo, mockup.otherNo);
                        assert.equal(resp.data.maxGuestCapacity, mockup.maxGuestCapacity);
                        assert.equal(resp.data.activate, mockup.activate);
                        done();
                    });
            });

    });

    it('should be Restuarant post use token', (done)=>{
        request(app)
            .post('/api/restuarants')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                assert.equal(resp.data.displayName, mockup.displayName);
                assert.equal(resp.data.logo, mockup.logo);
                assert.equal(resp.data.description, mockup.description);
                assert.equal(resp.data.location.addressLine1, mockup.location.addressLine1);
                assert.equal(resp.data.location.addressStreet, mockup.location.addressStreet);
                assert.equal(resp.data.location.addressSubDistrict, mockup.location.addressSubDistrict);
                assert.equal(resp.data.location.addressDistrict, mockup.location.addressDistrict);
                assert.equal(resp.data.location.addressProvince, mockup.location.addressProvince);
                assert.equal(resp.data.location.addressPostalCode, mockup.location.addressPostalCode);
                assert.equal(resp.data.location.latitude, mockup.location.latitude);
                assert.equal(resp.data.location.logitude, mockup.location.logitude);
                assert.equal(resp.data.mobileNo, mockup.mobileNo);
                assert.equal(resp.data.otherNo, mockup.otherNo);
                assert.equal(resp.data.maxGuestCapacity, mockup.maxGuestCapacity);
                assert.equal(resp.data.activate, mockup.activate);
                done();
            });
    });

    it('should be restuarant put use token', function (done) {

        request(app)
            .post('/api/restuarants')
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
                    .put('/api/restuarants/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.name, update.name);
                        assert.equal(resp.data.displayName, mockup.displayName);
                        assert.equal(resp.data.logo, mockup.logo);
                        assert.equal(resp.data.description, mockup.description);
                        assert.equal(resp.data.location.addressLine1, mockup.location.addressLine1);
                        assert.equal(resp.data.location.addressStreet, mockup.location.addressStreet);
                        assert.equal(resp.data.location.addressSubDistrict, mockup.location.addressSubDistrict);
                        assert.equal(resp.data.location.addressDistrict, mockup.location.addressDistrict);
                        assert.equal(resp.data.location.addressProvince, mockup.location.addressProvince);
                        assert.equal(resp.data.location.addressPostalCode, mockup.location.addressPostalCode);
                        assert.equal(resp.data.location.latitude, mockup.location.latitude);
                        assert.equal(resp.data.location.logitude, mockup.location.logitude);
                        assert.equal(resp.data.mobileNo, mockup.mobileNo);
                        assert.equal(resp.data.otherNo, mockup.otherNo);
                        assert.equal(resp.data.maxGuestCapacity, mockup.maxGuestCapacity);
                        assert.equal(resp.data.activate, mockup.activate);
                        done();
                    });
            });

    });

    it('should be restuarant delete use token', function (done) {

        request(app)
            .post('/api/restuarants')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/restuarants/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be restuarant get not use token', (done)=>{
        request(app)
        .get('/api/restuarants')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    xit('should be restuarant post not use token', function (done) {

        request(app)
            .post('/api/restuarants')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    xit('should be restuarant put not use token', function (done) {

        request(app)
            .post('/api/restuarants')
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
                    .put('/api/restuarants/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be restuarant delete not use token', function (done) {

        request(app)
            .post('/api/restuarants')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/restuarants/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Restuarant.deleteMany().exec(done);
    });

});