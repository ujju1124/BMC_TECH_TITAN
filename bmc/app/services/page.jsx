"use client"

import React from 'react'; // Then React import
import { useState,useEffect } from 'react'; // Then other hooks or imports
import UserList from "../components/UserList";
import DriverList from "../components/DriverList";
import NearbyDriver from "../components/NearbyDriver";

export default function ServicePage() {
  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [nearbyDrivers, setNearbyDrivers] = useState([]);
  const [userLocation, setUserLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const userRes = await fetch('/api/users');
      const driverRes = await fetch('/api/drivers');

      if (userRes.ok) {
        const usersData = await userRes.json();
        setUsers(usersData);
      }
      if (driverRes.ok) {
        const driversData = await driverRes.json();
        setDrivers(driversData);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchNearbyDrivers = async () => {
      if (userLocation.latitude && userLocation.longitude) {
        const nearbyRes = await fetch(`/api/nearby-drivers?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}`);
        const nearbyData = await nearbyRes.json();
        if (nearbyRes.ok) {
          setNearbyDrivers(nearbyData.nearbyDrivers);
        }
      }
    };

    fetchNearbyDrivers();
  }, [userLocation]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Service</h1>
      <UserList users={users} />
      <DriverList drivers={drivers} />
      <NearbyDriver nearbyDrivers={nearbyDrivers} />
    </div>
  );
}
