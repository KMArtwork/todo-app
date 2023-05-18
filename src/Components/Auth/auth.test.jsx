'use strict'

import Auth from "./auth";
import {AuthContext, AuthProvider} from "./context";
import ListItem from "../ListItem";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Testing Auth component...', () => {

  let values = {isLoggedIn: true, can: jest.fn()}

  test('Can render components that require Authorization', () => {
    render(
      <AuthContext.Provider value={values}>
        <Auth>
          <ListItem item={{id: 'test', difficulty: 5, complete: false, assignee: 'me', text: 'text'}} />
        </Auth>
      </AuthContext.Provider>
    );

    expect(screen.queryByTestId('listItem')).toBeVisible();
  })

  test('Will not render component if not logged in', () => {
    values.isLoggedIn = false;
    render(
      <AuthContext.Provider value={values}>
        <Auth>
          <ListItem item={{id: 'test', difficulty: 5, complete: false, assignee: 'me', text: 'text'}} />
        </Auth>
      </AuthContext.Provider>
    );

    expect(screen.queryByTestId('listItem')).toBeFalsy();
  })

})