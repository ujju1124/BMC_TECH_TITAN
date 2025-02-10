"use client";
import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Loading from "../loading";
import useBusStore from "@/store/useBusStore";

// Location Page For all the bus locations
const LocationPage = () => {
  const { busData, fetchBuses } = useBusStore();
  useEffect(() => {
    fetchBuses();
  }, [fetchBuses]);

  if (!busData.length) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen w-screen p-4 bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Available Bus Route Locations
      </h1>
      {busData.map(
        (bus, index) =>
          bus.isVerified && (
            <div
              key={bus._id || index}
              className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4"
            >
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white">
                Bus Number: {bus.busNumber}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Route: {bus.routeName}
              </p>

              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-white">
                  Stops:
                </h3>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
                  {bus.stops.map((stop) => (
                    <li key={stop._id}>
                      {stop.stopName}{" "}
                      {stop.arrivalTime && (
                        <span className="text-gray-400 dark:text-gray-500">
                          ({stop.arrivalTime})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map Container */}
              <MapContainer
                center={[
                  bus.stops[0]?.latitude || 27.7172,
                  bus.stops[0]?.longitude || 85.324,
                ]}
                zoom={14}
                className="h-64 w-full mt-4 rounded-lg"
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* Marking Stops */}
                {bus.stops.map((stop) => (
                  <Marker
                    key={stop._id}
                    position={[stop.latitude, stop.longitude]}
                    icon={
                      new L.Icon({
                        iconUrl:
                          "https://cdn-icons-png.flaticon.com/512/64/64572.png",
                        iconSize: [20, 20],
                      })
                    }
                  >
                    <Popup>{stop.stopName}</Popup>
                  </Marker>
                ))}
                {/* Draw path (Polyline) */}
              </MapContainer>
            </div>
          )
      )}
    </div>
  );
};

export default LocationPage;
