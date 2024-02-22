const postsRoutes = require('./posts');

module.exports = (prefix, app) => {
  app.use(prefix, postsRoutes);
};
