const User = require('../models/user.model');
const Product = require('../models/product.model.js');
const Client = require('../models/client.model.js');
const mongoose = require('mongoose');

const SaleSchema = mongoose.Schema({
     
    billNo: Number,
    date: Date,
    client: Client.schema,    
    returnDate: Date,    
    disccount: Number,
    state: String,
    user: User,
    saleDetails: {

        product: Product.schema,
        article: String,
        quantity: Number,
        unitCost: Number

    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Sale', SaleSchema);