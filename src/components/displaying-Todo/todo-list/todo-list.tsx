import React, { FC } from 'react';
import './todo-list.css';
import Todo from '../todo/todo';

interface Todos{
  id:number,
  task:string,
  date:string,
  note:string,
  status:string
}
interface TodoListProps {
  todos:Todos[];
  editTodo:(id:number)=>void;
  deleteTodo:(id:number)=>void;
}

const TodoList: FC<TodoListProps> = ({todos,editTodo,deleteTodo}) => {

  return(
    <table>
      <thead>
      <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Date</th>
          <th>Note</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {
          todos.map((todo:any)=>
            <Todo key={todo.id} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo}/>
          )
        }
      </tbody>
    </table>
  )
}

export default TodoList;
