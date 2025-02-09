"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationPage = () => {
  const [busData, setBusData] = useState([]);
  const [busStops, setBusStops] = useState([]);

  useEffect(() => {
    const getLocations = async () => {
      try {
        const response = await fetch("/api/busdata/", { method: "GET" });
        const data = await response.json();
        setBusData([...data.busData]);
        setBusStops([...data.busData[0]?.stops]);
      } catch (error) {
        console.error("Error while fetching the locations:", error);
      }
    };
    getLocations();
  }, []);

  if (!busData.length || !busStops.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Bus Route Details
      </h1>
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
          Bus Number: {busData[0]?.busNumber}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Route: {busData[0]?.routeName}
        </p>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700 dark:text-white">
            Stops:
          </h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
            {busStops.map((stop) => (
              <li key={stop._id} className="mt-1">
                {stop.stopName}
              </li>
            ))}
          </ul>
        </div>
        <MapContainer
          center={[
            busData[0]?.stops[0]?.latitude,
            busData[0]?.stops[0]?.longitude,
          ]}
          zoom={14}
          className="h-64 w-full mt-4 rounded-lg"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {busStops.map((stop) => (
            <Marker key={stop._id} position={[stop.latitude, stop.longitude]}>
              <Popup>{stop.stopName}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPage;
