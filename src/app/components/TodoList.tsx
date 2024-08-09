"use client";

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store'; 
import { fetchTodos, editTodo, removeTodo } from '../store/todoSlice';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Todo } from '../store/todoSlice';

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const searchTerm = useSelector((state: RootState) => state.todos.searchTerm);
  const status = useSelector((state: RootState) => state.todos.status);
  
  const [editMode, setEditMode] = React.useState<number | null>(null);
  const [editTitle, setEditTitle] = React.useState('');
  const [editDescription, setEditDescription] = React.useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleComplete = (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      dispatch(editTodo({ id, updates: { completed: !todo.completed } }));
    }
  };

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id));
  };

  const handleEditClick = (todo: Todo) => {
    setEditMode(todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSaveEdit = (id: number) => {
    dispatch(editTodo({
      id,
      updates: {
        title: editTitle,
        description: editDescription
      }
    }));
    setEditMode(null);
  };

  return (
    <List>
      {filteredTodos.map(todo => (
        <ListItem key={todo.id} disableGutters>
          {editMode === todo.id ? (
            <>
              <TextField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <Button onClick={() => handleSaveEdit(todo.id)}>Salvar</Button>
            </>
          ) : (
            <>
              <ListItemText
                primary={todo.title}
                secondary={todo.description}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => handleToggleComplete(todo.id)}>
                <CheckIcon color={todo.completed ? 'success' : 'disabled'} />
              </IconButton>
              <IconButton onClick={() => handleDelete(todo.id)}>
                <DeleteIcon color="error" />
              </IconButton>
              <Button onClick={() => handleEditClick(todo)}>Editar</Button>
            </>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
