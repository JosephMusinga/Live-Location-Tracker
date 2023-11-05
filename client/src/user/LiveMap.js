import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { getCoordinatesFromDatabase } from '../Firebase';
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

function LiveMap() {
  const [coordinates, setCoordinates] = useState([-17.84, 31.04]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const databaseRef = params.get('databaseRef');

    getCoordinatesFromDatabase(databaseRef)
      .then((coordinatesArray) => {
        setCoordinates(coordinatesArray);
        console.log(coordinatesArray);
      })
      .catch((error) => {
        console.error('Error retrieving coordinates:', error);
      });
  }, []);

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
          style={{ height: '100%', width: '100%', position: 'relative' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
          />

          <Marker position={coordinates} />
        </MapContainer>
      </div>
    </div>
  );
}

export default LiveMap;