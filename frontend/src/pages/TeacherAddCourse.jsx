import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, Save, Info, Trash2, Video } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toast } from "@/components/ui/toast";
import { addNewCourseService, mediaUploadService } from "@/services";
import { Switch } from "@radix-ui/react-switch";
import CourseCurriculam from "@/components/Teacher/CourseCurriculam";
import { AuthContext } from "@/context/AuthContext";
import CourseDetails from "@/components/Teacher/CourseDetails";
import CourseBasic from "@/components/Teacher/CourseBasic";
import { toast } from "sonner";

const TeacherAddCourse = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { auth } = useContext(AuthContext)
    const [courseData, setCourseData] = useState({
        instructorId: auth?.user?._id,
        instructorName: auth?.user?.userName,
        title: "",
        category: "",
        level: "",
        Duration: 0,
        description: "",
        Prerequisites: "",
        image: "",
        pricing: "",
        curriculum: [],
        isPublished: false,
    });
    const updateCourseData = (data) => {
        setCourseData((prev) => ({ ...prev, ...data }));
    };



    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            category: "Programming",
            duration: "",
            level: "Intermediate",
            pricing: 0,
            prerequisites: "",
            instructorName: "",
        },
    });


    useEffect(() => {
        console.log(courseData)
    }, [courseData])


    //Curriculem
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true);
        if (!courseData.title || !courseData.category || !courseData.level || !courseData.description ||
            !courseData.image || !courseData.pricing || courseData.curriculum.length === 0) {

            toast.error("Please fill in all required fields before submitting.");
            setIsSubmitting(false);
            return;
        }
        try {
            let imageUrl = courseData.image;

            if (courseData.image instanceof File) {
                const formData = new FormData();
                formData.append("file", courseData.image);
                const uploadRes = await mediaUploadService(formData);
                imageUrl = uploadRes.url;
            }

            const finalData = {
                ...courseData,
                image: imageUrl,
            };

            const res = await addNewCourseService(finalData);
            toast.success("Course created successfully!");

            navigate("/instructor");
        } catch (error) {
            console.log(error)
            toast.error("Failed to create course");
        } finally {
            setIsSubmitting(false);
        }
    };






    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="py-10">
                <div className="section-container">
                    <h1 className="text-3xl md:text-4xl font-bold ">Create New Course</h1>
                    <p className="text-muted-foreground">Fill in the details below to create a new course for your students.</p>
                </div>

                <div className="section-container">

                    <form className="space-y-8">
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
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        <span className="flex items-center">
                                            <Save className="mr-2 h-4 w-4" />
                                            Upload Course
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

export default TeacherAddCourse;