const _isDev = window.location.port.indexOf('4200') < -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};
console.log(_isDev);
const apiURI = 'https://rollcall-api.herokuapp.com/api';

export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI
};