const User = require('../models/user.model');
const Client = require('../models/client.model.js');
const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
     
    billNo: Number,
    date: Date,
    client: Client.schema,    
    returnDate: Date,    
    disccount: Number,
    state: String,
    user: User
    //saleDetails: ?,    

}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', SaleSchema);