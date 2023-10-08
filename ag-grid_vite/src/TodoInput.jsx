import React, { useState } from 'react';
import TodoTable from './TodoTable';
import { useRef } from 'react';

function TodoInput() {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todoList, setTodoList] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const gridRef = useRef();

  const columns = [
    {
      field: 'description',
      sortable: false,
      filter: true,
      floatingFilter: true,
      resizable: false,
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
    // is the event param necessary?
    setIsClicked(true);
    setTodoList([...todoList, todo]);
    setTodo({ description: '', date: '', priority: '' });
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

  if (!isClicked || todoList.length === 0) {
    return (
      <div style={{ height: '500px', width: '70%', margin: 'auto' }}>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={todo.description}
          onChange={inputChanged}
        />
        <input
          name="date"
          type="text"
          placeholder="Date"
          value={todo.date}
          onChange={inputChanged}
        />
        <input
          name="priority"
          placeholder="Priority"
          type="text"
          value={todo.priority}
          onChange={inputChanged}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
      </div>
    );
  } else {
    return (
      <div style={{ height: '500px', width: '70%' }}>
        <input
          name="description"
          type="text"
          placeholder="Description"
          value={todo.description}
          onChange={inputChanged}
        />
        <input
          name="date"
          type="text"
          placeholder="Date"
          value={todo.date}
          onChange={inputChanged}
        />
        <input
          name="priority"
          placeholder="Priority"
          type="text"
          value={todo.priority}
          onChange={inputChanged}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={deleteTodo}>Delete</button>
        <TodoTable
          todoList={todoList}
          deleteTodo={deleteTodo}
          gridRef={gridRef}
          columns={columns}
        />
      </div>
    );
  }
}

export default TodoInput;
