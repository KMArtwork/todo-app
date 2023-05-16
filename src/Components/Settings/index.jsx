import React from "react";

import { Switch, NativeSelect, NumberInput } from '@mantine/core';
import { SettingsContext } from "../../Context/Settings";

function SettingsPage() {
  const settings = React.useContext(SettingsContext);
  console.log('SETTINGS: ', settings);

  const [itemsPerPage, setItemsPerPage] = React.useState(settings.itemsPerPage);
  const [hideCompleted, setHideCompleted] = React.useState(settings.hideCompleted);
  const [sortBy, setSortBy] = React.useState(settings.sortBy);

  const handleSubmit = (event) => {
    event.preventDefault();

    settings.setHideCompleted(hideCompleted);
    settings.setItemsPerPage(itemsPerPage);
    settings.setSortBy(sortBy);
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <Switch  
        label='Hide Completed Tasks'
        id="hideCompleted"
        checked={hideCompleted}
        onChange={() => setHideCompleted(!hideCompleted)}
      />

      <NumberInput  
        defaultValue={settings.itemsPerPage}
        label='Tasks per Page'
        min={1}
        max={10}
        withAsterisk
        id="itemsPerPage"
        onChange={(event) => {setItemsPerPage(event)}}
      />

      <NativeSelect  
        data={['Assigned To', 'Description', 'Difficulty', ]}
        label='Sort Tasks By'
        withAsterisk
        onChange={(event) => {setSortBy(event.target.value)}}
      />

      <button type='submit'>Save</button>    
    </form>
  )
}

export default SettingsPage;