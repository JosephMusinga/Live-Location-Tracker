import { useNavigate, NavLink } from 'react-router-dom'
import TouristForm from './TouristForm';

function TouristsRecords() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
   
    navigate(`/touristList`);
  };



  return (
    <>
      <div>
        <h1>Tourist Form</h1>
        <TouristForm />
      </div>
      <br />
      <button onClick={handleButtonClick}>Tourist List</button>
      <br />
      <NavLink to="/adminPanel">
        back
      </NavLink>
      <br />
      <NavLink to="/login">
        logout
      </NavLink>
    </>

  )
}

export default TouristsRecords