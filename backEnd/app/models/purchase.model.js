const User = require('../models/user.model');
const Product = require('../models/product.model.js');
const Provider = require('../models/provider.model.js');
const Article = require('../models/article.model.js');
const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
     
    purchaseNo: Number,
    billNo: Number,
    date: Date,    
    provider: Provider.schema, 
    returnDate: Date,
    state: String,
    user: User.schema,
    purchaseDetails: {

        product: Product.schema,
        article: Article.schema,
        quantity: Number,
        unitCost: Number

    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);