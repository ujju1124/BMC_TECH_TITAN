"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ComplaintBox from "./ComplainBox";
import ComplaintList from "./ComplainList";
import { useBusStore } from "@/store/useBusStore";
import { useAuth } from "@clerk/nextjs";

export default function SmartMobilityDashboard() {
  const [formData, setFormData] = useState({
    currentLocation: "",
    destination: "",
    role: "",
    phoneNumber: "",
  });

  const { findRidesAround } = useBusStore();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const { userId } = useAuth();

  // Handle role selection
  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      clerkId: userId,
      startLocation: formData.currentLocation,
      endLocation: formData.destination,
      role: formData.role,
      phoneNumber: formData.phoneNumber,
    };
    await findRidesAround(data);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="w-[80vw] mx-auto">
        <CardHeader>
          <CardTitle>Route Information</CardTitle>
          <CardDescription>
            Enter your location and destination to see available routes and
            drivers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="currentLocation">Current Location</Label>
              <Input
                id="currentLocation"
                type="text"
                placeholder="Enter your current location"
                value={formData.currentLocation}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                type="text"
                placeholder="Enter your destination"
                value={formData.destination}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="Enter your phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Select Role</Label>
              <Select onValueChange={handleRoleChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver">Driver</SelectItem>
                  <SelectItem value="passenger">Passenger</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              disabled={
                !formData.currentLocation ||
                !formData.destination ||
                !formData.role
              }
              type="submit"
              className="w-full mt-4"
            >
              Find People Around Me
            </Button>
          </form>
        </CardContent>
      </Card>

      <ComplaintBox />
      <ComplaintList />
    </div>
  );
}
