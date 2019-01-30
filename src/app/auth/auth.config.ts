import { ENV } from "./../core/env.config";

interface AuthConfig {
  CLIENT_ID: string;
  CLIENT_DOMAIN: string;
  AUDIENCE: string;
  REDIRECT: string;
  SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
  CLIENT_ID: "vLUp4WlFO18koNR9DGiBBlGmQARkbH3f",
  CLIENT_DOMAIN: "rollcall-app.auth0.com", // e.g., you.auth0.com
  AUDIENCE: "https://rollcall-webapp.herokuapp.com", // e.g., http://localhost:8083/api/
  REDIRECT: `${ENV.BASE_URI}/callback`,
  SCOPE: "openid profile"
};
