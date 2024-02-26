const genresRoutes = require('./genres');

module.exports = (prefix, app) => {
  app.use(prefix, genresRoutes);
};
