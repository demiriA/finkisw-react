import cookie from 'react-cookies';

class Auth {
  constructor(){
    this.authenticated = false;
  }

  login(cb){
    this.authenticated = true;
    cb();
  }

  logout(cb){
    this.authenticated = false;
    cb();
  }

  isAuthenticated(){
    if(cookie.load("USER_SESSION") !== undefined){
      return true;
    }
    return this.authenticated;
  }

}

export default new Auth();
