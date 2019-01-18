interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'vLUp4WlFO18koNR9DGiBBlGmQARkbH3f',
  domain: 'rollcall-app.auth0.com',
  callbackURL: 'http://localhost:3000/callback'
};
