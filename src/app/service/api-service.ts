import axios from 'axios';

const API_URL = 'http://127.0.0.1:3000/v1/todos';

export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addTodo = async (title: string, description: string) => {
  const response = await axios.post(API_URL, { title, description });
  return response.data;
};

export const updateTodo = async (id: number, updates: Partial<{ title: string; description: string; completed: boolean }>) => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
