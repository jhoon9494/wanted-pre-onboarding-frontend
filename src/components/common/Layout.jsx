import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

// Styled-Components
const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Layout Components
const Layout = () => {
  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default Layout;
