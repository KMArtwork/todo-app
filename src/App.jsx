import React from 'react';
import { MantineProvider } from '@mantine/core';

import SettingsProvider from './Context/Settings';
import AuthProvider from './Components/Auth/context';
import Todo from './Components/Todo';

function App () {
  
    return (
      <MantineProvider>
        <SettingsProvider>
          <AuthProvider>
            <Todo />
          </AuthProvider>
        </SettingsProvider>        
      </MantineProvider>
    );
  
}

export default App;