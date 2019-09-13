module.exports = (app) => {

    const sales = require('../controllers/sales.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/sale/metadata', verifyToken,  sales.metadata);

    app.get('/api/sale', verifyToken, sales.findAll);

    app.get('/api/sale/:id', verifyToken, sales.findOne);

    app.post('/api/sale', verifyToken, sales.create);

    app.put('/api/sale/apply', verifyToken, sales.apply);

    app.put('/api/sale/void', verifyToken, sales.void);

    app.delete('/api/sale/:id', verifyToken, sales.delete);

    app.get('/api/search', verifyToken, sales.search);


}