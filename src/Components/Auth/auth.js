import React from 'react';
import {When} from 'react-if';

import { AuthContext } from './context.js';

function Auth (props) {

  const authContext = React.useContext(AuthContext);

    const isLoggedIn = authContext.isLoggedIn;
    const canDo = props.capability ? authContext.can(props.capability) : true;
    const okToRender = isLoggedIn && canDo;

    return (
      <When condition={okToRender}>
        {props.children}
      </When>
    );
}

export default Auth;