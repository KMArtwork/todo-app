import React from "react";
import Login from "../Auth/login";

import { Anchor, Group } from "@mantine/core";

function Header (props) {

  return (
    <header data-testid="todo-header" style={{backgroundColor: 'cyan', color: 'red', padding: '2rem 1rem'}}>
      <Group position="apart">
        <Group>
          <Anchor  href="/">Home</Anchor>
          <Anchor  href="/settings">Settings</Anchor>       
        </Group>
        <Login />
      </Group>

    </header>
  )

}

export default Header;