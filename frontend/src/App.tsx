import { Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import PrivateRoutes from './utils/PrivateRoutes';
import {LoginGuard} from './hocs/LoginGuard';

function App() {
  return (
    <>
      <Routes>
        {/* <Route element={<LoginGuard/>}> */}
          <Route path='/login' element={<Login />} />
          {/* <Route element={<PrivateRoutes/>}> */}
            <Route path='/' element={<Main />} />
            <Route path='/profile' element={<Profile />} />
            
          {/* </Route> */}
        {/* </Route> */}
      </Routes>
    
    </>
  )
}

export default App