import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TouristForm from './TouristForm';
import TouristList from './TouristsList';


function TouristsRecords() {
  const navigate = useNavigate();


  return (
    <>
      <div>TouristsRecords</div>
      <div>
        <h1>Tourist Form</h1>
        <TouristForm />
        <TouristList/>
      </div>
    </>

  )
}

export default TouristsRecords