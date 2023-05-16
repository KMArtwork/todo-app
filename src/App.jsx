import React from 'react';
import { MantineProvider } from '@mantine/core';

import SettingsProvider from './Context/Settings';
import Todo from './Components/Todo';

function App () {
  
    return (
      <MantineProvider theme={{colorScheme: 'dark'}}>
        <SettingsProvider>
          <Todo />
        </SettingsProvider>        
      </MantineProvider>
    );
  
}

export default App;