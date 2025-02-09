"use client";

import Link from "next/link";

// Define the Driver type
type Driver = {
  _id: string;
  clerkId: string;
  role: string;
};

export default function DriverList({ drivers }: { drivers: Driver[] }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Drivers</h2>
      <ul className="space-y-2">
        {drivers.map((driver) => (
          <li key={driver._id} className="bg-gray-100 p-4 rounded-lg">
            <Link href={`/driver/${driver._id}`} passHref>
              <a className="text-blue-500">{driver.clerkId} - {driver.role}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
