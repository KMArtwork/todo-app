'use strict'

import SettingsProvider from "../Context/Settings";
import AuthProvider from "../Components/Auth/context";
import SettingsPage from "../Components/Settings";
import List from "../Components/List";
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

  // still figuring this one out
  xtest('Settings context is being passed into the List component', () => {
    render(
      <AuthProvider value={{isLoggedIn: true}}>
        <SettingsProvider value={values}>
          <List data={[{id:'test', assignee: 'me', complete: false, text: 'testtext', difficulty: 5}]}/>
        </SettingsProvider>        
      </AuthProvider>
      );

    let listEl = screen.getByTestId('listItems')
    expect(listEl).toBeVisible();
  })



})