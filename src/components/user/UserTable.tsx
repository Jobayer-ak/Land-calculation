/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';

interface User {
  _id: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  isActive: boolean;
}

export default function UserTable() {
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/users`,
        );
        const result = await response.json();
        console.log('Fetched API result:', result);

        if (Array.isArray(result.users)) {
          setData(result.users);
        } else {
          setData([]);
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4 text-center py-1">
          User List
        </h2>
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-700 bg-gray-400 border-r">
                Name
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 bg-gray-400 border-r">
                Email
              </th>
              <th className="px-6 py-3 font-semibold text-gray-700 bg-gray-400 border-r">
                Mobile
              </th>

              <th className="px-6 py-3 font-semibold text-gray-700 bg-gray-400 border-r">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((user) => (
                <tr
                  key={user._id}
                  className="border-b text-black hover:bg-gray-50 "
                >
                  <td className="px-6 py-4 border-r bg-gray-300">
                    {user.fullName}
                  </td>
                  <td className="px-6 py-4 border-r bg-yellow-100 hover:bg-yellow-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 border-r bg-yellow-100 hover:bg-yellow-200">
                    {user.mobileNumber}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-2 rounded text-xs font-medium ${
                        user.isActive
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
