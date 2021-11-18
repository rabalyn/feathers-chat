const { AuthenticationService, JWTStrategy, AuthenticationBaseStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } = require('@feathersjs/errors');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // You can also set the display name to profile.name
      name: profile.login,
      // The GitHub profile image
      avatar: profile.avatar_url,
      // The user email address (if available)
      email: profile.email
    };
  }
}

class NextAPIStrategy extends AuthenticationBaseStrategy {
  async parse (req) {
    const apiKey = req.headers['x-next-server-key'];

    if (apiKey) {
      return {
        strategy: this.name,
        apiKey
      };
    }

    return null;
  }
  
  authenticate (authentication) {
    const { apiKey } = authentication;

    if (apiKey !== 'supersecret') {
      throw new NotAuthenticated('Not allowed');
    }

    return {
      isNextServer: true
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());
  authentication.register('nextjs', new NextAPIStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
