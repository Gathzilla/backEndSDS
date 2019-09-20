module.exports = (app) => {

    const client = require('../controllers/client.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/client/metadata', verifyToken,  client.metadata); //tested working

    app.get('/api/client', verifyToken, client.findAll); //tested working

    app.get('/api/client/:id', verifyToken, client.findOneClient); //tested working

    app.post('/api/client', verifyToken, client.create);  //tested working

    app.put('/api/client', verifyToken, client.update); //tested working

    app.delete('/api/client/:id', verifyToken, client.delete); //tested working

    app.get('/api/findClient', verifyToken, client.findByParameter); //tested working

}