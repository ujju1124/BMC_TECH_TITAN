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
import ComplaintBox from "./ComplainBox";
import ComplaintList from "./ComplainList";

export default function SmartMobilityDashboard() {
  const [formData, setFormData] = useState({
    currentLocation: "",
    destination: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
            <Button type="submit" className="w-full mt-4">
              Find Peoples around me
            </Button>
          </form>
        </CardContent>
      </Card>

      <ComplaintBox />
      <ComplaintList />
    </div>
  );
}
