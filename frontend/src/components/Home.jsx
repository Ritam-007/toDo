import React, { useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() =>{
    const fetchtodos = async() =>{
      try {
        setLoading(true);
        const responce = await axios.get("http://localhost:4000/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          }
        })
        console.log(responce.data.todos);
        setTodos(responce.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to Todo Fetching!!!");
      } finally{
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  const todoCreate = async() => {
    if(!newTodo){
      return;
    }
    try {
      const responce = await axios.post("http://localhost:4000/todo/create", {
        text: newTodo,
        completed: false,
      } ,{
        withCredentials: true,
      });
      setTodos([...todos, responce.data.savedTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to Create Todo");
    }
  };

  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id)
    try {
      const responce = await axios.put(`http://localhost:4000/todo/update/${id}`, {
        ...todo,
        completed: !todo.completed,
      },
      {
        withCredentials: true,
      })
      setTodos(todos.map((t) => t._id === id ? responce.data.todo : t));
    } catch (error) {
      setError("Failed to Find Todo Status");
    }
  };

  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/todo/delete/${id}`, {withCredentials: true});
      setTodos(todos.filter((t)=>t._id!==id));
    } catch (error) {
      setError("Failed to Delete Todo!!");
    }
  };

  const navigateTo = useNavigate()

  const logout = async() => {
    try {
      await axios.post("http://localhost:4000/user/logout", {}, { withCredentials: true });
      toast.success("User Loggedout Successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error!!!");
    }
  }

  return (
    <div className='my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 lg:mx-auto p-10'>
      <h1 className='text-2xl font-semibold text-center'>My Todo</h1>

      <div className='flex mb-4'>
        <input
          type="text"
          placeholder='Add your Todo Here '
          className='flex-grow p-2 border rounded-l-md focus:outline-none'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}                    //the new text typed by user in input box , that text is stored in "setNewTodo" using "e.target.value"
          onKeyPress={(e)=>e.key==="Enter" && todoCreate()}
        />
        <button
          onClick={todoCreate}
          className='bg-orange-500 border rounded-r-md text-white px-4 py-2 hover:bg-orange-700 duration-300'
        >
          Add
        </button>
      </div>

    {loading?(<div className='text-center justify-center'><span className='text-blue-600 font-semibold'>Loading...</span></div>):error?(<div className='text-center text-red-700 font-semibold'>{error}</div>):(
      <ul className='space-y-2'>
      {
        todos.map((todo, index) => {
          return (
            <li key={todo._id || index} className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
              <div className='flex items-center'>
                <input
                  type="checkbox"
                  className='mr-2'
                  checked={todo.completed}
                  onChange={() => todoStatus(todo._id)}
                />
                <span className={`${todo.completed?"line-through text-gray-800 font-semibold":""}`}>{todo.text}</span>
              </div>
              <button
                onClick={() => todoDelete(todo._id)}
                className='text-red-500 hover:text-red-800 duration-300'
              >
                Delete
              </button>
            </li>
          )
        })
      }
      </ul>
    )}

      
      <p className='mt-4 text-center text-sm text-gray-600'>Todos Remaining : {todos.filter(todo => !todo.completed).length}</p>
      <button onClick={() => logout()} className='mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block'>Log Out</button>
    </div>
  );
}
