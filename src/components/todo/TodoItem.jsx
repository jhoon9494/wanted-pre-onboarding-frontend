import { useState } from 'react';
import styled from 'styled-components';
import API from '../../api';

// Styled-Components
const List = styled.li`
  display: flex;
  padding: 4px 0;

  > label {
    flex-basis: 220px;
  }
`;

// TodoItem Components
const TodoItem = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const handleCheck = async () => {
    try {
      await API.put(
        `todos/${todo.id}`,
        {
          todo: todo.todo,
          isCompleted: !isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );
      setIsCompleted((curr) => !curr);
    } catch (e) {
      console.error(e);
    }
  };

  // console.log(todo);
  return (
    <List>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={handleCheck} /> <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </List>
  );
};

export default TodoItem;
