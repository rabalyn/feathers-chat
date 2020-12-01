const couchbase = require('couchbase');

module.exports = app => {
  const cluster = new couchbase.Cluster('couchbase://localhost', app.get('couchbase'));

  app.set('cluster', cluster);
};
