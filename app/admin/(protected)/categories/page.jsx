"use client";

import { Plus, List, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/admin/Card";
import CategoryTable from "@/components/admin/CategoryTable";
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

export default function CategoriesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Categories</h2>
                    <p className="text-slate-500">Manage product categories.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Add New Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                            <DialogDescription>
                                Create a new category for your products.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" className="col-span-3" placeholder="Category Name" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="status" className="text-right">
                                    Status
                                </Label>
                                <Input id="status" className="col-span-3" placeholder="Active" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card
                    title="Total Categories"
                    value="12"
                    icon={List}
                    color="bg-indigo-500"
                />
                <Card
                    title="New Categories"
                    value="+3"
                    icon={TrendingUp}
                    color="bg-green-500"
                />
            </div>

            <CategoryTable />
        </div>
    );
}
