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
    // setList([...list, item]);

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/todo`, JSON.stringify(item), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function deleteItem(id) {
    const items = list.filter( item => item.id !== id );
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map( item => {
      if ( item.id === id ) {
        item.complete = ! item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);  

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