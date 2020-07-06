'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Permission = mongoose.model('RRSUserPermission');

var credentialsSuper,
    credentialsAdmin,
    credentialsStaff,
    credentialsInvalid,
    token,
    tokenAdmin,
    tokenStaff,
    tokenInvalid,
    mockupAdmin,
    mockupStaff;

describe('UserPermission CRUD routes tests', function () {

    before(function (done) {
        credentialsSuper = {
            username: 'superadmin',
            password: 'superadmin',
            firstname: 'super',
            lastname: 'admin',
            email: 'super@email.com',
            roles: ['superadmin']
        };

        credentialsAdmin = {
            username: 'admin',
            password: 'admin',
            firstname: 'admin',
            lastname: 'admin',
            email: 'admin@email.com',
            roles: ['admin']
        };

        credentialsStaff = {
            username: 'staff',
            password: 'test',
            firstname: 'staff',
            lastname: 'test',
            email: 'staff@email.com',
            roles: ['staff']
        };

        credentialsInvalid = {
            username: 'staff',
            password: 'test',
            firstname: 'staff',
            lastname: 'test',
            email: 'staff@email.com',
            roles: ['guest']
        };

        token = jwt.sign(_.omit(credentialsSuper, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        tokenAdmin = jwt.sign(_.omit(credentialsAdmin, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        tokenStaff = jwt.sign(_.omit(credentialsStaff, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });

        tokenInvalid = jwt.sign(_.omit(credentialsInvalid, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });

        
        mockupAdmin = {
            username: credentialsAdmin.username,
            firstname: credentialsAdmin.firstname,
            lastname: credentialsAdmin.lastname,
            displayname: credentialsAdmin.displayname,
            email: credentialsAdmin.email,
            roles: credentialsAdmin.roles,
            position: 'manager',
            restuarantId: ['000001', '000002']
        };

        mockupStaff = {
            username: credentialsStaff.username,
            firstname: credentialsStaff.firstname,
            lastname: credentialsStaff.lastname,
            displayname: credentialsStaff.displayname,
            email: credentialsStaff.email,
            roles: credentialsStaff.roles,
            position: 'staff',
            restuarantId: ['000001', '000002']
        };
        
        done();
    });

    it('should be get permission by username (super)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                request(app)
                    .get('/api/rrs/userpermission')
                    .set('Authorization', 'Bearer ' + tokenStaff)
                    .send({ username: mockupStaff.username })
                    .expect(200)
                    .end(function(err, res) {
                        
                        // console.log(JSON.stringify(res.body));
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        done();
                    });
            });
    });

    it('should be get permission by username (admin)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupAdmin)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                request(app)
                    .get('/api/rrs/userpermission')
                    .set('Authorization', 'Bearer ' + tokenAdmin)
                    .send({ username: mockupAdmin.username })
                    .expect(200)
                    .end(function(err, res) {
                        
                        // console.log(JSON.stringify(res.body));
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        done();
                    });
            });
    });

    it('should be get permission by username (staff)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                request(app)
                    .get('/api/rrs/userpermission')
                    .set('Authorization', 'Bearer ' + tokenStaff)
                    .send({ username: mockupStaff.username })
                    .expect(200)
                    .end(function(err, res) {
                        
                        // console.log(JSON.stringify(res.body));
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        done();
                    });
            });
    });

    it('should not be get permission by username (staff invalid role)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                request(app)
                    .get('/api/rrs/userpermission')
                    .set('Authorization', 'Bearer ' + tokenInvalid)
                    .send({ username: mockupStaff.username })
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });
    });

    it('should be get user use token (admin)', (done)=>{
        request(app)
        .get('/api/rrs/user')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should not be get user use token (staff)', (done)=>{
        request(app)
        .get('/api/rrs/user')
        .set('Authorization', 'Bearer ' + tokenStaff)
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });
    

    it('should be get user by id (admin)', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupAdmin)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/rrs/user/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + tokenAdmin)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.username, mockupAdmin.username);
                        assert.equal(resp.data.position, mockupAdmin.position);
                        assert.equal(resp.data.restuarantId[0], mockupAdmin.restuarantId[0]);
                        assert.equal(resp.data.restuarantId[1], mockupAdmin.restuarantId[1]);
                        done();
                    });
            });

    });

    it('should be create permission (post) use token (super)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupAdmin)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.username, mockupAdmin.username);
                assert.equal(resp.data.position, mockupAdmin.position);
                assert.equal(resp.data.restuarantId[0], mockupAdmin.restuarantId[0]);
                assert.equal(resp.data.restuarantId[1], mockupAdmin.restuarantId[1]);
                done();
            });
    });

    it('should not be create permission (post) use token (admin)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + tokenAdmin)
            .send(mockupAdmin)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should not be create permission (post) use token (staff)', (done)=>{
        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + tokenStaff)
            .send(mockupStaff)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be update data (put) use token (super)', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    restuarantId: ['000001', '000002', '00003']
                }
                request(app)
                    .put('/api/rrs/user/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.username, mockupStaff.username);
                        assert.equal(resp.data.position, mockupStaff.position);
                        assert.equal(resp.data.restuarantId[0], update.restuarantId[0]);
                        assert.equal(resp.data.restuarantId[1], update.restuarantId[1]);
                        assert.equal(resp.data.restuarantId[2], update.restuarantId[2]);
                        done();
                    });
            });

    });

    it('should not be update data (put) use token (admin)', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    restuarantId: ['000001', '000002', '00003']
                }
                request(app)
                    .put('/api/rrs/user/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + tokenAdmin)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be delete user use token (super)', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrs/user/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be get user permission not use token', (done)=>{
        request(app)
        .get('/api/rrs/userpermission')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be get user not use token', (done)=>{
        request(app)
        .get('/api/rrs/user')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be create user (post) not use token', function (done) {

        request(app)
            .post('/api/rrs/user')
            .send(mockupStaff)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be update user (put) not use token', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    restuarantId: ['000001', '000002', '00003']
                }
                request(app)
                    .put('/api/rrs/user/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be delete user not use token', function (done) {

        request(app)
            .post('/api/rrs/user')
            .set('Authorization', 'Bearer ' + token)
            .send(mockupStaff)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/rrs/user/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Permission.deleteMany().exec(done);
    });

});