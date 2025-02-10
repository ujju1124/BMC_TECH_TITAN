"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, CheckCircle } from "lucide-react"

interface Bus {
  id: number
  busNumber: string
  parentCompany: string
  verified: boolean
}

const initialBuses: Bus[] = [
  { id: 1, busNumber: "B001", parentCompany: "City Transit", verified: false },
  { id: 2, busNumber: "B002", parentCompany: "Metro Lines", verified: true },
  { id: 3, busNumber: "B003", parentCompany: "Urban Commute", verified: false },
]

export default function Dashboard() {
  const [buses, setBuses] = useState<Bus[]>(initialBuses)

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Edit bus with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    setBuses(buses.filter((bus) => bus.id !== id))
  }

  const handleVerify = (id: number) => {
    setBuses(buses.map((bus) => (bus.id === id ? { ...bus, verified: !bus.verified } : bus)))
  }

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
        {buses.map((bus, index) => (
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
              <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEdit(bus.id)}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="mr-2" onClick={() => handleDelete(bus.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant={bus.verified ? "default" : "outline"} size="icon" onClick={() => handleVerify(bus.id)}>
                <CheckCircle className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

