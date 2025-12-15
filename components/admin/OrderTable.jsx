"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const orders = [
    {
        id: "ORD-001",
        user: "Alice Smith",
        product: "Classic Leather Jacket",
        quantity: 1,
        status: "Completed",
        date: "2024-03-15",
    },
    {
        id: "ORD-002",
        user: "Bob Jones",
        product: "Denim Jeans",
        quantity: 2,
        status: "Pending",
        date: "2024-03-16",
    },
    {
        id: "ORD-003",
        user: "Charlie Brown",
        product: "Summer T-Shirt",
        quantity: 3,
        status: "Cancelled",
        date: "2024-03-17",
    },
];

export default function OrderTable() {
    return (
        <div className="rounded-md border bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.user}</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>{order.quantity}</TableCell>
                            <TableCell>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : order.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
