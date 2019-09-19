const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const Provider = require('../models/provider.model.js');

const ArticleSchema = mongoose.Schema({
    
    product: Product.schema, //i should instead get the product id, and then look for it
    serialNumber: Number,
    ingressDate: Date,
    egressDate: Date,
    unitCost: String,
    provider: Provider.schema, //i should instead get the provider id, and then look for it not necesarry
    waranty: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);