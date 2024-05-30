import React,{Fragment,useEffect,useState} from 'react';
//component
import EditTodo from './EditTodo';

function ListTodo() {

    const [todos,setTodos] = useState([]);

    async function deleteTodo(id){
        try {
            // eslint-disable-next-line
            const  deleteTodo = await fetch(`http://localhost:5001/todos/${id}`,{
                method: "DELETE"
            });
            setTodos(todos.filter(todo => todo.tid !== id));
        } catch (error) {
            console.error(error.message);
        }
    }

    async function getTodos(){
        try {
            const response = await fetch("http://localhost:5001/todos");
            const jsonData = await response.json();
            setTodos(jsonData); 
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(()=>{
        getTodos();
    },[]);

  return (

   <Fragment>
    {" "}
   <table className="table text-center mt-5">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
     {/*
     <tr>
        <td>John</td>
        <td>Doe</td>
        <td>john@example.com</td>
      </tr>
    */}

    {todos.map(todo => (
        <tr key={todo.tid}>
            <td>{todo.description}</td>
            <td><EditTodo todo={todo} /></td>
            <td><button className='btn btn-danger' onClick={()=>{
                deleteTodo(todo.tid)
            }}>Delete</button></td>
        </tr>
    ))}
    </tbody>
   </table>
   </Fragment>
        
  )
}

export default ListTodo;
