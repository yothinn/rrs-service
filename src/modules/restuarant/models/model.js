'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RestuarantSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Restuarant name',
    },
    displayName: {
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    location : {
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
    maxGuestCapacity: {
        type: Number
    },
    mobileNo: {
        type: String
    },
    otherNo: {
        type: String
    },
    activate: {
        type: Boolean
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

RestuarantSchema.pre('save', function(next){
    let Restuarant = this;
    const model = mongoose.model("Restuarant", RestuarantSchema);
    if (Restuarant.isNew) {
        // create
        next();
    }else{
        // update
        Restuarant.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Restuarant", RestuarantSchema);