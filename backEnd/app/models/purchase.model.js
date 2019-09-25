const User = require('../models/user.model');
const Product = require('../models/product.model.js');
const Provider = require('../models/provider.model.js');
const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
     
    purchaseNo: Number, //maybe we should assign this automatically
    billNo: Number,
    date: Date,
    returnDate: Date || String,
    state: String,
    user: User.schema,    
    provider: Provider.schema, 
    purchaseDetails: [
        { 
       
        product : Product.schema,
        quantity: Number,
        unitCost: Number
        
        }
    ]

}, {
    timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);