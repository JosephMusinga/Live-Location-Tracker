import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TouristForm from './TouristForm';


function TouristsRecords() {
  const navigate = useNavigate();


  return (
    <>
      <div>TouristsRecords</div>
      <div>
        <h1>Tourist Form</h1>
        <TouristForm />
      </div>
    </>

  )
}

export default TouristsRecords