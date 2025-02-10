"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ComplaintBox } from "./ComplaintBox"
import { ComplaintList } from "./ComplaintList"

// Mock data for routes and drivers
const mockRouteData = {
  "Shopping Mall": {
    driverRoute: "Downtown to Shopping Mall",
    totalDrivers: 5,
    availableDrivers: [
      { id: 1, name: "John Doe", rating: 4.8 },
      { id: 2, name: "Jane Smith", rating: 4.9 },
    ],
  },
  "Business Park": {
    driverRoute: "Central Station to Business Park",
    totalDrivers: 3,
    availableDrivers: [
      { id: 3, name: "Mike Johnson", rating: 4.7 },
      { id: 4, name: "Emily Brown", rating: 4.6 },
    ],
  },
  Airport: {
    driverRoute: "City Center to Airport",
    totalDrivers: 7,
    availableDrivers: [
      { id: 5, name: "David Wilson", rating: 4.9 },
      { id: 6, name: "Sarah Davis", rating: 4.8 },
    ],
  },
}

const destinations = Object.keys(mockRouteData)

export default function SmartMobilityDashboard() {
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null)

  const handleDestinationChange = (value: string) => {
    setSelectedDestination(value)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Route Information</CardTitle>
          <CardDescription>Select your destination to see available routes and drivers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="destination">Select Your Destination</Label>
              <Select onValueChange={handleDestinationChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedDestination && (
              <>
                <p>
                  <strong>Driver Route:</strong> {mockRouteData[selectedDestination].driverRoute}
                </p>
                <p>
                  <strong>Total Drivers Available:</strong> {mockRouteData[selectedDestination].totalDrivers}
                </p>
                <div>
                  <h3 className="font-semibold mb-2">Available Drivers:</h3>
                  <ul className="list-disc list-inside">
                    {mockRouteData[selectedDestination].availableDrivers.map((driver) => (
                      <li key={driver.id}>
                        {driver.name} - Rating: {driver.rating}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <ComplaintBox />
      <ComplaintList />
    </div>
  )
}

