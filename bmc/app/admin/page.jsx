"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, CheckCircle } from "lucide-react";

const AdminPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <Dashboard />
    </main>
  );
};

export default AdminPage;

function Dashboard() {
  const [buses, setBuses] = useState([]);
  console.log(buses.busData);

  useEffect(() => {
    fetch("/api/busdata")
      .then((res) => res.json())
      .then((data) => setBuses(data.busData))
      .catch((error) => console.error("Error fetching bus data:", error));
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit bus with id: ${id}`);
  };

  const handleDelete = (id) => {
    setBuses(buses.filter((bus) => bus.id !== id));
  };

  const handleVerify = (id) => {
    setBuses(
      buses.length > 0
        ? buses.map((bus) =>
            bus.id === id ? { ...bus, verified: !bus.verified } : bus
          )
        : []
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Serial Number</TableHead>
          <TableHead>Bus Details</TableHead>
          <TableHead className="text-right">Control</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {buses.length > 0 &&
          buses.map((bus, index) => (
            <TableRow key={bus.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <div>
                  <p>
                    <strong>Bus Number:</strong> {bus.busNumber}
                  </p>
                  <p>
                    <strong>Parent Company:</strong> {bus.parentCompany}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => handleEdit(bus.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => handleDelete(bus.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={bus.verified ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleVerify(bus.id)}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
