import React from "react";

import { Switch, NativeSelect, NumberInput } from '@mantine/core';
import { SettingsContext } from "../../Context/Settings";

function SettingsPage() {
  const settings = React.useContext(SettingsContext);

  return(
    <>
      <Switch  
        label='Show Completed Tasks'
      />

      <NumberInput  
        defaultValue={settings.itemsPerPage}
        label='Tasks per Page'
        min={1}
        max={10}
        withAsterisk
      />

      <NativeSelect  
        data={['Assigned To', 'Description', 'Difficulty', ]}
        label='Sort Tasks By'
        withAsterisk
      />    
    </>
  )
}

export default SettingsPage;