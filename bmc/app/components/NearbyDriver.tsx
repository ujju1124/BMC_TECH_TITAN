"use client";

type Driver = {
  _id: string;
  clerkId: string;
  role: string;
};

export default function NearbyDriver({ nearbyDrivers }: { nearbyDrivers: Driver[] }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Nearby Drivers</h2>
      <ul className="space-y-2">
        {nearbyDrivers.length > 0 ? (
          nearbyDrivers.map((driver) => (
            <li key={driver._id} className="bg-green-100 p-4 rounded-lg">
              <span>{driver.clerkId} - {driver.role}</span>
            </li>
          ))
        ) : (
          <li>No nearby drivers found</li>
        )}
      </ul>
    </div>
  );
}
