const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
     //doublecheckd with pdf provided by jason. It includes everything. 
    nit: Number,
    name: String,    
    address: String,    
    telephone: Number,
    email: String,
    contact: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);