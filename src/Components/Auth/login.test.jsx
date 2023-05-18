'use strict';

import Login from "./login";
import AuthProvider from "./context";
import { AuthContext } from "./context";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('Testing login.js...', () => {

  let values = {login: jest.fn(), isLoggedIn: true}

  test('Logout button should be visible when user is logged in', () => {
    render(
      <AuthContext.Provider value={values}>
        <Login />
      </AuthContext.Provider>
    )

    expect(screen.queryByTestId('logoutButton')).toBeVisible();
  })

  test('Login button should be visible when user is logged out', () => {
    values.isLoggedIn = false;
    render(
      <AuthContext.Provider value={values}>
        <Login />
      </AuthContext.Provider>
    )

    expect(screen.queryByTestId('loginButton')).toBeVisible();
  })

  test("Auth Context's login function should be called on submit event", () => {
    values.isLoggedIn = false;
    render(
      <AuthContext.Provider value={values}>
        <Login />
      </AuthContext.Provider>
    )

    expect(screen.queryByTestId('loginButton')).toBeVisible();
    userEvent.click(screen.queryByTestId('loginButton'));
    expect(values.login).toBeCalled();
  })

})