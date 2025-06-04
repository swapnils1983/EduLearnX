// import { motion } from "framer-motion";
// import { Separator } from "@/components/ui/separator";

// const CoursePreview = ({ data }) => {
//     return (
//         <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             className="space-y-8"
//         >
//             <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-100">
//                 {data.image ? (
//                     <img
//                         src={data.image}
//                         alt={data.title}
//                         className="w-full h-full object-cover"
//                     />
//                 ) : (
//                     <div className="flex items-center justify-center h-full text-slate-400">
//                         No preview image
//                     </div>
//                 )}
//             </div>

//             <div>
//                 <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">
//                     {data.category}
//                 </span>
//                 <h1 className="mt-4 text-3xl font-bold text-slate-900">{data.title}</h1>
//                 <p className="mt-2 text-xl text-slate-600">{data.subtitle}</p>
//             </div>

//             <Separator />

//             <div className="grid grid-cols-3 gap-4 text-sm">
//                 <div>
//                     <p className="font-medium text-slate-900">Level</p>
//                     <p className="mt-1 text-slate-600 capitalize">{data.level}</p>
//                 </div>
//                 <div>
//                     <p className="font-medium text-slate-900">Language</p>
//                     <p className="mt-1 text-slate-600 capitalize">{data.primaryLanguage}</p>
//                 </div>
//                 <div>
//                     <p className="font-medium text-slate-900">Price</p>
//                     <p className="mt-1 text-slate-600">${data.pricing}</p>
//                 </div>
//             </div>

//             <Separator />

//             <div>
//                 <h2 className="text-xl font-semibold text-slate-900">About this course</h2>
//                 <p className="mt-4 text-slate-600 whitespace-pre-wrap">{data.description}</p>
//             </div>

//             <div>
//                 <h2 className="text-xl font-semibold text-slate-900">
//                     What you'll learn
//                 </h2>
//                 <p className="mt-4 text-slate-600 whitespace-pre-wrap">{data.objectives}</p>
//             </div>

//             <Separator />

//             <div>
//                 <h2 className="text-xl font-semibold text-slate-900">Course content</h2>
//                 <div className="mt-4 space-y-4">
//                     {data.curriculum?.map((lecture, index) => (
//                         <div
//                             key={lecture.id}
//                             className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
//                         >
//                             <div>
//                                 <p className="font-medium text-slate-900">
//                                     {index + 1}. {lecture.title}
//                                 </p>
//                                 {lecture.freePreview && (
//                                     <span className="text-xs text-slate-500">Free preview</span>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default CoursePreview;


import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, Save, Info, Trash2, Video } from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Toast } from "@/components/ui/toast";
import { mediaUploadService } from "@/services";
import { Switch } from "@radix-ui/react-switch";
import CourseCurriculam from "@/components/Teacher/CourseCurriculam";
import { AuthContext } from "@/context/AuthContext";
import CourseDetails from "@/components/Teacher/CourseDetails";
import CourseBasic from "@/components/Teacher/CourseBasic";

const TeacherAddCourse = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { auth } = useContext(AuthContext);
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
        welcomeMessage: "",
        pricing: 0,
        curriculum: [],
        isPublished: false,
    });

    const updateCourseData = (data) => {
        setCourseData((prev) => ({ ...prev, ...data }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
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
            console.log(error);
            toast.error("Failed to create course");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <main className="py-10">
                {/* Header */}
                <div className="section-container mb-10">
                    <div className="flex items-center text-sm mb-4">
                        <Link to="/my-courses" className="hover:underline flex items-center">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            All Courses
                        </Link>
                        <span className="mx-2">/</span>
                        <span>Add New Course</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Create New Course</h1>
                    <p className="text-muted-foreground">Fill in the details below to create a new course for your students.</p>
                </div>

                {/* Course Form */}
                <div className="section-container">
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form Content */}
                            <div className="lg:col-span-2 space-y-8">
                                {/* Basic Information */}
                                <CourseBasic data={courseData} updateData={updateCourseData} />

                                {/* Course Details */}
                                <CourseDetails data={courseData} updateData={updateCourseData} />

                                {/* Course Curriculum */}
                                <Card>
                                    <CourseCurriculam data={courseData} updateData={updateCourseData} />
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-6 space-y-6">
                                        {/* Course Image Upload */}
                                        <div>
                                            <h3 className="font-medium mb-2">Course Image</h3>
                                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                                <Upload className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                                                <p className="text-sm text-gray-500 mb-2">
                                                    Drag and drop an image, or click to browse
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Recommended size: 1280 x 720px (16:9 ratio)
                                                </p>
                                                <Button type="button" variant="outline" className="mt-4">
                                                    Upload Image
                                                </Button>
                                            </div>
                                        </div>

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
                                    </CardContent>
                                </Card>
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