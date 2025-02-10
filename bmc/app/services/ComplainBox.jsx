"use client";

import { toast } from "react-toastify";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@clerk/nextjs";
import { useBusStore } from "@/store/useBusStore";
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
    phoneNumber: "",
  });

  const { addComplaint } = useBusStore();

  const { userId } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaintData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setComplaintData((prev) => ({ ...prev, complaintType: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      toast.error("Sign in to add your complaint");
      return;
    }

    const complaintPayload = {
      companyName: complaintData.busCompanyName,
      email: complaintData.email,
      phoneNum: complaintData.phoneNumber,
      busNumber: complaintData.busNumber,
      complaintType: complaintData.complaintType,
      complaintDescription: complaintData.complaintDescription,
      clerkId: userId, // Assuming you're using Clerk for authentication and have the user ID
    };
     addComplaint(complaintPayload);

    setComplaintData({
      busCompanyName: "",
      email: "",
      busNumber: "",
      complaintType: "",
      complaintDescription: "",
      phoneNumber: "",
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
            <Label htmlFor="phoneNumber">Phone No. </Label>
            <Input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              value={complaintData.phoneNumber}
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
          <Button type="submit">Submit Complaint</Button>
        </form>
      </CardContent>
    </Card>
  );
}
