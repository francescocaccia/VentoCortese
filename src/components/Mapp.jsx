import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import logo from "../logoColleponi.png";

const Mapp = ({ lat, lng }) => {
  const customIcon = new Icon({
    iconUrl: logo,
    iconSize: [50, 50], //DIMENSIONE IMMAGINE
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
        <Popup>
          <img src={logo} style={{ width: 50, height: 50 }} alt="logo" />
          VentoCortese
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Mapp;
