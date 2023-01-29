import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import API from '../api';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

// Styled-Components
const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > form {
    display: flex;
    gap: 10px;
  }
`;

// Todo Components
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [inputTodo, setInputTodo] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputTodo('');
    try {
      const res = await API.post(
        'todos',
        { todo: inputTodo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setTodos((prev) => [...prev, res.data]);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      navigate('/signin', { replace: true });
    }

    getTodoData(token);
  }, [navigate, getTodoData]);

  return (
    <Container>
      <form>
        <Input type="text" testid="new-todo-input" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
        <Button type="submit" testid="new-todo-add-button" value="추가" onClick={handleSubmit} />
      </form>
    </Container>
  );
};

export default Todo;
