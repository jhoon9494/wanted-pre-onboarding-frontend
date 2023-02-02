import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';
import SubmitTodo from '../components/todo/SubmitTodo';
import TodoItem from '../components/todo/TodoItem';

// Styled-Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: #dde4ff;
  border-radius: 10px;
  padding: 40px;
`;

const EmptyList = styled.span`
  margin-top: 20px;
  color: #6d8afd;
`;

const TodoList = styled.ul`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
`;

const Logout = styled.button`
  cursor: pointer;
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: transparent;
  border: none;
  color: #91a7ff;

  :hover {
    color: #6d8afd;
  }
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
  }, [navigate, getTodoData]);

  useEffect(() => {
    if (deleteId) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== deleteId));
    }
  }, [deleteId]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/signin', { replace: true });
  };

  return (
    <Container>
      <Logout type="button" onClick={handleLogout}>
        Logout
      </Logout>
      <SubmitTodo setTodos={setTodos} />
      {todos.length ? (
        <TodoList>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} setDeleteId={setDeleteId} />
          ))}
        </TodoList>
      ) : (
        <EmptyList>할 일을 추가하고 관리하세요 😄</EmptyList>
      )}
    </Container>
  );
};

export default Todo;
