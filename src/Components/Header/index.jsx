import React from "react";

import { NavLink } from "@mantine/core";

function Header (props) {

  return (
    <header data-testid="todo-header" style={{backgroundColor: 'blue', color: 'red', padding: '2rem 1rem', display: 'flex', justifyContent: 'flex-start'}}>
      <NavLink label='Home' component="a" href="/" />
      <NavLink label='Settings' component="a" href="/settings" />
    </header>
  )

}

export default Header;