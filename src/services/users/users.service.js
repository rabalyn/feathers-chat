// Initializes the `users` service on path `/users`
const couchbase = require('couchbase');
const { Users } = require('./users.class');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const paginate = app.get('paginate');
  const cluster = app.get('cluster');

  const options = {
    paginate,
    cluster,
    name: 'users',
    couchbase: {
      scanConsistency: couchbase.QueryScanConsistency.RequestPlus
    }
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};
