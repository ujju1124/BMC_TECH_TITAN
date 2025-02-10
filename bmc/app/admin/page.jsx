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
import { Trash2, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import Link from "next/link";
import useBusStore from "@/store/useBusStore";

const AdminPage = () => {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h1 className="text-xl font-bold mb-4 ml-4 mt-6">Added Bus Details</h1>
      <Dashboard />
      <h1 className="text-xl font-bold mb-4 ml-4 mt-6">
        User Complaint Details
      </h1>
      <UserComplaints />
    </main>
  );
};

export default AdminPage;

function Dashboard() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    fetch("/api/busdata")
      .then((res) => res.json())
      .then((data) => setBuses(data.busData))
      .catch((error) => console.error("Error fetching bus data:", error));
  }, []);

  const handleDelete = async (id) => {
    const verify = confirm("Are you sure you want to delete this bus data?");
    if (verify) {
      try {
        const res = await fetch("/api/admin/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.message) {
            toast.success(data.message);
            setBuses(buses.filter((bus) => bus._id !== id));
          }
        } else {
          toast.error("Failed to delete bus data");
        }
      } catch (error) {
        toast.error("Error deleting bus data");
      }
    }
  };

  const handleVerify = async (id) => {
    try {
      const res = await fetch("/api/admin/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ busId: id }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.message) {
          toast.success(data.message);
        }
        setBuses(
          buses.map((bus) =>
            bus._id === id ? { ...bus, isVerified: !bus.isVerified } : bus
          )
        );
      } else {
        toast.error("Failed to verify bus data");
        console.log(error.message);
      }
    } catch (error) {
      toast.error("Error verifying bus data");
      console.log(error.message);
    }
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
            <TableRow key={bus._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <Link href={`/admin/${bus._id}`} passHref>
                  <div>
                    <p>
                      <strong>Bus Number:</strong> {bus.busNumber}
                    </p>
                    <p>
                      <strong>Parent Company:</strong> {bus.parentCompany}
                    </p>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2"
                  onClick={() => handleDelete(bus._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button
                  variant={bus.isVerified ? "default" : "outline"}
                  size="icon"
                  onClick={() => handleVerify(bus._id)}
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

function UserComplaints() {
  const { getComplaints, complaints, approveComplaints, deleteComplaints } =
    useBusStore();

  useEffect(() => {
    getComplaints();
  }, []);

  const handleDelete = async (complainId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this complaint?"
    );
    if (confirmDelete) {
      await deleteComplaints(complainId);
    }
  };

  const handleVerify = async (complainId) => {
    await approveComplaints(complainId);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Serial Number</TableHead>
          <TableHead>Bus Number</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Complaint Type</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Admin Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <TableRow key={complaint._id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{complaint.busNumber}</TableCell>
              <TableCell>{complaint.companyName}</TableCell>
              <TableCell>{complaint.email}</TableCell>
              <TableCell>{complaint.phoneNum}</TableCell>
              <TableCell>{complaint.complaintType}</TableCell>
              <TableCell>{complaint.complaintDescription}</TableCell>
              <TableCell>
                {new Date(complaint.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right flex justify-between">
                <Button
                  variant={complaint.isVerified ? "default" : "outline"}
                  size="icon"
                  className="mr-2"
                  onClick={() => handleVerify(complaint._id)}
                >
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleDelete(complaint._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-4">
              No complaints found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
