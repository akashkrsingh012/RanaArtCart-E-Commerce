"use client"

import { useState } from "react"
import SellerLayout from "@/components/seller/SellerLayout"
import { Mail, Phone, Shield } from "lucide-react"

// Dummy users data
const dummyUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    role: "customer",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    role: "customer",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    phone: "+91 9876543212",
    role: "admin",
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+91 9876543213",
    role: "customer",
  },
  {
    id: "5",
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+91 9876543214",
    role: "seller",
  },
]

const roleColors = {
  customer: "bg-blue-100 text-blue-800",
  seller: "bg-green-100 text-green-800",
  admin: "bg-purple-100 text-purple-800",
}

export default function UsersPage() {
  const [users] = useState(dummyUsers)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <SellerLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage all platform users</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail size={16} className="text-gray-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone size={16} className="text-gray-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full ${
                          roleColors[user.role as keyof typeof roleColors]
                        }`}
                      >
                        <Shield size={12} />
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SellerLayout>
  )
}












