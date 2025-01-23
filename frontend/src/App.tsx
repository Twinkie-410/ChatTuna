import { Routes, Route } from 'react-router-dom';
import Main from './components/pages/Main';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
import Event from './components/pages/Event';
import PrivateRoutes from './utils/PrivateRoutes';
import {LoginGuard} from './hocs/LoginGuard';
import CreateEvent from './components/pages/CreateEvent';
import ConfigureBot from './components/pages/ConfigureBot';
import SendNotification from './components/pages/SendNotification';
import UpdateEvent from './components/pages/UpdateEvent';

function App() {
  return (
    <>
      <Routes>
        <Route element={<LoginGuard/>}>
          <Route path='/login' element={<Login />} />
          <Route element={<PrivateRoutes/>}>
            <Route path='/' element={<Main />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/createEvent' element={<CreateEvent />} />
            <Route path='/configureBot' element={<ConfigureBot />} />
            <Route path='/event/:id' element={<Event />} />
            <Route path='/event/:id/update' element={<UpdateEvent />} />
            <Route path='/notification' element={<SendNotification />} />
          </Route>
        </Route>
      </Routes>
    
    </>
  )
}

export default App