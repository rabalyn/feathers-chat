const { CouchbaseService } = require('feathers-couchbase');

exports.Messages = class Messages extends CouchbaseService {
  constructor (options, app) {
    super({
      cluster: app.get('couchbaseCluster'),
      name: 'messages',
      ...options
    });
  }
};
