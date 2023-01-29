import { useState } from 'react';
import styled from 'styled-components';
import API from '../../api';

// Styled-Components
const List = styled.li`
  display: flex;
  align-items: center;
  padding: 4px 0;
  margin: 0 10px;

  > label {
    flex: 1 1 0;
  }

  > button {
    flex-basis: 40px;
    margin: 0 4px;
  }
`;

// TodoItem Components
const TodoItem = ({ todo, setDeleteId }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const token = localStorage.getItem('access_token');

  // 완료 여부
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
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsCompleted((curr) => !curr);
    } catch (e) {
      console.error(e);
    }
  };

  // 투두리스트 삭제
  const handleDelete = async () => {
    try {
      await API.delete(`todos/${todo.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeleteId(todo.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <List>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={handleCheck} /> <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button type="button" data-testid="delete-button" onClick={handleDelete}>
        삭제
      </button>
    </List>
  );
};

export default TodoItem;
