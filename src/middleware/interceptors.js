import axios from 'axios';

//checks for auth and will return angrily if they are not, unless it's in the array of acepted urls
axios.interceptors.request.use(function (config) {
  // exempts from auth check based on certain routes that do not require, like register
  if(!['/ip', '/register', '/oauthcheck', '/auth', '/login'].includes(config.url)) {
    if($cookies.get('token') == null || $cookies.get('username') == null) {
      throw new axios.Cancel('User is not verified');
    }
  }
  return config;
  }, function (error) {
    return Promise.reject(error);
  });

  export default axios;