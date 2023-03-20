import React, { useState } from 'react';
import { flushSync } from 'react-dom';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

/*Testing table MUI*/
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
/*END Testing table MUI*/

/* Importing Roboto fonts*/
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
/* END Importing Roboto fonts*/

function TodoList() {
  const [todo, setTodo] = useState({ desc: '', date: '' });
  const [todoList, setTodoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  const [datePicker, setDatePicker] = useState({});

  //Add task
  const addTodo = () => {
    setIsClicked(true);
    setTodoList([...todoList, todo]);
    setTodo({ ...todo, desc: '' });
    setDatePicker({});
  };

  //Delete task
  const deleteTodo = index => {
    setTodoList(todoList.filter((todo, i) => i !== index));
  };

  //Picker changed
  const pickerChanged = pickerObject => {
    setDatePicker(pickerObject);
    setTodo({ ...todo, date: pickerObject.$d.toLocaleDateString('fi-FI') });
  };

  if (!isClicked || todoList.length === 0) {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h3" gutterBottom>
            New task
          </Typography>
          <Stack direction="row" spacing={2} style={{ marginBottom: '50px' }}>
            <TextField
              label="Description"
              value={todo.desc}
              onChange={event => {
                setTodo({ ...todo, desc: event.target.value });
              }}
            />
            <DatePicker
              value={datePicker}
              onChange={pickerObj => pickerChanged(pickerObj)}
            />
            <Button size="large" variant="outlined" onClick={addTodo}>
              Add
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
          }}
        >
          <Typography variant="h3" gutterBottom>
            New task
          </Typography>
          <Stack direction="row" spacing={2} style={{ marginBottom: '50px' }}>
            <TextField
              label="Description"
              value={todo.desc}
              onChange={event => {
                setTodo({ ...todo, desc: event.target.value });
              }}
            />
            <DatePicker
              value={datePicker}
              onChange={pickerObj => pickerChanged(pickerObj)}
            />
            <Button size="large" variant="outlined" onClick={addTodo}>
              Add
            </Button>
          </Stack>
          <Typography variant="h6" gutterBottom>
            To-do list
          </Typography>
          <TableContainer component={Paper} style={{ width: '50%' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todoList.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="right">
                      {row.date}
                    </TableCell>
                    <TableCell align="left">{row.desc}</TableCell>
                    <TableCell align="right">
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => {
                          deleteTodo(index);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </LocalizationProvider>
    );
  }
}

export default TodoList;
