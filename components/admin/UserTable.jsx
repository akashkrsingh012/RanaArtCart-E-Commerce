"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Buyer",
        joined: "2024-01-15",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Seller",
        joined: "2024-02-20",
        status: "Active",
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        role: "Buyer",
        joined: "2024-03-05",
        status: "Inactive",
    },
];

export default function UserTable() {
    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Joined Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Badge variant={user.role === "Seller" ? "secondary" : "outline"}>
                                    {user.role}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.joined}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === "Active"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
