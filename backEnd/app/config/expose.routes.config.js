const userRoutes = require('../routes/user.routes');
const authRoutes = require('../routes/auth.routes');
const productRoutes = require('../routes/product.routes');
const providerRoutes = require('../routes/provider.routes');
const clientRoutes = require('../routes/client.routes');
const purchasesRoutes = require('../routes/purchases.routes');
const salesRoutes = require('../routes/sales.routes');
const articleRoutes = require('../routes/article.routes');

const backend = {
    exposeRoutes: (app) => {
        authRoutes(app);
        userRoutes(app);
        productRoutes(app);
        providerRoutes(app);
        clientRoutes(app);
        purchasesRoutes(app);
        salesRoutes(app);
        articleRoutes(app);
    }
} 

module.exports = backend;