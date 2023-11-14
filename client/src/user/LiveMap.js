import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import { getCoordinatesFromDatabase } from '../Firebase';

function LiveMap() {
  const [coordinates, setCoordinates] = useState([-17.84, 31.04]);
  const [currentPosition, setCurrentPosition] = useState([-17.81, 31.04]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const databaseRef = params.get('databaseRef');

    getCoordinatesFromDatabase(`live_coordinates/${databaseRef}`)
      .then((coordinatesArray) => {
        setCoordinates(coordinatesArray);
      })
      .catch((error) => {
        console.error('Error retrieving coordinates:', error);
      });
  });

  function getPosition(callback) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const currentPosition = [latitude, longitude];
      callback(currentPosition);
    });
  }

  useEffect(() => {
    getPosition((currentPosition) => {
      setCurrentPosition(currentPosition);
      console.log(currentPosition)
    });
  }, [22]);



  return (
    <div>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <div style={{ height: '90vh', width: '100%' }}>
        <MapContainer
          center={coordinates}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />

          <Marker position={coordinates}>
            <Popup>
            <h1>Client</h1>
            </Popup>
          </Marker>

          <Marker position={currentPosition}>
            <Popup>
              <h1>Your location</h1>
            </Popup>

          </Marker>

          <Polyline positions={[coordinates, currentPosition]} />
        </MapContainer>

      </div>
    </div>
  );
}

export default LiveMap;