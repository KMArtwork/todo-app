import React from "react";

import { Switch, NativeSelect, NumberInput, Card, Button, Stack, Container, Group, Title, Text} from '@mantine/core';
import { SettingsContext } from "../../Context/Settings";

function SettingsPage() {
  const settings = React.useContext(SettingsContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    settings.saveSettingsToLocalStorage();
  }
  
  return(
    
    <Container style={{padding: '2rem'}}>
      <Container data-testid='todoContainer' style={{backgroundColor: "#343a40", color: 'white', padding: '1.5rem', margin: '1rem 0'}}>
        <Title order={2} align='left'>
          ⚙ Manage Settings
        </Title>
      </Container>   

      <Group position="apart" grow style={{alignItems: 'flex-start'}}>

        <form onSubmit={handleSubmit}>
          <Card shadow="sm" radius='md' withBorder>
            <Stack size='xl'>
              <Title order={2} align='left'>
                Update Settings
              </Title>
              <Switch  
                label='Hide Completed Tasks'
                id="hideCompletedSwitch"
                data-testid="hideCompletedSwitch"
                size="md"
                checked={settings.hideCompleted}
                onChange={() => settings.setHideCompleted(!settings.hideCompleted)}
              />

              <NumberInput  
                defaultValue={settings.itemsPerPage}
                label='Tasks per Page'
                min={1}
                max={10}
                size="md"
                withAsterisk
                id="itemsPerPageInput"
                data-testid="itemsPerPageInput"
                onChange={(event) => {settings.setItemsPerPage(event)}}
              />

              <NativeSelect  
                data={['Assignee', 'Text', 'Difficulty']}
                label='Sort Tasks By'
                size="md"
                withAsterisk
                id="sortBySelect"
                data-testid="sortBySelect"
                onChange={(event) => {settings.setSortBy(event.target.value)}}
              />

              <Button size="md" type='submit'>Save</Button>
            </Stack>         
          </Card>
        </form>

          <Card shadow="sm" radius='md' withBorder>
            <Stack size='xl'>
              <Title order={2} align='left'>
                Current Settings
              </Title>
              <Text size='xl'>
                {settings.hideCompleted ? 'Hide Completed Tasks' : 'Show Completed Tasks'}
              </Text>
              <Text size='xl'>
                Items Per Page: {settings.itemsPerPage}
              </Text>
              <Text size='xl'>
                Sort By: {settings.sortBy}
              </Text>
            </Stack>
          </Card>

      </Group>
    </Container>

  )
}

export default SettingsPage;