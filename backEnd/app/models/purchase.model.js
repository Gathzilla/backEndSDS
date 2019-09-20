const User = require('../models/user.model');
const Product = require('../models/product.model.js');
const Provider = require('../models/provider.model.js');
const Article = require('../models/article.model.js');
const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
     
    purchaseNo: Number, //maybe we should assign this automatically
    billNo: Number,
    date: Date,
    returnDate: Date,
    state: String,
    user: User.schema,    
    provider: Provider.schema, 
    purchaseDetails: { //for each product there should be a purchase detail 

        product: Product.schema, // remove this crap from either here or article 
        article: Article.schema,
        quantity: Number,
        unitCost: Number

    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Purchase', PurchaseSchema);