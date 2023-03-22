import React, { useState } from 'react';
import TodoTable from './TodoTable';
import { useRef } from 'react';

/* Fonts, colours and icons*/
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { pink } from '@mui/material/colors';

/* Components*/
import { Button, Stack, TextField, Typography } from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function TodoInputAndTable() {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todoList, setTodoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [datePicker, setDatePicker] = useState({});
  const gridRef = useRef();
  const columns = [
    {
      field: 'description',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }, // field prop defines where to get cell data from
    {
      field: 'date',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true,
    }, // headerName prop can be used to define custom col names
    {
      field: 'priority',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: true, // Must be filter: true in order to enable floatingFilter
      cellStyle: params =>
        params.value === 'High' ? { color: 'red' } : { color: 'black' },
    }, // cell text is red if the value is "High"
  ];

  //Add task
  const addTodo = () => {
    setIsClicked(true);
    setTodoList([...todoList, todo]);
    setTodo({ description: '', date: '', priority: '' });
    setDatePicker({});
  };

  //Delete task
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodoList(
        todoList.filter(
          (todo, i) => i !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert('No row chosen!');
    }
  };

  //Input state
  const inputChanged = event => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  //Handles date picker state change, gets date string
  const pickerChanged = pickerObj => {
    setDatePicker(pickerObj);
    setTodo({ ...todo, date: pickerObj.$d.toLocaleDateString('fi-FI') });
  };

  if (!isClicked || todoList.length === 0) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack direction="row" spacing={0.5} style={{ marginBottom: '50px' }}>
            <div>
              <TextField
                name="description"
                type="text"
                size="medium"
                id="standard-basic"
                label="Description"
                variant="outlined"
                value={todo.description}
                onChange={inputChanged}
                sx={{ marginRight: '10px' }}
              />
              <DatePicker
                label="Date"
                value={datePicker}
                onChange={event => pickerChanged(event)}
                sx={{ marginRight: '10px' }}
              />
              <TextField
                name="priority"
                id="standard-basic"
                label="Priority"
                variant="outlined"
                type="text"
                value={todo.priority}
                onChange={inputChanged}
                sx={{ marginRight: '10px' }}
              />
            </div>
            <Button onClick={addTodo} size="large" variant="outlined">
              Add
            </Button>
            <Button
              onClick={deleteTodo}
              size="large"
              variant="outlined"
              color="error"
            >
              Delete
              <DeleteIcon
                fontSize="small"
                sx={{ color: pink[500], marginLeft: '5px' }}
              />
            </Button>
          </Stack>
        </div>
      </LocalizationProvider>
    );
  } else {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack direction="row" spacing={0.5} style={{ marginBottom: '50px' }}>
            <div>
              <TextField
                name="description"
                type="text"
                id="standard-basic"
                label="Description"
                variant="outlined"
                value={todo.description}
                onChange={inputChanged}
                sx={{ marginRight: '10px' }}
              />
              <DatePicker
                label="Date"
                value={datePicker}
                onChange={event => pickerChanged(event)}
                sx={{ marginRight: '10px' }}
              />
              <TextField
                id="standard-basic"
                label="Priority"
                variant="outlined"
                name="priority"
                type="text"
                value={todo.priority}
                onChange={inputChanged}
                sx={{ marginRight: '10px' }}
              />
            </div>
            <Button onClick={addTodo} size="large" variant="outlined">
              Add
            </Button>
            <Button
              onClick={deleteTodo}
              size="large"
              variant="outlined"
              color="error"
            >
              Delete
              <DeleteIcon sx={{ color: pink[500], marginLeft: '5px' }} />
            </Button>
          </Stack>
          <Typography variant="h6" sx={{ padding: '10px' }} gutterBottom>
            To-do list
          </Typography>
        </div>
        <TodoTable
          todoList={todoList}
          deleteTodo={deleteTodo}
          gridRef={gridRef}
          columns={columns}
        />
      </LocalizationProvider>
    );
  }
}
