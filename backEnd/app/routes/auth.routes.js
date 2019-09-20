module.exports = (app) => {
    const auth = require('../controllers/auth.controller');
    const verifyToken = require('../auth/verifyToken');

    
    app.post('/api/login', auth.login); //tested working

    
    app.get('/api/logout', verifyToken, auth.logout); //tested working

    
    app.get('/api/me', verifyToken, auth.me); //tested working
}