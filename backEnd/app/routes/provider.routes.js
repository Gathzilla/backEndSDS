module.exports = (app) => {

    const provider = require('../controllers/provider.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/provider/metadata', verifyToken,  provider.metadata); //tested working

    app.get('/api/provider', verifyToken, provider.findAll); //tested working

    app.get('/api/provider/:id', verifyToken, provider.findOneProvider);  //tested working

    app.post('/api/provider', verifyToken, provider.create); //tested working

    app.put('/api/provider', verifyToken, provider.update);  //tested working

    app.delete('/api/provider/:id', verifyToken, provider.delete);  //tested working

    app.get('/api/findProvider', verifyToken, provider.findByParameter); //tested working

}