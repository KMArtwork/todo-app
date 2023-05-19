'use strict'

import SettingsProvider from "../Context/Settings";
import AuthProvider from "../Components/Auth/context";
import { AuthContext } from "../Components/Auth/context";
import Auth from "../Components/Auth/auth";
import SettingsPage from "../Components/Settings";
import Todo from "../Components/Todo";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('Testing App integration and context behavior', () => {

  let values = {itemsPerPage: 3, hideCompleted: true, sortBy: 'difficulty'}

  test('Settings context is being passed into Settings component', () => {
    render(
    <SettingsProvider value={values}>
      <SettingsPage />
    </SettingsProvider>
    );

    let switchEl = screen.getByTestId('hideCompletedSwitch');
    expect(switchEl).toBeVisible();
    expect(switchEl.checked).toBe(true);

    let itemsPerPageEl = screen.getByTestId('itemsPerPageInput');
    expect(itemsPerPageEl).toBeVisible();
    expect(itemsPerPageEl.value).toBe('3');

    let sortBySelect = screen.getByTestId('sortBySelect');
    expect(sortBySelect).toBeVisible();
    expect(sortBySelect.value).toBe('Assignee');

  })

  test('Auth context is will correctly render <Todo /> component when loggedin', () => {
    render(
      <AuthContext.Provider value={{isLoggedIn: true, can: jest.fn()}}>
        <SettingsProvider value={values}>
          <Todo  />
        </SettingsProvider>        
      </AuthContext.Provider>
      );

    let listEl = screen.queryByTestId('todoContainer')
    expect(listEl).toBeVisible();
  })

  test('Auth context is will correctly render <Todo /> component when logged out', () => {
    render(
      <AuthContext.Provider value={{isLoggedIn: false, can: jest.fn()}}>
        <SettingsProvider value={values}>
          <Todo  />
        </SettingsProvider>        
      </AuthContext.Provider>
      );

    expect(screen.queryByTestId('todoContainer')).toBeFalsy();
  })



})