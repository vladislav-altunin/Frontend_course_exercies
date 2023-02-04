import React, {useState } from "react";
import TodoTable from "./TodoTable";

function TodoList () {

    const [todo, setTodo]  = useState({description: '', date: ''});
    const [todoList, setTodoList] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    //Add task 
    const addTodo = event => { // is the event param necessary?
        setIsClicked(true);
        setTodoList([...todoList, todo]);
        setTodo({description: '', date: ''});
    }

    //Delete task
    const deleteTodo = (index) => {
        setTodoList(todoList.filter( (todo, i) => i !== index))
    }

    //Input state
    const inputChanged = event => {
        setTodo({...todo,[event.target.name]:event.target.value});
    }

    //Delete 

    if(!isClicked || todoList.length === 0) {
        return (
            <div>
                <h1>Simple Todolist</h1>
                Description: <input name="description" type="text" value={todo.description} onChange={inputChanged} />
                Date: <input name="date" type="text" value={todo.date} onChange={inputChanged}/>
                <button onClick={addTodo}>Add</button>
            </div>
        )
    }
    else {
        return(
            <div>
                <h1>Simple Todolist</h1>
                Description: <input name="description" type="text" value={todo.description} onChange={inputChanged} />
                Date: <input name="date" type="text" value={todo.date} onChange={inputChanged}/>
                <button onClick={addTodo}>Add</button>
                <TodoTable todoList={todoList} deleteTodo={deleteTodo}/>
            </div>
        )
    }
}

export default TodoList;