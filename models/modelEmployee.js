const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    uuid: {
        type: String,

    },
    dob: {
        type: Date,

    },
    created_date: {
        type: Date,
        default: Date.now
    },
    designation: {
        type: String
    },
    employeeID: {
        type: Number,
        required: true
    },
    socialLinks: {
        type: Object,
    },
    familyMembers: {
        type: Array
    },
    emergencyContacts: {
        type: Object
    }


});

let model1 = mongoose.model('employees', employeeSchema);

module.exports = model1;