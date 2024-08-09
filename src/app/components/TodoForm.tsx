"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Importe o tipo AppDispatch
import { createTodo } from '../store/todoSlice'; // Corrija o caminho conforme sua estrutura
import { TextField, Button } from '@mui/material';

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch<AppDispatch>(); // Use o tipo AppDispatch

  const handleSubmit = () => {
    if (title.trim()) {
      dispatch(createTodo({title, description}));
      setTitle('');
    }
  };

  return (
    <div>
      <TextField
        label="Nova Tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descreva a sua Tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Adicionar
      </Button>
    </div>
  );
};

export default TodoForm;
