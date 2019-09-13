const Sale = require('../models/sale.model');
const users = require('../controllers/user.controller');
const wrapper = require('../utils/wrapper');
const bcrypt = require('bcryptjs');

let isValid = (sale) => {

    if (!sale.billNo) {
        return { isValid: false, propertyInvalid: "billNo" };
    } else if (!sale.client) {
        return { isValid: false, propertyInvalid: "client" };
    } else if (!sale.date) {
        return { isValid: false, propertyInvalid: "date" };
    }else if (!sale.returnDate) {
        return { isValid: false, propertyInvalid: "returnDate" };
    }else if (!sale.user) {
        return { isValid: false, propertyInvalid: "user" };
    }else if (!sale.provider) {
        return { isValid: false, propertyInvalid: "provider" };
    }else if (!sale.saleDetails) {
        return { isValid: false, propertyInvalid: "saleDetails" };
    }else {
        return { isValid: true, propertyInvalid: undefined }
    }
}

exports.metadata = (req, res) => {
    let response = { "status": "ok", "message": "Sale metadata queried successfully", "error": false, "data": Sale.schema.paths };
    return wrapper.sendResponse({ method: "GET /api/sale/metadata", response: response, httpCode: 200, res: res });
};

exports.create = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Sale content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "POST /api/sale", response: response, httpCode: 400, res: res });
    } else {

        
    
        const newSale = new Sale({            
            billNo: req.body.billNo,
            date: req.body.date, 
            client: req.body.client,       
            returnDate: req.body.returnDate,    
            state: "processing",            
            user: req.body.user,
            provider: req.body.provider,
            saleDetails: req.body.saleDetails

            
        });

        
        


        let validation = isValid(newSale);

        

        

        

        if (!validation.isValid) {
            let response = { "status": "error", "message": "Sale " + validation.propertyInvalid + " is required", "error": true, "data": newSale };
            return wrapper.sendResponse({ method: "POST /api/sale", response: response, httpCode: 400, res: res });
        } else {
            
            
            
            newSale.save()
                .then(data => {
                    let response = { "status": "ok", "message": "Sale saved successfully", "error": false, "data": data };
                    return wrapper.sendResponse({ method: "POST /api/sale", response: response, httpCode: 202, res: res });
                }).catch(error => {
                    let response = { "status": "error", "message": "Some error occurred while creating the Sale", "error": true, "data": error.message || undefined };
                    return wrapper.sendResponse({ method: "POST /api/sale", response: response, httpCode: 500, res: res });
                });
        }
    }
};


exports.findAll = (req, res) => {
    Sale.find()
        .then(sales => {
            if (sales && sales.length > 0) {
                let response = { "status": "ok", "message": "Sales queried successfully", "error": false, "data": sales };
                return wrapper.sendResponse({ method: "GET /api/sale", response: response, httpCode: 200, res: res });
            } else {
                let response = { "status": "ok", "message": "no data", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/sale", response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            let response = { "status": "error", "message": "Some error occurred while retrieving sales", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "GET /api/sale", response: response, httpCode: 500, res: res });
        });
};


exports.search = (req, res) => {





    Sale.findOne({ [req.body.parameter] : req.body.value }, (error, sale) => {
        if (error) {
            let response = { "status": "error", "message": "Some error occurred while login the Sale", "error": true, "data": error.message || undefined };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 500, res: res });
        } else if (!sale) {
            

            let response = { "status": "error", "message": "no mames wey", "error": true, "data": undefined };
            return wrapper.sendResponse({ method: "GET /api/search", response: response, httpCode: 401, res: res });
        } else {
            
            let response = { "status": "ok", "message": "Sale authenticated successfully", "error": false, "data": sale };
            return wrapper.sendResponse({ method: "POST /api/login", response: response, httpCode: 200, res: res });
            
        }
    });

    

};

exports.findOne = (req, res) => {
    Sale.findById(req.params.id)
        .then(sale => {
            if (!sale) {
                let response = { "status": "error", "message": "Sale not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/sale/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Sale queried successfully", "error": false, "data": sale };
                return wrapper.sendResponse({ method: "GET /api/sale/" + req.params.id, response: response, httpCode: 200, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId') {
                let response = { "status": "error", "message": "Sale not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "GET /api/sale/" + req.params.id, response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Error retrieving sale with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "GET /api/sale", response: response, httpCode: 500, res: res });
            }
        });
};


exports.apply = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Sale content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PATCH /api/sale/apply", response: response, httpCode: 400, res: res });
    } else {
         
        const saleToUpdate = {
             
            state: "processed",            
          
        };

      
            
            
            
           
            Sale.findByIdAndUpdate(req.body._id, saleToUpdate)
                .then(sale => {
                    if (!sale) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the sale with id" + req.body.employeeCode, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/sale/apply", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Sale updated successfully", "error": false, "data": sale };
                        return wrapper.sendResponse({ method: "PATCH /api/sale/apply", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Sale not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/sale/apply", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the sale", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PATCH /api/sale/apply", response: response, httpCode: 500, res: res });
                    }
                });
        
    }
};


exports.void = (req, res) => {
    
    if (!req.body) {
        let response = { "status": "error", "message": "Sale content can not be empty", "error": true, "data": undefined };
        return wrapper.sendResponse({ method: "PUT /api/sale", response: response, httpCode: 400, res: res });
    } else {
         
        const saleToUpdate = {
             
            state: "cancelled",            
          
        };

      
            
            
            
           
            Sale.findByIdAndUpdate(req.body._id, saleToUpdate)
                .then(sale => {
                    if (!sale) {
                        let response = { "status": "error", "message": "Some error ocurred while updating the sale with id" + req.body.employeeCode, "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/sale", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "ok", "message": "Sale updated successfully", "error": false, "data": sale };
                        return wrapper.sendResponse({ method: "PUT /api/sale", response: response, httpCode: 202, res: res });
                    }
                }).catch(error => {
                    if (error.kind === 'ObjectId') {
                        let response = { "status": "error", "message": "Sale not found", "error": true, "data": undefined };
                        return wrapper.sendResponse({ method: "PUT /api/sale", response: response, httpCode: 404, res: res });
                    } else {
                        let response = { "status": "error", "message": "Some error occurred while updating the sale", "error": true, "data": error.message || undefined };
                        return wrapper.sendResponse({ method: "PUT /api/sale", response: response, httpCode: 500, res: res });
                    }
                });
        
    }
};


exports.delete = (req, res) => {
    Sale.findByIdAndRemove(req.params.id)
        .then(sale => {
            if (!sale) {
                let response = { "status": "error", "message": "Sale not found with id " + req.params.id, "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/sale", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "ok", "message": "Sale deleted successfully", "error": false, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/sale/" + req.params.id, response: response, httpCode: 202, res: res });
            }
        }).catch(error => {
            if (error.kind === 'ObjectId' || error.name === 'NotFound') {
                let response = { "status": "error", "message": "Sale not found", "error": true, "data": undefined };
                return wrapper.sendResponse({ method: "DELETE /api/sale", response: response, httpCode: 404, res: res });
            } else {
                let response = { "status": "error", "message": "Could not delete sale with id " + req.params.id, "error": true, "data": error.message || undefined };
                return wrapper.sendResponse({ method: "DELETE /api/sale", response: response, httpCode: 500, res: res });
            }
        });
};