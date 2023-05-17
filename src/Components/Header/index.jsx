import React from "react";
import Login from "../Auth/login";

import { NavLink, Group } from "@mantine/core";

function Header (props) {

  return (
    <header data-testid="todo-header" style={{backgroundColor: 'blue', color: 'red', padding: '2rem 1rem', display: 'flex', justifyContent: 'flex-start'}}>
      <Group>
        <Group>
          <NavLink label='Home' component="a" href="/" />
          <NavLink label='Settings' component="a" href="/settings" />          
        </Group>
        <Login />
      </Group>

    </header>
  )

}

export default Header;