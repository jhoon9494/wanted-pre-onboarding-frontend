import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';
import SubmitTodo from '../components/todo/SubmitTodo';
import TodoItem from '../components/todo/TodoItem';

// Styled-Components
const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoList = styled.ul`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

// Todo Components
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const getTodoData = useCallback(async (token) => {
    try {
      const res = await API.get('todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(res.data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/signin', { replace: true });
    }

    getTodoData(token);
  }, [navigate, getTodoData, deleteId]);

  return (
    <Container>
      <SubmitTodo setTodos={setTodos} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} setDeleteId={setDeleteId} />
        ))}
      </TodoList>
    </Container>
  );
};

export default Todo;
