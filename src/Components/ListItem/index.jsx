import React from "react";
import Auth from "../Auth/auth";

import { Card, Text, Badge, Button, Group, CardSection, Container } from '@mantine/core';

function ListItem (props) {

  return(
    <Card data-testid='listItem' shadow="sm" radius='md' withBorder>

      <Card.Section withBorder>
          <Group className="listItemHeader" position="apart" style={{paddingLeft: '1rem'}}>
            <Group spacing='xl'>
              {props.item.complete ? 
              <Badge color="red" variant="filled">Complete</Badge> 
              : 
              <Badge color="green" variant="filled">Pending</Badge>
              }
              <Text fw={500}>{props.item.assignee}</Text>            
            </Group>
            <Auth capability='delete'>
              <Button color="red" size='xs' onClick={() => props.deleteItem(props.item.id)}>X</Button>              
            </Auth>
          </Group>
      </Card.Section>

      <Card.Section withBorder>
        <Container size='97.5%' px={0}>
          <Text>{props.item.text}</Text>
          <Text align="right">Difficulty: {props.item.difficulty}</Text>          
        </Container>

      </Card.Section>
      <CardSection>
        <Group position='right' >
          <Auth capability='update'>
            <Button onClick={() => props.toggleComplete(props.item.id)}>Complete</Button>             
          </Auth>
        </Group>
      </CardSection>
    </Card>
  )

}

export default ListItem;