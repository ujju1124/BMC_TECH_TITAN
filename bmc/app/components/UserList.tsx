import React from 'react'; // Add this import

import Link from "next/link";


export default function UserList({ users }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user._id} className="bg-gray-100 p-4 rounded-lg">
            <Link href={`/user/${user._id}`} passHref>
              <a className="text-blue-500">{user.clerkId} - {user.role}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
