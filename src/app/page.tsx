import React from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import SearchBar from './components/SearchBar';
import { Container, Typography } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        ToDo List
      </Typography>
      <SearchBar />
      <TodoForm />
      <TodoList />
    </Container>
  );
};

export default Home;
