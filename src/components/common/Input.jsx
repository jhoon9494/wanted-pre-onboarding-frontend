import styled from 'styled-components';

// Styled-Components
const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #748ffc;

  > input {
    padding: 8px 10px;
    border: none;
    border-bottom: 1.5px solid #748ffc;
    background-color: transparent;
    color: #656565;

    &::placeholder {
      color: #a6a6a6;
    }
  }
`;

// Input Components
const Input = ({ id, label, testid, value, onChange, type }) => {
  return (
    <Label htmlFor={id}>
      {label}
      <input type={type} id={id} data-testid={testid} value={value} onChange={onChange} placeholder={label} />
    </Label>
  );
};

export default Input;
