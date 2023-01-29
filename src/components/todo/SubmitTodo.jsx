import { useState } from 'react';
import styled from 'styled-components';
import API from '../../api';
import Button from '../common/Button';
import Input from '../common/Input';

// Styled-Components
const Form = styled.form`
  display: flex;
  margin: 10px;
  gap: 10px;

  > label {
    width: 250px;
  }
`;

// SubmitTodo Components
const SubmitTodo = ({ setTodos }) => {
  const [inputTodo, setInputTodo] = useState('');

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

  return (
    <Form>
      <Input type="text" testid="new-todo-input" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
      <Button type="submit" testid="new-todo-add-button" value="추가" onClick={handleSubmit} />
    </Form>
  );
};

export default SubmitTodo;
