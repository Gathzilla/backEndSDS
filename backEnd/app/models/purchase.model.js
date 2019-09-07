const User = require('../models/user.model');
const Provider = require('../models/provider.model.js');
const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
     
    purchaseNo: Number,
    billNo: Number,
    date: Date,    
    provider: Provider.schema, 
    returnDate: Date,
    state: String,
    user: User.schema
    //purchaseDetails: ?,    

}, {
    timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);