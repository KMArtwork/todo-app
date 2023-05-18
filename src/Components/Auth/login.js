import React from 'react';
import {When} from 'react-if';

import { AuthContext } from './context.js';

function Login (props) {
  let authContext = React.useContext(AuthContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    authContext.login(username, password);
  };

  return (
    <>
      <When condition={authContext.isLoggedIn}>
        <button data-testid='logoutButton' onClick={authContext.logout}>Log Out</button>
      </When>

      <When condition={!authContext.isLoggedIn}>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="UserName"
            name="username"
            onChange={(event) => {setUsername(event.target.value)}}
          />
          <input
            placeholder="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <button data-testid='loginButton' >Login</button>
        </form>
      </When>
    </>
  );

}

export default Login;