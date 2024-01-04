import React, { FC } from 'react';
import './todo.css';
import Icon from '@mdi/react';
import { mdiDeleteAlert } from '@mdi/js';
import { mdiPencilBox } from '@mdi/js';


interface Todo{
  id:number,
  task:string,
  date:string,
  note:string,
  status:string
}
interface TodoProps {
  todo:Todo;
  editTodo:(id:number)=>void;
  deleteTodo:(id:number)=>void;
}

const Todo: FC<TodoProps> = ({todo,editTodo,deleteTodo}) => {

  const handleEditClick = () => {
    editTodo(todo.id);
  };

  const handleDeleteClick = () => {
    deleteTodo(todo.id);
  };
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.task}</td>
      <td>{todo.date}</td>
      <td>{todo.note}</td>
      <td>{todo.status}</td>
      <td><button onClick={handleEditClick}><Icon path={mdiPencilBox} size={1} horizontal
      vertical
      rotate={90}
      color="blue"
      spin  /></button></td>
      <td><button onClick={handleDeleteClick}><Icon path={mdiDeleteAlert} size={1}
      className="icons"
      horizontal
      vertical
      rotate={90}
      color="red"
      spin /></button></td>
    </tr>
  )
}

export default Todo;
