import React from "react";

import { Switch, NativeSelect, NumberInput } from '@mantine/core';
import { SettingsContext } from "../../Context/Settings";

function SettingsPage() {
  const settings = React.useContext(SettingsContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    settings.saveSettingsToLocalStorage();
  }
  
  return(
    <form onSubmit={handleSubmit}>
      <Switch  
        label='Hide Completed Tasks'
        id="hideCompleted"
        checked={settings.hideCompleted}
        onChange={() => settings.setHideCompleted(!settings.hideCompleted)}
      />

      <NumberInput  
        defaultValue={settings.itemsPerPage}
        label='Tasks per Page'
        min={1}
        max={10}
        withAsterisk
        id="itemsPerPage"
        onChange={(event) => {settings.setItemsPerPage(event)}}
      />

      <NativeSelect  
        data={['Assignee', 'Text', 'Difficulty']}
        label='Sort Tasks By'
        withAsterisk
        onChange={(event) => {settings.setSortBy(event.target.value)}}
      />

      <button type='submit'>Save</button>    
    </form>
  )
}

export default SettingsPage;