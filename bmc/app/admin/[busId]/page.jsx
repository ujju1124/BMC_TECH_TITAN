"use client";

// Dynamic Route For Admin Page
export default function Page({ params }) {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Bus ID: {params.busId}</p>
    </div>
  );
}
