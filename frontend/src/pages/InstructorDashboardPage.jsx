import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, Users, BookOpen, PlusCircle, DollarSign, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { fetchInstructorStatsService } from "@/services";
import { AuthContext } from "@/context/AuthContext";

const InstructorDashboardPage = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetchInstructorStatsService(auth?.user?._id);
                setStats(response.stats);
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, [auth]);

    if (!stats) return <p>Loading...</p>;

    const statCards = [
        { title: "Total Students", value: stats.totalStudents, icon: Users, color: "text-purple-500" },
        { title: "Total Courses", value: stats.totalCourses, icon: BookOpen, color: "text-indigo-500" },
        { title: "Total Revenue", value: `$${stats.totalEarnings}`, icon: DollarSign, color: "text-emerald-500" },
    ];

    return (
        <div className="min-h-screen bg-gray-50/30 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto space-y-8"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-semibold text-gray-800">Welcome back, Professor</h1>
                        <p className="text-gray-600">Here's what's happening with your courses today.</p>
                    </div>
                    <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => navigate("add-course")}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Course
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statCards.map((stat, index) => (
                        <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Your Recent Courses</h2>
                        <div className="space-y-4">
                            {stats.recentCourses.map((course, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <div>
                                        <p className="font-medium text-gray-800">{course.title}</p>
                                        <p className="text-sm text-gray-600">{course.students} students</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Recent Students</h2>
                        <div className="space-y-4">
                            {stats.recentStudents.map((student, index) => (
                                <div key={index} className="p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <p className="font-medium text-gray-800">{student.name}</p>
                                    <p className="text-sm text-gray-600">{student.email}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};

export default InstructorDashboardPage;