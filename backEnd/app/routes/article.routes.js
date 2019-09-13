module.exports = (app) => {

    const article = require('../controllers/article.controller');
    const verifyToken = require('../auth/verifyToken');
    
    app.get('/api/article/metadata', verifyToken,  article.metadata);

    app.get('/api/article', verifyToken, article.findAll);

    app.get('/api/article/:id', verifyToken, article.findOneArticle);

    app.post('/api/article', verifyToken, article.create);

    app.put('/api/article', verifyToken, article.update);

    app.delete('/api/article/:id', verifyToken, article.delete);

    app.get('/api/findArticle', verifyToken, article.findByParameter);

}