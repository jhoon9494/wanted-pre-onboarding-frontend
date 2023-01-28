import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Globalstyle from './style/GlobalStyle';

function App() {
  return (
    <>
      <Globalstyle />
      <Routes>
        <Route path={'/'} element={<SignIn />} />
        <Route path={'/signup'} element={<SignUp />} />
        <Route path={'/signin'} element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
