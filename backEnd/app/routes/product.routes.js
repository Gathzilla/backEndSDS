module.exports = (app) => {

    const product = require('../controllers/product.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/product/metadata', verifyToken,  product.metadata); //tested working

    app.get('/api/product', verifyToken, product.findAll);  //tested working

    app.get('/api/product/:id', verifyToken, product.findOneProduct); //tested working

    app.post('/api/product', verifyToken, product.create);  //tested working

    app.put('/api/product', verifyToken, product.update); //tested working

    app.delete('/api/product/:id', verifyToken, product.delete); //tested working

    app.get('/api/find', verifyToken, product.findByParameter);  //tested working

}