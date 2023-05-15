import React, { useContext, useEffect } from "react";

import { SettingsContext } from "../../Context/Settings";

function List (props) {

  const settings = useContext(SettingsContext);

  useEffect(() => {
    props.data.sort((a, b) => {
      if (a[settings.sortBy] < b[settings.sortBy]){
        return -1;
      }
      else if (a[settings.sortBy] > b[settings.sortBy]){
        return 1;
      }
      else return 0;
    })
  }, [props.data])

  return(
    // if 'hideCompleted' is true, only show pending tasks. if 'hideCompleted' is false, show all tasks
    settings.hideCompleted ? 
    props.data.map(item => {
      if(!item.complete){
        return <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>        
      }
    })
    :
    props.data.map(item => (
      <div key={item.id}>
        <p>{item.text}</p>
        <p><small>Assigned to: {item.assignee}</small></p>
        <p><small>Difficulty: {item.difficulty}</small></p>
        <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        <hr />
      </div>
    ))
  )


}

export default List;