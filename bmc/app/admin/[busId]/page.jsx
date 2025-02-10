"use client";
import { use } from "react"; 

export default function Page({ params }) {
  // Use the 'use' hook to unwrap the 'params' promise
  const unwrappedParams = use(params);

  return (
    <div>
      <h1>Admin Page</h1>
      <p>Bus ID: {unwrappedParams.busId}</p>
    </div>
  );
}
