"use client";
import React, { useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, Bus } from "lucide-react";
import { toast } from "react-toastify";

const BusRouteForm = () => {
  const [stops, setStops] = useState([{ stopName: "", arrivalTime: "" }]);

  const addStop = () => {
    setStops([...stops, { stopName: "", arrivalTime: "" }]);
  };

  const formRef = useRef(null);

  const removeStop = (index) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    // Collect stops data
    const stopsData = stops.map((_, index) => ({
      stopName: formData.get(`stopName-${index}`),
      arrivalTime: formData.get(`arrivalTime-${index}`),
    }));

    const data = {
      busNumber: formData.get("busNumber"),
      routeName: formData.get("routeName"),
      companyName: formData.get("company"),
      stops: stopsData,
    };
    try {
      const response = await fetch("/api/busdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Bus route registered successfully");
        formRef?.current.reset();
      } else {
        toast.error("Error registering bus route");
      }
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto text-lg md:text-xl mb-8">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            <Bus className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <CardTitle>Bus Route Registration</CardTitle>
            <p className="text-sm text-muted-foreground">
              Register a new bus route
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="busNumber">Bus Number</Label>
              <Input
                id="busNumber"
                placeholder="Enter bus number"
                className="w-full"
                required
                name="busNumber"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="routeName">Route Name</Label>
              <Input
                id="routeName"
                placeholder="Enter route name"
                className="w-full"
                required
                name="routeName"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Bus Company</Label>
            <Input
              id="company"
              placeholder="Enter bus company name"
              className="w-full"
              required
              name="company"
            />
            <p className="text-sm text-muted-foreground">
              Enter the name of the company that owns this bus
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Bus Stops</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addStop}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Stop
              </Button>
            </div>

            {stops.map((stop, index) => (
              <Card key={index} className="p-4">
                <div className="grid gap-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Stop #{index + 1}</h4>
                    {stops.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeStop(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`stopName-${index}`}>Stop Name</Label>
                      <Input
                        id={`stopName-${index}`}
                        placeholder="Enter stop name"
                        required
                        name={`stopName-${index}`}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`arrivalTime-${index}`}>
                        Arrival Time
                      </Label>
                      <Input
                        name={`arrivalTime-${index}`}
                        id={`arrivalTime-${index}`}
                        type="time"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Register Bus Route
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BusRouteForm;
