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
        id="hideCompletedSwitch"
        data-testid="hideCompletedSwitch"
        checked={settings.hideCompleted}
        onChange={() => settings.setHideCompleted(!settings.hideCompleted)}
      />

      <NumberInput  
        defaultValue={settings.itemsPerPage}
        label='Tasks per Page'
        min={1}
        max={10}
        withAsterisk
        id="itemsPerPageInput"
        data-testid="itemsPerPageInput"
        onChange={(event) => {settings.setItemsPerPage(event)}}
      />

      <NativeSelect  
        data={['Assignee', 'Text', 'Difficulty']}
        label='Sort Tasks By'
        withAsterisk
        id="sortBySelect"
        data-testid="sortBySelect"
        onChange={(event) => {settings.setSortBy(event.target.value)}}
      />

      <button type='submit'>Save</button>    
    </form>
  )
}

export default SettingsPage;