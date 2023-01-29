import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import styled from 'styled-components';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { validateEmail, validatePassword } from '../utils/validate';

// Styled-Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #dde4ff;
  border-radius: 10px;
  padding: 40px;

  > h1 {
    color: #6482f9;
  }
`;

const Form = styled.form`
  width: 300px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// SignUp Components
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/todo', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('auth/signup', { email, password });
      navigate('/signin', { replace: true });
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container>
      <h1>My Todolist</h1>
      <Form>
        <Input
          type="text"
          id="email"
          label="이메일"
          testid="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          label="패스워드"
          testid="password-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          testid="signup-button"
          onClick={handleSubmit}
          value="회원가입"
          type="submit"
          disabled={!validateEmail(email) || !validatePassword(password)}
        />
      </Form>
      <div>
        <Link to="/signin">로그인 하러가기</Link>
      </div>
    </Container>
  );
};

export default SignUp;
