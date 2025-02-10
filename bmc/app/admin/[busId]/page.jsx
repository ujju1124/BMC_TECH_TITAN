"use client";
import { use, useEffect } from "react";
import useBusStore from "@/store/useBusStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page({ params }) {
  const busId = params.busId;

  const { busData, fetchBuses } = useBusStore();

  useEffect(() => {
    fetchBuses();
  }, [fetchBuses]);

  const busDetails = busData.find((bus) => bus._id === busId);

  if (!busDetails) {
    return <div>Loading...</div>; // Show loading if busDetails isn't found
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      {/* Back Button */}
      <Link href="/admin">
        <div className="flex items-center space-x-2 text-gray-700 dark:text-white mb-4">
          <ArrowLeft />
          <span className="text-lg font-semibold">Back to Admin</span>
        </div>
      </Link>

      {/* Bus Details */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Bus Details
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
            Bus Number:{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {busDetails.busNumber}
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Route:{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {busDetails.routeName}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Created At:{" "}
            <span className="text-gray-500 dark:text-gray-300">
              {new Date(busDetails.createdAt).toLocaleString()}
            </span>
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Verified:{" "}
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                busDetails.isVerified
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {busDetails.isVerified ? "Yes" : "No"}
            </span>
          </p>
        </div>

        {/* Stops List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
            Bus Stops
          </h3>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
            {busDetails.stops.map((stop) => (
              <li key={stop._id} className="mb-2">
                <span className="font-semibold">{stop.stopName}</span>
                <br />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Latitude: {stop.latitude}, Longitude: {stop.longitude}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
