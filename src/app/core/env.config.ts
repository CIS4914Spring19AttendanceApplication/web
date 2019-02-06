import { environment } from 'src/environments/environment';

const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = environment.production ? 'https://rollcall-api.herokuapp.com/api' : `http://localhost:8080/api`;

console.log(apiURI);

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};