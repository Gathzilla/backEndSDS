const Purchase = require('../models/purchase.model');
const articleController = require('../controllers/article.controller'); 
const wrapper = require('../utils/wrapper');


let isValid = (purchase) => {

    if (!purchase.purchaseNo) {
        return { isValid: false, propertyInvalid: "purchaseNo" };
    } else if (!purchase.billNo) {
        return { isValid: false, propertyInvalid: "billNo" };
    } else if (!purchase.date) {
        return { isValid: false, propertyInvalid: "date" };
    }else if (!purchase.returnDate) {
        return { isValid: false, propertyInvalid: "returnDate" };
    }else if (!purchase.user) { //check this validation 
        return { isValid: false, propertyInvalid: "user" };
    }else if (!purchase.provider) {//check this validation
        return { isValid: false, propertyInvalid: "provider" };
    }else if (purchase.purchaseDetails[0] == null) { //check this validation
        return { isValid: false, propertyInvalid: "purchaseDetails" };
    }else {
        return { isValid: true, propertyInvalid: undefined }
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "Purchase metadata queried successfully", "error": false, "data": Purchase.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/purchase/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Purchase content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/purchase", response: response, httpCode: 400, res: res });
    } else {

        
    
        const newPurchase = new Purchase({
            purchaseNo: req.body.purchaseNo,
            billNo: req.body.billNo,
            date: req.body.date,    
            returnDate: req.body.returnDate,    
            state: "processing",            
            user: req.body.user,
            provider: req.body.provider,
            purchaseDetails: req.body.purchaseDetails
        });

        
        


        let validation = isValid(newPurchase);

        

        

        

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Purchase " + validation.propertyInvalid + " is required", "error": true, "data": newPurchase };
            return wrapper.sendResponse({ method: "POST /api/purchase", response: response, httpCode: 400, res: res });
        } else {
            
            
            
            newPurchase.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Purchase saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/purchase", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Purchase", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/purchase", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Purchase.find()
        .then(purchases => {
            if (purchases && purchases.length > 0) {
                let response = { "status": "ok", "message": "Purchases queried successfully", "error": false, "data": purchases };
                return wrapper.sendResponse({ method: "GET /api/purchase", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/purchase", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving purchases", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/purchase", response: response, httpCode: 500, res: res });
        });
};


exports.search = (req, res) => {





    Purchase.findOne({ [req.body.parameter] : req.body.value }, (error, purchase) => {
        if (error) {
            let response = { "status": "error", "message": "Some error occurred while login the Purchase", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 500, res: res });
        } else if (!purchase) {
            

            let response = { "status": "error", "message": "no mames wey", "error": true, "data": undefined };
            return wrapper.sendResponse({ method: "GET /api/search", response: response, httpCode: 401, res: res });
        } else {
            
            let response = { "status": "ok", "message": "Purchase authenticated successfully", "error": false, "data": purchase };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 200, res: res });
            
        }
    });

    

};

exports.findOne = (req, res) => {
    Purchase.findById(req.params.id)
        .then(purchase => {
            if (!purchase) {
                let response = { "status": "error", "message": "Purchase not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/purchase/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Purchase queried successfully", "error": false, "data": purchase };
                return wrapper.sendResponse({ method: "GET /api/purchase/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Purchase not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/purchase/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving purchase with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/purchase", response: response, httpCode: 500, res: res });
            }
        });
};


exports.apply = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Purchase content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PATCH /api/purchase", response: response, httpCode: 400, res: res });
    } else {
         
        const purchaseToUpdate = {
             
            state: "processed",            
          
        };

      
        articleController.create;
            
            
           
            Purchase.findByIdAndUpdate(req.body._id, purchaseToUpdate)
                .then(purchase => {
                    if (!purchase) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the purchase with id" + req.body.employeeCode, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/apply", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Purchase updated successfully", "error": false, "data": purchase };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/apply", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Purchase not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/apply", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the purchase", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/apply", response: response, httpCode: 500, res: res });
                    }
                });
        
    }
};


exports.void = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Purchase content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PATCH /api/purchase/void", response: response, httpCode: 400, res: res });
    } else {
         
        const purchaseToUpdate = {
             
            state: "cancelled",            
          
        };

      
            
            
            
           
            Purchase.findByIdAndUpdate(req.body._id, purchaseToUpdate)
                .then(purchase => {
                    if (!purchase) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the purchase with id" + req.body.employeeCode, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/void", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Purchase updated successfully", "error": false, "data": purchase };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/void", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Purchase not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/void", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the purchase", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/purchase/void", response: response, httpCode: 500, res: res });
                    }
                });
        
    }
};


exports.delete = (req, res) => {
    Purchase.findByIdAndRemove(req.params.id)
        .then(purchase => {
            if (!purchase) {
                let response = { "status": "error", "message": "Purchase not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/purchase", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Purchase deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/purchase/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Purchase not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/purchase", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete purchase with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/purchase", response: response, httpCode: 500, res: res });
            }
        });
};