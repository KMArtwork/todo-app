import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { SettingsContext } from "../../Context/Settings";
import { Pagination, Container } from '@mantine/core';
import ListItem from "../ListItem";
import Auth from "../Auth/auth";


function List (props) {
  const settings = useContext(SettingsContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [taskList, setTaskList] = useState([]);
  const [start, setStart] = useState(settings.itemsPerPage * (activePage - 1));
  const [end, setEnd] = useState(start + settings.itemsPerPage);


  // updates start index for displayed tasks from taskList
  useEffect(() => {
    setStart(settings.itemsPerPage * (activePage - 1))
  }, [activePage, settings.itemsPerPage])

  // updates end index for displayed tasks from taskList
  useEffect(() => {
    setEnd(start + settings.itemsPerPage)
  }, [start, settings.itemsPerPage])

  // sorts tasks by property
  useEffect(() => {
    props.data?.sort((a, b) => {
      if (a[settings.sortBy] < b[settings.sortBy]){
        return -1;
      }
      else if (a[settings.sortBy] > b[settings.sortBy]){
        return 1;
      }
      else return 0;
    })
  }, [props.data, settings.sortBy])

  // shows tasks based on if hideCompleted is true or false
  useEffect(() => {
    settings.hideCompleted ?
    setTaskList(
      props.data?.filter(item => !item.complete).slice(start, end)
    )
    : 
    setTaskList(
      props.data?.slice(start, end)
    );
  }, [settings.hideCompleted, props.data, start, end])

  // determines total amount of pages for <Pagination /> component
  useEffect(() => {
    settings.hideCompleted ? 
    setTotalPages(Math.ceil((props.data?.filter(item => !item.complete).length) / settings.itemsPerPage)) 
    : 
    setTotalPages(Math.ceil(props.data?.length / settings.itemsPerPage))
  }, [props.data, settings.hideCompleted, settings.itemsPerPage])

  return(
    <Auth capability='read'>
      <Container data-testid="listItems" key='listOfItems' style={{minWidth: '65%'}}>
        {taskList?.map(item => {
          return <ListItem key={item._id} item={item} toggleComplete={props.toggleComplete} deleteItem={props.deleteItem} />
        })}
        <Pagination key='itemsPagination' value={activePage} onChange={setActivePage} total={totalPages} />
      </Container>      
    </Auth>

  )


}

export default List;