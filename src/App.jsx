import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import Globalstyle from './style/GlobalStyle';

function App() {
  return (
    <>
      <Globalstyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path={'/'} element={<SignIn />} />
          <Route path={'/signup'} element={<SignUp />} />
          <Route path={'/signin'} element={<SignIn />} />
          <Route path={'/todo'} element={<Todo />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
