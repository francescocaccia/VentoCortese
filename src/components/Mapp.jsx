import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import logo from "../logoColleponi.png";

const Mapp = ({ lat, lng }) => {
  const customIcon = new Icon({
    iconUrl: logo,
    iconSize: [50, 50], // Puoi modificare le dimensioni se la tua immagine ha dimensioni diverse.
    className: "custom-icon",
  });

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>VentoCortese</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapp;
