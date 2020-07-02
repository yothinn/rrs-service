'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var RrsroleSchema = new Schema({
    username: {
        type: String
    },
    displayName: {
        type: String,
        required: 'Please fill a Rrsrole name',
    },
    position: {
        type: String,
    },
    roles: {
        type: [
            {
                role: {
                    type: String
                },
                restuarantId: {
                    type: String
                }
            }
        ]
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

RrsroleSchema.pre('save', function(next){
    let Rrsrole = this;
    const model = mongoose.model("Rrsrole", RrsroleSchema);
    if (Rrsrole.isNew) {
        // create
        next();
    }else{
        // update
        Rrsrole.updated = new Date();
        next();
    }
    
    
})
mongoose.model("Rrsrole", RrsroleSchema);