const mainRoutes = require('./main');

module.exports = (prefix, app) => {
    app.use(prefix, mainRoutes);
}
