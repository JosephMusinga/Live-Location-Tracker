import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateUser from './admin/CreateUser';
import Home from './user/Home';
import AdminPanel from './admin/AdminPanel';
import LiveMap from './user/LiveMap';
import UserList from './admin/UsersList';
import './App.css'

function App() {
  return (
    <div className="main" >
      <div>
        <h1 className='app__header'>Live Location Tracker</h1>
      </div>

      
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/createUser' element={<CreateUser />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/adminPanel' element={<AdminPanel />} />
            <Route exact path='/liveMap' element={<LiveMap />} />
            <Route exact path='/userList' element={<UserList />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
