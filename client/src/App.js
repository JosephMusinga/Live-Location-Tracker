import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateUser from './admin/CreateUser';

function App() {
  return (
    <div className="app">
      <div className='header'>
        <h1>Live Location Tracker</h1>
      </div>
      <div className='app__body'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/createUser' element={<CreateUser />} />
            <Route exact path='/login' element={<Login />} />

            {/* <Route exact path='/deviceList' element={<DeviceList />} />
            <Route exact path='/addDeviceForm' element={<AddDeviceForm />} />
            <Route exact path='/liveMap' element={<LiveMap />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
