"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../store/todoSlice';
import { TextField } from '@mui/material';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <TextField
      label="Buscar Tarefas"
      onChange={handleSearch}
      fullWidth
      margin="normal"
    />
  );
};

export default SearchBar;
