import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;

  > input {
    padding: 8px 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
`;

const Input = ({ id, label, testid, value, onChange, type }) => {
  return (
    <Label htmlFor={id}>
      {label}
      <input type={type} id={id} data-testid={testid} value={value} onChange={onChange} placeholder={label} />
    </Label>
  );
};

export default Input;
