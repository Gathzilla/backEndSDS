module.exports = (app) => {

    const purchases = require('../controllers/purchases.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/purchase/metadata', verifyToken,  purchases.metadata);

    app.get('/api/purchase', verifyToken, purchases.findAll);

    app.get('/api/purchase/:id', verifyToken, purchases.findOne);

    app.post('/api/purchase', verifyToken, purchases.create);

    app.put('/api/purchase/apply', verifyToken, purchases.apply);

    app.put('/api/purchase/void', verifyToken, purchases.void);

    app.delete('/api/purchase/:id', verifyToken, purchases.delete);

    app.get('/api/search', verifyToken, purchases.search);


}