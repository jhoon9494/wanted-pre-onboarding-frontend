import styled from 'styled-components';

// Styled-Components
const Container = styled.button`
  cursor: pointer;
  background-color: #748ffc;
  border: none;
  border-radius: 5px;
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 500;
  color: white;

  :disabled {
    cursor: not-allowed;
    background-color: #b5b5b5;
  }
`;

const Button = ({ testid, onClick, value, type, disabled }) => {
  return (
    <Container data-testid={testid} onClick={onClick} type={type} disabled={disabled}>
      {value}
    </Container>
  );
};

export default Button;
