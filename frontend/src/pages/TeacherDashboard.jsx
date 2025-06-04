import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Clock, DollarSign, LineChart, PlusCircle, Users } from "lucide-react";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart as RechartLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Navbar from "@/components/student/Navbar";

// Dummy data for testing
const courseData = [
    { id: 1, title: "Introduction to Web Development", students: 124, rating: 4.8, revenue: 2480, completionRate: 68 },
    { id: 2, title: "Advanced JavaScript Concepts", students: 87, rating: 4.9, revenue: 3480, completionRate: 72 },
    { id: 3, title: "React for Beginners", students: 215, rating: 4.7, revenue: 4300, completionRate: 65 },
    { id: 4, title: "TypeScript Masterclass", students: 56, rating: 4.5, revenue: 1680, completionRate: 58 },
];

const recentActivities = [
    { id: 1, type: "enrollment", courseName: "Introduction to Web Development", studentName: "John Doe", date: "2023-06-15" },
    { id: 2, type: "completion", courseName: "Advanced JavaScript Concepts", studentName: "Jane Smith", date: "2023-06-14" },
    { id: 3, type: "review", courseName: "React for Beginners", studentName: "Mike Johnson", rating: 5, date: "2023-06-13" },
    { id: 4, type: "enrollment", courseName: "TypeScript Masterclass", studentName: "Sarah Williams", date: "2023-06-12" },
    { id: 5, type: "question", courseName: "Introduction to Web Development", studentName: "Alex Brown", date: "2023-06-11" },
];

const monthlyRevenueData = [
    { name: "Jan", revenue: 1200 },
    { name: "Feb", revenue: 1900 },
    { name: "Mar", revenue: 2400 },
    { name: "Apr", revenue: 1800 },
    { name: "May", revenue: 2800 },
    { name: "Jun", revenue: 3200 },
];

const enrollmentData = [
    { name: "Jan", students: 25 },
    { name: "Feb", students: 40 },
    { name: "Mar", students: 65 },
    { name: "Apr", students: 48 },
    { name: "May", students: 72 },
    { name: "Jun", students: 95 },
];

const chartConfig = {
    revenue: {
        label: "Revenue",
        theme: {
            light: "#0ea5e9",
            dark: "#38bdf8",
        },
    },
    students: {
        label: "Students",
        theme: {
            light: "#8b5cf6",
            dark: "#a78bfa",
        },
    },
};

const TeacherDashboard = () => {

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="py-10">
                <div className="container mx-auto py-8 px-4 md:px-6">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
                            <p className="text-muted-foreground mt-1">Manage your courses and track student progress</p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">482</div>
                                <p className="text-xs text-muted-foreground">+24% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">$11,940</div>
                                <p className="text-xs text-muted-foreground">+12% from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">4</div>
                                <p className="text-xs text-muted-foreground">2 in preparation</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
                                <Clock className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">68%</div>
                                <p className="text-xs text-muted-foreground">+5% from last month</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="shadow-lg rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-gray-700">My Courses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table className="w-full">
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableHead>Course Name</TableHead>
                                        <TableHead>Students</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Revenue</TableHead>
                                        <TableHead>Completion Rate</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courseData.map((course) => (
                                        <TableRow key={course.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium text-gray-800">{course.title}</TableCell>
                                            <TableCell className="text-gray-600">{course.students}</TableCell>
                                            <TableCell className="text-gray-600">{course.rating}★</TableCell>
                                            <TableCell className="text-gray-600">${course.revenue}</TableCell>
                                            <TableCell className="text-gray-600">{course.completionRate}%</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {/* <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/courses/${course.id}`}>View</Link>
                                                    </Button> */}
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link to={`/instructor/courses/${course.id}/edit`}>Edit</Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="ml-auto">
                                <Link to="/instructor/add-course"> <PlusCircle className="mr-2 h-4 w-4" /> Add New Course </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                </div>
            </main>
        </div>

    );
};

export default TeacherDashboard;