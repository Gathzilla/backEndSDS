module.exports = (app) => {

    const users = require('../controllers/user.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/user/metadata', verifyToken,  users.metadata);  //tested working

    app.get('/api/user', verifyToken, users.findAll);  //tested working

    app.get('/api/user/:id', verifyToken, users.findOne);  //tested working

    //app.post('/api/user', verifyToken, users.create);  I'm thinking we don't need this one (but it does work)

    app.post('/api/register', users.create); //tested working

    app.put('/api/user', verifyToken, users.update); //tested working

    app.delete('/api/user/:id', verifyToken, users.delete);  //tested working

    app.get('/api/search', verifyToken, users.search); //tested working

    
}