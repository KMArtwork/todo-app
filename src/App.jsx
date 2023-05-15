import React from 'react';

import SettingsProvider from './Context/Settings';
import Todo from './Components/Todo';

function App () {
  
    return (
      <SettingsProvider>
        <Todo />
      </SettingsProvider>
    );
  
}

export default App;