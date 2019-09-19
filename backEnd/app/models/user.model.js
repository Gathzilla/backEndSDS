const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    //doublecheckd with pdf provided by jason. It includes everything. 
    employeeCode: Number,
    name: String,
    lastName: String,    
    nit: Number,    
    accountNumber: Number,
    phone: Number,
    email: String,
    nick: String,
    password: String,
    roles: String

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);