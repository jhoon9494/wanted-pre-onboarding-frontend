import { useState } from 'react';
import styled from 'styled-components';
import API from '../../api';

// Styled-Components
const List = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
  margin: 0 10px;

  > label {
    flex: 1 1 0;
    display: flex;
    align-items: center;
  }
`;

const Todo = styled.span`
  color: #656565;
`;

const CheckBox = styled.input`
  margin-right: 10px;

  &[type='checkbox'] {
    position: relative;
    cursor: pointer;
  }

  &[type='checkbox']:before {
    content: '';
    display: block;
    position: absolute;
    width: 18px;
    height: 18px;
    top: -3px;
    left: -3px;
    border: 1px solid #748ffc;
    border-radius: 3px;
    background-color: #dde4ff;
  }

  &[type='checkbox']:checked:after {
    content: '';
    display: block;
    width: 6px;
    height: 10px;
    border: solid #315afb;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    position: absolute;
    top: 0px;
    left: 3px;
  }
`;

const Button = styled.button`
  flex-basis: 40px;
  margin: 0 4px;
  padding: 4px 6px;
  border: 1px solid ${(props) => props.color};
  background-color: transparent;
  border-radius: 3px;
  color: ${(props) => props.color};

  :hover {
    background-color: ${(props) => props.color};
    color: white;
    transition: all 0.1s ease-in;
  }
`;

const ModifyInput = styled.input`
  border: none;
  border-bottom: 1px solid #748ffc;
  background-color: transparent;
  color: #656565;

  &::placeholder {
    color: #a6a6a6;
  }
`;

// TodoItem Components
const TodoItem = ({ todo, setDeleteId }) => {
  const [isCompleted, setIsCompleted] = useState(todo.isCompleted);
  const [todoInput, setTodoInput] = useState(todo.todo);
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
          todo: todoInput,
          isCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodoInput(res.data.todo);
      setModify(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 투두리스트 수정 취소
  const cancelModify = () => {
    setTodoInput(todo.todo);
    setModify(false);
  };

  return (
    <List>
      <label>
        <CheckBox type="checkbox" checked={isCompleted} onChange={handleCheck} />
        {modify ? (
          <ModifyInput
            type="text"
            data-testid="modify-input"
            value={todoInput}
            onChange={(e) => setTodoInput(e.target.value)}
          />
        ) : (
          <Todo>{todoInput}</Todo>
        )}
      </label>
      <Button
        color="#748ffc"
        type="button"
        data-testid={modify ? 'submit-button' : 'modify-button'}
        onClick={modify ? handleSubmit : () => setModify(true)}
      >
        {modify ? '제출' : '수정'}
      </Button>
      <Button
        color="#e03131"
        type="button"
        data-testid={modify ? 'cancel-button' : 'delete-button'}
        onClick={modify ? cancelModify : handleDelete}
      >
        {modify ? '취소' : '삭제'}
      </Button>
    </List>
  );
};

export default TodoItem;
