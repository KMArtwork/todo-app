'use strict'

import React from 'react';
import App from '../../App';
import Login from './login';
import {AuthProvider, AuthContext} from './context';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Todo from '../Todo';

describe('Unit test for Auth Context object...', () => {

  test('Can modify state (isLoggedIn, user, error, token)', () => {
    
  })

})