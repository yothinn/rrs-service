'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Rrsrole = mongoose.model('Rrsrole');

var credentials,
    token,
    mockup;

describe('Rrsrole CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            username: 'superadmin',
            displayName: 'super admin',
            position: 'owner',
            roles: [
                {
                    role: 'superadmin',
                    restuarantId: '000001'
                }
            ]
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

    it('should be Rrsrole get use token', (done)=>{
        request(app)
        .get('/api/rrsroles')
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

    it('should be Rrsrole get by id', function (done) {

        request(app)
            .post('/api/rrsroles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/rrsroles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.username, mockup.username);
                        assert.equal(resp.data.displayName, mockup.displayName);
                        assert.equal(resp.data.position, mockup.position);
                        assert.equal(resp.data.roles[0].role, mockup.roles[0].role);
                        assert.equal(resp.data.roles[0].restuarantId, mockup.roles[0].restuarantId);
                        done();
                    });
            });

    });

    it('should be Rrsrole post use token', (done)=>{
        request(app)
            .post('/api/rrsroles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.username, mockup.username);
                assert.equal(resp.data.displayName, mockup.displayName);
                assert.equal(resp.data.position, mockup.position);
                assert.equal(resp.data.roles[0].role, mockup.roles[0].role);
                assert.equal(resp.data.roles[0].restuarantId, mockup.roles[0].restuarantId);
                done();
            });
    });

    it('should be rrsrole put use token', function (done) {

        request(app)
            .post('/api/rrsroles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    displayName: 'name update'
                }
                request(app)
                    .put('/api/rrsroles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.username, mockup.username);
                        assert.equal(resp.data.displayName, update.displayName);
                        assert.equal(resp.data.position, mockup.position);
                        assert.equal(resp.data.roles[0].role, mockup.roles[0].role);
                        assert.equal(resp.data.roles[0].restuarantId, mockup.roles[0].restuarantId);
                        done();
                    });
            });

    });

    it('should be rrsrole delete use token', function (done) {

        request(app)
            .post('/api/rrsroles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrsroles/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    xit('should be rrsrole get not use token', (done)=>{
        request(app)
        .get('/api/rrsroles')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    xit('should be rrsrole post not use token', function (done) {

        request(app)
            .post('/api/rrsroles')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    xit('should be rrsrole put not use token', function (done) {

        request(app)
            .post('/api/rrsroles')
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
                    .put('/api/rrsroles/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    xit('should be rrsrole delete not use token', function (done) {

        request(app)
            .post('/api/rrsroles')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrsroles/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Rrsrole.deleteMany().exec(done);
    });

});