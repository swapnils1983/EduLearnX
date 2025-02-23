import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Users, BookOpen, Calendar, PlusCircle, DollarSign, GraduationCap, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const InstructorDashboardPage = () => {
    // Mock data - replace with real data from your backend
    const navigate = useNavigate()
    const stats = [
        { title: "Total Students", value: "234", icon: Users, color: "text-purple-500" },
        { title: "Active Courses", value: "12", icon: BookOpen, color: "text-indigo-500" },
        { title: "Total Revenue", value: "$12,450", icon: DollarSign, color: "text-emerald-500" },
        { title: "This Month Sales", value: "$2,840", icon: BarChart, color: "text-blue-500" },
    ];

    const courses = [
        {
            title: "Web Development Bootcamp",
            students: 45,
            revenue: "$4,455",
            description: "Complete web development course from basics to advanced",
        },
        {
            title: "Data Science Fundamentals",
            students: 38,
            revenue: "$3,762",
            description: "Learn data analysis and machine learning basics",
        },
        {
            title: "UX Design Masterclass",
            students: 32,
            revenue: "$3,168",
            description: "Master user experience design principles",
        },
    ];

    const studentRecords = [
        {
            name: "Emma Thompson",
            email: "emma.t@example.com",
            enrolledCourse: "Web Development Bootcamp"
        },
        {
            name: "James Wilson",
            email: "james.w@example.com",
            enrolledCourse: "Data Science Fundamentals"
        },
        {
            name: "Sarah Parker",
            email: "sarah.p@example.com",
            enrolledCourse: "UX Design Masterclass"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/30 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-8"
            >
                {/* Header Section with Add Course Button */}
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-4xl font-semibold text-gray-800"
                        >
                            Welcome back, Professor
                        </motion.h1>
                        <p className="text-gray-600">Here's what's happening with your courses today.</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700"
                        onClick={() => navigate("add-course")}

                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Course
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center space-x-4">
                                    <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Courses Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
                            <div className="space-y-4">
                                {courses.map((course, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{course.title}</p>
                                            <div className="flex items-center space-x-4 mt-1">
                                                <span className="text-sm text-gray-600">{course.students} students</span>
                                                <span className="text-sm text-emerald-600">{course.revenue}</span>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>

                    {/* Student Records */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Student Records</h2>
                            <div className="space-y-4">
                                {studentRecords.map((student, index) => (
                                    <div key={index} className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                        <div>
                                            <p className="font-medium text-gray-800">{student.name}</p>
                                            <div className="space-y-1 mt-1">
                                                <p className="text-sm text-gray-600">{student.email}</p>
                                                <p className="text-sm text-purple-600">
                                                    Enrolled in: {student.enrolledCourse}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default InstructorDashboardPage;