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
    display: flex;
    align-items: center;

    > input:first-child {
      margin-right: 10px;
    }
  }

  > button {
    flex-basis: 40px;
    margin: 0 4px;
  }
`;

// TodoItem Components
const TodoItem = ({ todo, setDeleteId }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [defaultInput, setDefaultInput] = useState(todo.todo);
  const [modifyInput, setModifyInput] = useState(todo.todo);
  const [modify, setModify] = useState(false);

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

  // 투두리스트 수정
  const handleSubmit = async () => {
    try {
      const res = await API.put(
        `todos/${todo.id}`,
        {
          todo: modifyInput,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDefaultInput(res.data.todo);
      setModify(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 투두리스트 수정 취소
  const cancelModify = () => {
    setModifyInput(todo.todo);
    setModify(false);
  };

  return (
    <List>
      <label>
        <input type="checkbox" checked={isCompleted} onChange={handleCheck} />
        {modify ? (
          <input
            type="text"
            data-testid="modify-input"
            value={modifyInput}
            onChange={(e) => setModifyInput(e.target.value)}
          />
        ) : (
          <span>{defaultInput}</span>
        )}
      </label>
      <button
        type="button"
        data-testid={modify ? 'submit-button' : 'modify-button'}
        onClick={modify ? handleSubmit : () => setModify(true)}
      >
        {modify ? '제출' : '수정'}
      </button>
      <button
        type="button"
        data-testid={modify ? 'cancel-button' : 'delete-button'}
        onClick={modify ? cancelModify : handleDelete}
      >
        {modify ? '취소' : '삭제'}
      </button>
    </List>
  );
};

export default TodoItem;
