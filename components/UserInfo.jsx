"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import axios from "axios";

export default function UserInfo() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);



  const fetchUsers = async () => {
    if (session?.user?.token) {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/protected/users`, {
        headers: {
          'Content-Type': ' application/json',
          Authorization: `Bearer ${session?.user?.token}`
        }
      })
      const users = data;
      console.log(users, "These are the users")
      setUsers(users)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [session?.user?.token])

  return (
    <>
      <nav className="bg-white shadow-md p-4 border-b-4 border-green-400">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-gray-800 font-bold text-xl">Auth App</div>
          {session?.user ? (
            <div className="flex items-center space-x-4">
              <div className="text-gray-800">{session?.user.name}</div>
              <div className="text-gray-800">{session?.user.email}</div>
              <img
                className="h-8 w-8 rounded-full object-cover"
                src="https://via.placeholder.com/50"
                alt="User Avatar"
              />
              <button
                onClick={() => signOut()}
                className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="text-gray-800">Guest</div>
          )}
        </div>
      </nav>
      <UserTable users={users} />
    </>
  );
}
