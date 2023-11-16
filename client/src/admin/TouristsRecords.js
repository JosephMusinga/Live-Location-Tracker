import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TouristForm from './TouristForm';
import TouristList from './TouristsList';


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

    </>

  )
}

export default TouristsRecords