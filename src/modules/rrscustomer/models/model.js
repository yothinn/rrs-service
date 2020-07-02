'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RrsCustomerSchema = new Schema({
    title: {
        type: String,
    },
    firstName: {
        type: String,
        required: 'Please fill in your first name',
    },
    lastName: {
        type: String,
        required: 'Please fill in your last name',
    },
    displayName: {
        type: String,
        required: 'Please fill in your full name',
        unique: "Full name already exitst"
    },
    contactAddress: {
        type: {
            addressLine1: {
                type: String
            },
            addressStreet: {
                type: String
            },
            addressSubDistrict: {
                type: String
            },
            addressDistrict: {
                type: String
            },
            addressProvince: {
                type: String
            },
            addressPostalCode: {
                type: String
            },
            latitude: {
                type: String
            },
            logitude: {
                type: String
            }
        }
    },
    mobileNo: {
        type: String
    },
    email: {
        type: String
    },
    lineUserID: {
        type: String
    },
    memberID: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});
RrsCustomerSchema.pre('save', function(next){
    let RrsCustomer = this;
    const model = mongoose.model("RrsCustomer", RrsCustomerSchema);
    if (RrsCustomer.isNew) {
        // create
        next();
    }else{
        // update
        RrsCustomer.updated = new Date();
        next();
    }
    
    
})
mongoose.model("RrsCustomer", RrsCustomerSchema);