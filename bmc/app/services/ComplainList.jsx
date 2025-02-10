"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Mock data for complaints
const mockComplaints = [
  {
    id: 1,
    type: "Overload of people in the bus",
    description: "Bus was extremely crowded during rush hour.",
  },
  {
    id: 2,
    type: "Over pollution",
    description: "Excessive exhaust fumes from the bus.",
  },
  {
    id: 3,
    type: "Delayed service",
    description: "Bus arrived 30 minutes late.",
  },
  {
    id: 4,
    type: "Overload of people in the bus",
    description: "Not enough seats available for passengers.",
  },
  {
    id: 5,
    type: "Unfriendly behavior of staff",
    description: "Driver was rude to passengers.",
  },
  {
    id: 6,
    type: "Dirty or unhygienic buses",
    description: "Bus interior was not clean.",
  },
  {
    id: 7,
    type: "Broken facilities/seats",
    description: "Several seats were damaged.",
  },
  { id: 8, type: "Delayed service", description: "Bus didn't show up at all." },
];

const complaintTypes = [
  "All",
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

export default function ComplaintList() {
  const [selectedType, setSelectedType] = useState("All");

  const filteredComplaints =
    selectedType === "All"
      ? mockComplaints
      : mockComplaints.filter((complaint) => complaint.type === selectedType);

  return (
    <Card className="w-[80vw] mx-auto">
      <CardHeader>
        <CardTitle>Complaint List</CardTitle>
        <CardDescription>View complaints by type</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {complaintTypes.map((type, index) => (
            <Button
              key={index}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className="text-xs"
            >
              {type}
            </Button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredComplaints.map((complaint) => (
            <Card key={complaint.id}>
              <CardHeader>
                <CardTitle className="text-sm">{complaint.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{complaint.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
