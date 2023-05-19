import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const AuthContext = React.createContext();

function AuthProvider (props) {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState({ capabilities: [] })
  const [error, setError] = React.useState(null)
  const [token, setToken] = React.useState(undefined)

  const setLoginState = (loggedIn, token, user, error) => {
    cookie.save('auth', token);
    setIsLoggedIn(loggedIn);
    setToken(token);
    setUser(user);
    setError(error || null);
  };

  const validateToken = (token) => {
    try {
      let validUser = jwt_decode(token);
      setLoginState(true, token, validUser);
    }
    catch (e) {
      setLoginState(false, null, {}, e);
      console.log('Token Validation Error', e);
    }

  };

  const can = (capability) => {
    return user.capabilities?.includes(capability);
  }

  const login = async (username, password) => {

    let credentials = {
      auth: {
        username,
        password        
      }
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/signin`, {}, credentials)
      .then(response => {
        validateToken(response.data.token)
      })
      .catch(error => {
        setLoginState(isLoggedIn, token, user, error);
        console.error(error);
      })
  }

  const logout = () => {
    setLoginState(false, null, {});
  };

  // "componentDidMount"
  React.useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    validateToken(token);    
  // eslint-disable-next-line
  }, [])


  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, can, error}}>
      {props.children}
    </AuthContext.Provider>
  );
  
}

export default AuthProvider;