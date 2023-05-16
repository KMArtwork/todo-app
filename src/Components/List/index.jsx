import React, { useContext, useEffect, useState } from "react";

import { SettingsContext } from "../../Context/Settings";
import { Container, MantineProvider } from "@mantine/core";
import { Pagination, Group } from '@mantine/core';

import Header from "../Header";

function List (props) {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);

  const renderedList = settings.hideCompleted ? props.data : props.data.filter(item => !item.complete)

  const itemsPerPage = settings.itemsPerPage;
  let listStart = itemsPerPage * (activePage - 1);
  let listEnd = listStart + itemsPerPage;
  const displayedList = renderedList ? renderedList.slice(listStart, listEnd) : [];
  



  let shownTasks = [];

  useEffect(() => {
    shownTasks = [];

    if (activePage === 1){
      for(let i = 0; i < settings.itemsPerPage; i++){
        if(props.data[i]){
          shownTasks.push(props.data[i]);        
        }
      }
    }
    else {
      for(
        let i = settings.itemsPerPage * (activePage - 1); 
        i < (settings.itemsPerPage * activePage);
        i++
        ) {
          if(props.data[i]){
            shownTasks.push(props.data[i]);
          }
        }
    }

    console.log(shownTasks);
  }, [activePage])

  // useEffect(() => {
  //   props.data.sort((a, b) => {
  //     if (a[settings.sortBy] < b[settings.sortBy]){
  //       return -1;
  //     }
  //     else if (a[settings.sortBy] > b[settings.sortBy]){
  //       return 1;
  //     }
  //     else return 0;
  //   })
  // }, [props.data])

  return(
    // if 'hideCompleted' is true, only show pending tasks. if 'hideCompleted' is false, show all tasks
    // settings.hideCompleted ?
    <>
    {displayedList.map(item => {
      return <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
      </div>
    })}
    <Pagination value={activePage} onChange={setActivePage} total={5} />
    </>
    // <Container>
    //   <MantineProvider>

    //   {/* {props.data.map(item => {
    //     if(!item.complete){
    //       return <Container key={item.id}>
    //         <p>{item.text}</p>
    //         <p><small>Assigned to: {item.assignee}</small></p>
    //         <p><small>Difficulty: {item.difficulty}</small></p>
    //         <Container onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</Container>
    //         <hr />
    //       </Container>        
    //     }
    //   })} */}

    //   </MantineProvider>    
    // </Container>
    // :
    // props.data.map(item => (
    //   <div key={item.id}>
    //     <p>{item.text}</p>
    //     <p><small>Assigned to: {item.assignee}</small></p>
    //     <p><small>Difficulty: {item.difficulty}</small></p>
    //     <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
    //     <hr />
    //   </div>
    // ))
  )


}

export default List;