import React, { FC, useEffect, useRef, useState } from 'react';
import './home.css';
import TodoList from '../displaying-Todo/todo-list/todo-list';
import {useNavigate} from 'react-router';
import {useParams} from 'react-router-dom';
import { successToast,errorToast } from '../../toasters/toasters';
interface Todo{
  id:number,
  task:string,
  date:string,
  note:string,
  status:string
}
interface HomeProps { }

const Home: FC<HomeProps> = () => {

  const [todos,setTodos]=useState<Todo[]>([]);
  const [isEditing,setIsEditing]=useState(false);
  const [editId,setEditId]=useState(0);
  const formRef=useRef<HTMLFormElement>(null);
  const {name}=useParams();
  const navigate=useNavigate();
  const addTodo=(e:any)=>{
    e.preventDefault();
    if(!isEditing){
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodoItem={
      id:newId,
      task:e.target.task.value,
      date:e.target.date.value,
      note:e.target.note.value,
      status:e.target.status.value
    }
    setTodos([...todos,newTodoItem]);
    successToast("Todo Added Successfully")

    }
    else{
        setTodos(todos.map((todo)=>{
            if(todo.id===editId){
              return ({...todo,id:editId,task:e.target.task.value,
              date:e.target.date.value,note:e.target.note.value,status:e.target.status.value})
            }
            else{
              return todo
            }
          })
        )
        successToast("Todo Edited Successfully");
        setIsEditing(false);

    }
    if(formRef.current){
      formRef.current.reset();
    }
  }

  const editTodo=(id:number)=>{
    const selected:Todo[] = todos.filter((todo) => todo.id === id);
    if(formRef.current){
        formRef.current.task.value=selected[0].task;
        formRef.current.date.value=selected[0].date;
        formRef.current.note.value=selected[0].note;
        formRef.current.status.value=selected[0].status;
    }
    setEditId(id);
    setIsEditing(true);
  } 

  const deleteTodo=(id:number)=>{
    console.log(id);
    if(window.confirm("Are You sure to delete")===true){
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    successToast("Todo Deleted Successfully")
    }
  }

  const signOut=()=>{
    console.log(localStorage.getItem('username'));
    localStorage.removeItem('username');
    successToast("Logged out successfully");
    navigate('/');
  }
  return (
    <div className="home" data-testid="Home">
      <div className='topnav'>
        <nav>
          <ul>
          <li className='username'> Welcome To The Home Page,{name}</li>
            <li><a onClick={signOut}>SignOut</a></li>
            <li><a onClick={()=>navigate('/register')}>Register Your Friend</a></li>
          </ul>
        </nav>
      </div>

      <div className='footer'>
        <div className='sidenav'>
          <nav>
            <ul>
              <li><a onClick={signOut}>SignOut</a></li>
              <li><a onClick={()=>navigate('/register')}>Register Your Friend</a></li>
            </ul>
          </nav>
        </div>
        <div className='todo'>
          <div className='todo-form'>
            <form onSubmit={addTodo} ref={formRef}>
              <div className="form-group">
              <h2>Add Your Todo</h2>
                <input type="text" name="task" placeholder='Enter Your Task' required />
              </div>
              <div className="form-group">
                
                <input type="date"  name="date" placeholder='Enter The Date' min={new Date().toISOString().slice(0, 10)}  required/>
              </div>
              <div className="form-group">
                <textarea  name="note" placeholder='Enter Your Note' required></textarea>
              </div>
              <div className="form-group">
                <select  name="status" required>
                  <option value=''>Select The Status of your Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
              <div className="form-group">
                {!isEditing ? <button type="submit">Add</button> : <button type='submit'>Save</button>}
                <button type="reset">Reset</button>
              </div>
            </form>
          </div>
          <div className='todolist'>
          {todos.length > 0 ? <TodoList todos={todos} editTodo={editTodo} deleteTodo={deleteTodo} /> : <h1 className='todoheading'>No Todos yet! Add Now To Track Your Work</h1>}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home;
