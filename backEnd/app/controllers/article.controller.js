const Article = require('../models/article.model.js');
const wrapper = require('../utils/wrapper');


let isValid = (article) => {
    if (!article.product) {
        return { isValid: false, propertyInvalid: "product" };
    } else if (!article.serialNumber){
        return { isValid: false, propertyInvalid: "serialNumber" };
    } else if (!article.ingressDate){
        return { isValid: false, propertyInvalid: "ingressDate" };
    } else if (!article.egressDate){
        return { isValid: false, propertyInvalid: "egressDate" };
    } else if (!article.unitCost){
        return { isValid: false, propertyInvalid: "unitCost" };
    } else if (!article.provider){
        return { isValid: false, propertyInvalid: "provider" };
    }else if (!article.waranty){
        return { isValid: false, propertyInvalid: "waranty" };
    }else{
        return {isValid: true, propertyInvalid: undefined}
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "Article metadata queried successfully", "error": false, "data": Article.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/Article/metadata", response: response, httpCode: 200, res: res });
};


exports.create = (req, res) => {  
    if (!req.body) {
        let response = { "status": "error", "message": "Article content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/article", response: response, httpCode: 400, res: res });
    } else {
    
        const newArticle = new Article({
            product: req.body.product,
            serialNumber: req.body.serialNumber,
            ingressDate: req.body.ingressDate,
            egressDate: req.body.egressDate,
            unitCost: req.body.unitCost,
            provider: req.body.provider,
            waranty: req.body.waranty,
        });
        

        let validation = isValid(newArticle);

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Article " + validation.propertyInvalid + " is required", "error": true, "data": newArticle };
            return wrapper.sendResponse({ method: "POST /api/article", response: response, httpCode: 400, res: res });
        } else {
            
            newArticle.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Article saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/article", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Article", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/article", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Article.find()
        .then(articles => {
            if (articles && articles.length > 0) {
                let response = { "status": "ok", "message": "Articles queried successfully", "error": false, "data": articles };
                return wrapper.sendResponse({ method: "GET /api/article", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/article", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving articles", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/article", response: response, httpCode: 500, res: res });
        });
};


exports.findByParameter= (req, res) => {

    Article.findOne({[req.body.parameter] : req.body.value}, (error, article) => {
        if (error) {
                let response = { "status": "error", "message": " Error encountered on returning the requested result", "error": true, "data": error.message};
                return wrapper.sendResponse({method: "GET /api/article/findArticle", response: response, httpCode: 500, res: res});
        } 
        else if(!article) {
            let response = {"status": "error", "message": "Error retrieving article.", "error": true, "data": undefined };
            return wrapper.sendResponse({method: "GET /api/findArticle", response: response, httpCode: 401, res: res});
            }
        else{
            let response = { "status": "ok", "message": "Article retrieved succesfully", "error": false, "data": article};
            return wrapper.sendResponse({ method: "GET /api/article/findArticle", response: response, httpCode: 200, res: res }); 
            }
        } 
        )};


exports.findOneArticle = (req, res) => {
    Article.findById(req.params.id)
        .then(article => {
            if (!article) {
                let response = { "status": "error", "message": "Article not found with given information" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/article/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Article queried successfully", "error": false, "data": article };
                return wrapper.sendResponse({ method: "GET /api/article/:id" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Article not found with id findOne " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/article/:id" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving article with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/article/:id", response: response, httpCode: 500, res: res });
            }
        });
};

exports.update = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Article content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 400, res: res });
    } else {
         
        const articleToUpdate = {
            product: req.body.product,
            serialNumber: req.body.serialNumber,
            ingressDate: req.body.nit,
            egressDate: req.body.egressDate,
            unitCost: req.body.unitCost,
            provider: req.body.provider,
            waranty: req.body.warranty,
        };

        let validation = isValid(articleToUpdate);
        if (!validation.isValid) {
            let response = { "status": "error", "message": "Article " + validation.propertyInvalid + " is required", "error": true, "data": articleToUpdate };
            return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 400, res: res });
        } else {
           
            Article.findByIdAndUpdate(req.body.codigoEmpleado, articleToUpdate, { new: true, upsert: true })
                .then(article => {
                    if (!article) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the article with id" + req.body.codigoEmpleado, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Article updated successfully", "error": false, "data": article };
                        return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Article not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the article", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/article", response: response, httpCode: 500, res: res });
                    }
                });
        }
    }
};

exports.delete = (req, res) => {
    Article.findByIdAndRemove(req.params.id)
        .then(article => {
            if (!article) {
                let response = { "status": "error", "message": "Article not found with" + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/article", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Article deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/article/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Article not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/article", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete article with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/article", response: response, httpCode: 500, res: res });
            }
        });
};