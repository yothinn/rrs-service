'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
 * เก็บข้อมูลแบบเดียวกับ Auth service เพื่อลดเวลาในการค้นหารเฉพาะผู้ใช้ของ RRS
 * !! ระวัง เวลาอัพเดท ให้อัพเดท ที่ Auth service ด้วย
 */
var RRSUserPermissionSchema = new Schema({
    username: {
        type: String,
        required: 'Please fill in a username',
        unique: "Username already exists",
        lowercase: true,
        trim: true
    },
    firstname: {
        type: String,
        trim: true,
        default: "",
        required: "Please fill in your first name"
    },
    lastname: {
        type: String,
        trim: true,
        default: "",
        required: "Please fill in your last name"
    },
    displayname: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: "",
        //validate: [validateLocalStrategyEmail, "Please fill a valid email address"]
    },
    roles: {
        type: [
            {
                type: String,
                enum: [
                    "user", 
                    "staff", 
                    "owner",
                    "manager", 
                    "admin",
                    "superadmin"
                ]
            }
        ],
        default: ["staff"],
        required: "Please provide at least one role"
    },
    position: {
        type: String,
    },
    restuarantId: {
        type: [
            {
                type: String,
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

RRSUserPermissionSchema.pre('save', function(next){
    let permission = this;
    const model = mongoose.model("RRSUserPermission", RRSUserPermissionSchema);
    if (permission.isNew) {
        // create
        next();
    }else{
        // update
        permission.updated = new Date();
        next();
    }
    
    
})
mongoose.model("RRSUserPermission", RRSUserPermissionSchema);