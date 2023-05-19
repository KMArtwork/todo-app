import React from 'react';
import {When} from 'react-if';
import { PasswordInput, TextInput, Button } from '@mantine/core';

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
        <Button color='red' data-testid='logoutButton' onClick={authContext.logout} style={{maxWidth: '100px'}}>Log Out</Button>
      </When>

      <When condition={!authContext.isLoggedIn}>
  
        <form onSubmit={handleSubmit}>
          <div style={{display: 'flex', justifyContent: 'space-between'}} >     
            <TextInput
              placeholder="Username"
              name="username"
              size='md'
              onChange={(event) => {setUsername(event.target.value)}}
              style={{width: '40%'}}
            />
            <PasswordInput
              placeholder="Password"
              name="password"
              size='md'
              onChange={(event) => setPassword(event.target.value)}
              style={{width: '40%'}}
            />
            <Button color='dark' data-testid='loginButton' type='submit' size='md' >Login</Button>          
          </div>
        </form>

      </When>
    </>
  );

}

export default Login;