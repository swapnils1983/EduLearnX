import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import CourseBasics from "@/components/course/CourseBasics";
// import CourseDetails from "@/components/course/CourseDetails";
import CourseCurriculum from "@/components/course/CourseCurriculum";
import CoursePreview from "@/components/course/CoursePreview";
import { addNewCourseService, mediaUploadService } from "@/services";
import CourseDetails from "@/components/course/CourseDetails";
import { AuthContext } from "@/context/AuthContext";

const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Details" },
    { id: 3, name: "Curriculum" },
    { id: 4, name: "Preview" },
];

const AddNewCourse = () => {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext)
    console.log(auth)
    const [currentStep, setCurrentStep] = useState(1);
    const [courseData, setCourseData] = useState({
        instructorId: auth.user._id,
        instructorName: auth.user.userName,
        title: "",
        category: "",
        level: "",
        primaryLanguage: "",
        subtitle: "",
        description: "",
        image: "",
        welcomeMessage: "",
        pricing: 0,
        objectives: "",
        curriculum: [],
        isPublished: false,
    });

    const progress = (currentStep / steps.length) * 100;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
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
        }
    };


    const updateCourseData = (data) => {
        setCourseData((prev) => ({ ...prev, ...data }));
    };

    return (
        <div className="min-h-screen bg-white p-6 animate-in">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-semibold text-slate-900">Create New Course</h1>
                        <Button variant="ghost" onClick={() => navigate(-1)} className="text-slate-600 hover:text-slate-900">
                            Cancel
                        </Button>
                    </div>

                    <div className="mb-8">
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between mt-2">
                            {steps.map((step) => (
                                <span key={step.id} className={`text-sm ${currentStep >= step.id ? "text-slate-900" : "text-slate-400"}`}>
                                    {step.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-100">
                        {currentStep === 1 && <CourseBasics data={courseData} updateData={updateCourseData} />}
                        {currentStep === 2 && <CourseDetails data={courseData} updateData={updateCourseData} />}
                        {currentStep === 3 && <CourseCurriculum data={courseData} updateData={updateCourseData} />}
                        {currentStep === 4 && <CoursePreview data={courseData} />}

                        <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1} className="flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4" />
                                Previous
                            </Button>
                            {currentStep === steps.length ? (
                                <Button onClick={handleSubmit} className="flex items-center gap-2">
                                    <Check className="w-4 h-4" />
                                    Create Course
                                </Button>
                            ) : (
                                <Button onClick={handleNext} className="flex items-center gap-2">
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AddNewCourse;
