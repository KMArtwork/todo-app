import React, { useEffect, useState} from 'react';
import useForm from '../../Context/hooks/form';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';

import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SettingsPage from '../Settings';
import ItemForm from '../ItemForm';
import Auth from '../Auth/auth'

import { Group, Container, Title } from '@mantine/core';

const Todo = () => {

  const [defaultValues] = useState({difficulty: 4});
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);


  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log( JSON.stringify(item));

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo`, JSON.stringify(item), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response)
        setList([...list, item]);
      })
      .catch(error => {
        console.log(error)
      })

      
  }

  function deleteItem(id) {
    const items = list.filter( item => item._id !== id );
    

    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo/${id}`)
      .then(response => {
        console.log(response)
        setList(items);
      })
      .catch(error => {
        console.log(error)
      })
  }

  function toggleComplete(id) {

    let toggledItem;

    const items = list.map( item => {
      if ( item._id === id ) {
        item.complete = ! item.complete;
      }
      toggledItem = item;
      return item;
    });
    

    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo/${id}`, toggledItem)
      .then(response => {
        console.log(response);
        setList(items);
      })
      .catch(error => {
        console.log(error);
      })

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);
  
  // componentDidMount - fetches tasks from server / database when List component mounts
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo`)
      .then(response => {
        setList(response.data.results)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])

  // checks if there are any discrepancies between state and the database, updates accordingly
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo`)
      .then(response => {
        let dbTasks = [...response.data.results];
        let foundTasks = 0;

        dbTasks.forEach(dbTask => {
          list.forEach(task => {
            if (dbTask._id === task._id) {
              foundTasks = foundTasks + 1;
            }
          })
        })

        if (foundTasks !== list.length) {
          setList(response.data.results)
        } else {
          return 'Task List is currently up to date'
        }
      })
  }, [list])


  return (
    <>
      <Header data-testid="todo-header"/>
      <Auth>
        <BrowserRouter>
          <Routes>
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/' element={
              <>
                <Container data-testid='todoContainer' style={{backgroundColor: "#343a40", color: 'white', padding: '2rem'}}>
                  <Title order={2} align='center'>
                    To Do List: {incomplete} items pending
                  </Title>
                </Container>
                <Group position='apart' grow style={{margin: '2rem 5rem' }}>
                  <ItemForm handleSubmit={handleSubmit} handleChange={handleChange} incomplete={incomplete} />

                  <List data={list} toggleComplete={toggleComplete} deleteItem={deleteItem} />
                </Group>
              </>
            } />
          </Routes>
        </BrowserRouter>
      </Auth>
      <Footer />

    </>
  );
};

export default Todo;