import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const testUsers = {
  Administrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

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

    // let foundUser = testUsers[username];
    // if (foundUser && foundUser.password === password) {
    //   try {
    //     validateToken(foundUser.token);
    //   } catch (e) {
    //     setLoginState(isLoggedIn, token, user, e);
    //     console.error(e);
    //   }
    // }
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