"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/admin/Card";
import ProductTable from "@/components/admin/ProductTable";
import { ShoppingBag, TrendingUp, AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Products</h2>
                    <p className="text-slate-500">Manage your product inventory.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Add New Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Product</DialogTitle>
                            <DialogDescription>
                                Create a new product here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {/* Upload Photo Placeholder */}
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" type="file" />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" placeholder="Product Name" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">
                                    Price
                                </Label>
                                <Input id="price" type="number" className="col-span-3" placeholder="0.00" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock" className="text-right">
                                    Stock
                                </Label>
                                <Input id="stock" type="number" className="col-span-3" placeholder="0" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="category" className="text-right">
                                    Category
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="clothing">Clothing</SelectItem>
                                        <SelectItem value="accessories">Accessories</SelectItem>
                                        <SelectItem value="shoes">Shoes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea placeholder="Type your message here." id="description" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                    title="Total Products"
                    value="1,234"
                    icon={ShoppingBag}
                    color="bg-blue-500"
                />
                <Card
                    title="Total Value"
                    value="$45,678"
                    icon={TrendingUp}
                    color="bg-green-500"
                />
                <Card
                    title="Out of Stock"
                    value="12"
                    icon={AlertCircle}
                    color="bg-red-500"
                />
            </div>

            {/* Product Table */}
            <ProductTable />
        </div>
    );
}
