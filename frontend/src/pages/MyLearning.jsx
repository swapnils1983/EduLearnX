import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { PlayCircle, BarChart3, Clock, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/student/Navbar";
import { fetchStudentBoughtCoursesService } from "@/services";
import { AuthContext } from "@/context/AuthContext";

const MyLearning = () => {
    const { auth } = useContext(AuthContext);
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllStudentBoughtCourses = async () => {
            if (!auth?.user?._id) return;
            try {
                const { data } = await fetchStudentBoughtCoursesService(auth.user._id);
                setPurchasedCourses(data);
                console.log(data)
            } catch (error) {
                console.error("Failed to fetch purchased courses:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllStudentBoughtCourses();
    }, [auth.user?._id]);



    if (!auth.user) return <Navigate to="/login" />;

    if (loading) {
        return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar />
            <div className="container max-w-6xl mx-auto py-12 px-4 mt-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">My Learning</h1>
                    <p className="text-gray-600">Track your progress and continue learning from where you left off</p>
                </div>
                {purchasedCourses?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {purchasedCourses.map((course) => (
                            <Card key={course.courseId} className="overflow-hidden transition-all hover:shadow-md">
                                <CardContent className="p-0">
                                    <div className="flex flex-col md:flex-row">
                                        <div className="w-full md:w-1/4 bg-gray-100 aspect-video md:aspect-square flex items-center justify-center">
                                            <img src={course.courseImage} alt={`Course: ${course.title}`} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="p-6 flex-1">
                                            <h3 className="text-xl font-semibold mb-1">{course.title}</h3>
                                            <p className="text-sm text-gray-500 mb-2">Instructor: {course.instructor}</p>
                                            <div className="bg-gray-100 h-2 rounded-full mb-2">
                                                <div className="bg-edu-primary h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                                            </div>
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <BarChart3 className="mr-1 h-4 w-4" />
                                                    <span>{course.progress}% complete</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <BookOpen className="mr-1 h-4 w-4" />
                                                    <span>{course.completedLectures}/{course.totalLectures} lectures</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Clock className="mr-1 h-4 w-4" />
                                                    <span>Last accessed {new Date(course.lastAccessed).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <Link to={`/courses/watch/${course.courseId}`}>
                                                <Button variant="outline" size="sm" className="mt-2 flex items-center">
                                                    <PlayCircle className="mr-1 h-4 w-4" />
                                                    Continue Learning
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium">No courses found</h3>
                        <p className="text-gray-500 mt-2">Try exploring our catalog to find courses</p>
                        <Link to="/courses">
                            <Button className="mt-4">Browse Courses</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyLearning;