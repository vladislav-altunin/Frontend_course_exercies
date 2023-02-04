import React, {useState } from "react";

function TodoList () {

    const [todo, setTodo]  = useState({description: '', date: ''});
    const [todoList, setTodoList] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    
    //Add task 
    const addTodo = event => { // is the event param necessary?
        setIsClicked(true);
        setTodoList([...todoList, todo]);
        setTodo({description: '', date: ''})
    }

    //Input state
    const inputChanged = event => {
        setTodo({...todo,[event.target.name]:event.target.value});
    }

    if(!isClicked) {
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
                <table><tbody>
                    <tr><th>Date</th><th>Description</th></tr>
                    {todoList.map( (todo, index) => 
                        <tr key={index}>
                            <td>{todo.date}</td>
                            <td>{todo.description}</td>
                        </tr>
                    )}
                </tbody></table>
            </div>
        )
    }
}

export default TodoList;