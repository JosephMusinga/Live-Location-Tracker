import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import CreateUser from './admin/CreateUser';
import Home from './user/Home';
import AdminPanel from './admin/AdminPanel';
import LiveMap from './user/LiveMap';
import TouristsRecords from './admin/TouristsRecords';
import TouristList from './admin/TouristsList';
import './App.css'
import { getAlertFromDatabase } from './Firebase';

function App() { 

  getAlertFromDatabase()

  return (
    <div className="main" >
      <div className='app__header'>
        <div className="header__logo"
          style={{ backgroundImage: "url(/img/five-bulls-favicon-black.png)", backgroundRepeat: 'no-repeat' }}>
        </div>
        <div className='header__text'>
          <h1>Five Bulls Tracker</h1>
        </div>
        
      </div>


      <div className='body'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route exact path='/createUser' element={<CreateUser />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/home' element={<Home />} />
            <Route exact path='/adminPanel' element={<AdminPanel />} />
            <Route exact path='/liveMap' element={<LiveMap />} />
            <Route exact path='/touristsRecords' element={<TouristsRecords />} />
            <Route exact path='/touristList' element={<TouristList />} />

          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
