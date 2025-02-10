"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const complaintTypes = [
  "Overload of people in the bus",
  "Over pollution",
  "Excessive fare charge",
  "Not going to the same route as promised and changing the route in the middle",
  "Delayed service",
  "Unfriendly behavior of staff",
  "Dirty or unhygienic buses",
  "Broken facilities/seats",
  "Unreliable bus stops",
  "No proper bus schedule information",
  "Unclear route information",
  "Unsafe or poorly lit bus stops",
  "Ticketing system issues",
];

export default function ComplaintBox() {
  const [complaintData, setComplaintData] = useState({
    busCompanyName: "",
    email: "",
    busNumber: "",
    complaintType: "",
    complaintDescription: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setComplaintData((prev) => ({ ...prev, complaintType: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setComplaintData((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Complaint submitted:", complaintData);

    if (complaintData.image) {
      const formData = new FormData();
      formData.append("file", complaintData.image);
      formData.append("upload_preset", "your_cloudinary_upload_preset");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        console.log("Image uploaded to Cloudinary:", data.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    setComplaintData({
      busCompanyName: "",
      email: "",
      busNumber: "",
      complaintType: "",
      complaintDescription: "",
      image: null,
    });
  };

  return (
    <Card className="w-[80vw] mx-auto">
      <CardHeader>
        <CardTitle>Complaint Box</CardTitle>
        <CardDescription>Submit your concerns or report issues</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="busCompanyName">Bus Company Name</Label>
            <Input
              type="text"
              id="busCompanyName"
              name="busCompanyName"
              value={complaintData.busCompanyName}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={complaintData.email}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="busNumber">Bus Number</Label>
            <Input
              type="text"
              id="busNumber"
              name="busNumber"
              value={complaintData.busNumber}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="complaintType">Complaint Type</Label>
            <Select
              onValueChange={handleSelectChange}
              value={complaintData.complaintType}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                {complaintTypes.map((type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="complaintDescription">Complaint Description</Label>
            <Textarea
              id="complaintDescription"
              name="complaintDescription"
              value={complaintData.complaintDescription}
              onChange={handleInputChange}
              required
              className="mt-1"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1"
            />
          </div>
          <Button type="submit">Submit Complaint</Button>
        </form>
      </CardContent>
    </Card>
  );
}
