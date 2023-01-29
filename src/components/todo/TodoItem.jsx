import styled from 'styled-components';

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
  return (
    <List>
      <label>
        <input type="checkbox" /> <span>{todo.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </List>
  );
};

export default TodoItem;
