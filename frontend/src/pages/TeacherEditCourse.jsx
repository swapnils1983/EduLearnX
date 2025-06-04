import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toast } from "@/components/ui/toast";
import { AuthContext } from "@/context/AuthContext";
import CourseDetails from "@/components/Teacher/CourseDetails";
import CourseBasic from "@/components/Teacher/CourseBasic";
import CourseCurriculam from "@/components/Teacher/CourseCurriculam";
import { toast } from "sonner";
import { getCourseDetailsByIDService, updateCourseByIDService } from "@/services";

const TeacherEditCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [courseData, setCourseData] = useState({
        instructorId: auth?.user?._id,
        instructorName: auth?.user?.userName,
        title: "",
        category: "",
        level: "",
        duration: 0,
        description: "",
        prerequisites: "",
        image: "",
        pricing: 0,
        curriculum: [],
        isPublished: false,
    });

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await getCourseDetailsByIDService(id);
                if (response.success) {
                    setCourseData(response.data);
                } else {
                    toast.error("Failed to fetch course data");
                    navigate("/instructor");
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                toast.error("Error fetching course data");
                navigate("/instructor");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourseData();
    }, [id, navigate]);

    const updateCourseData = (data) => {
        setCourseData((prev) => ({ ...prev, ...data }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await updateCourseByIDService(id, courseData);
            if (response.success) {
                toast.success("Course updated successfully!");
                navigate("/instructor");
            } else {
                toast.error(response.message || "Failed to update course");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Error updating course");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="py-10">
                <div className="section-container">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">Edit Course</h1>
                            <p className="text-muted-foreground">
                                Update the details of your course below.
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link to="/instructor">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="section-container">
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <CourseBasic data={courseData} updateData={updateCourseData} />
                                <CourseDetails data={courseData} updateData={updateCourseData} />
                                <Card>
                                    <CourseCurriculam data={courseData} updateData={updateCourseData} />
                                </Card>
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Saving Changes...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </span>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TeacherEditCourse;