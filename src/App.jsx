import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Globalstyle from './style/GlobalStyle';

function App() {
  return (
    <>
      <Globalstyle />
      <Routes>
        <Route path={'/signup'} element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
