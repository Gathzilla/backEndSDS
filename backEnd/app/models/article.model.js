const mongoose = require('mongoose');
const Product = require('../models/product.model.js');
const Provider = require('../models/provider.model.js');

const ArticleSchema = mongoose.Schema({
    
    product: Product.schema,
    serialNumber: Number,
    ingressDate: Date,
    egressDate: Date,
    unitCost: String,
    provider: Provider.schema,
    waranty: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);