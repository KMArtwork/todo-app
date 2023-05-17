import React from "react";
import { TextInput, NumberInput, Button } from '@mantine/core';

function AddItemForm (props) {

  return(
    <form onSubmit={props.handleSubmit}>

      <h2>Add To Do Item</h2>
      <h4>To Do List: {props.incomplete} items pending</h4>

      <TextInput 
        name="text" 
        placeholder="Task Description" 
        label="Task" 
        withAsterisk 
        onChange={props.handleChange}
      />

      <TextInput 
        name="assignee" 
        placeholder="Name" 
        label="Assign To" 
        withAsterisk
        onChange={props.handleChange} 
      />

      <NumberInput  
        defaultValue={3} 
        label="Difficulty" 
        withAsterisk 
        min={1} 
        max={5}
        onChange={props.handleChange} 
      />

      <Button type="submit" >Add Item</Button>
    </form>
  )
}

export default AddItemForm 