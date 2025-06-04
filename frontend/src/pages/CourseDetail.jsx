import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Star, CheckCircle, Award, Eye, Users } from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createPaymentService, fetchRecomendationService, fetchStudentBoughtCoursesService, fethCourceDetailById } from "@/services";
import { AuthContext } from "@/context/AuthContext";
import { toast } from "sonner";

const CourseDetail = () => {
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [isBought, setIsBought] = useState(false);
    const [studentBoughtCourses, setStudentBoughtCourses] = useState([]);
    const [approvalUrl, setApprovalUrl] = useState("");
    const [recommendedCourses, setRecommendedCourses] = useState([]);
    const [loadingRecommended, setLoadingRecommended] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: courseData } = await fethCourceDetailById(id);
                setCourse(courseData);

                if (auth.user?._id) {
                    const { data: boughtCourses } = await fetchStudentBoughtCoursesService(auth.user._id);
                    setStudentBoughtCourses(boughtCourses);
                    setIsBought(boughtCourses.some(c => c.courseId === courseData._id));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id, auth.user?._id]);

    const handleCreatePayment = async () => {
        if (!auth.authenticate) {
            toast.error("Please Login to Enroll.");
            return;
        }

        const paymentPayload = {
            userId: auth.user._id,
            userName: auth.user.userName,
            userEmail: auth.user.userEmail,
            orderStatus: "pending",
            paymentMethod: "paypal",
            paymentStatus: "initiated",
            orderDate: new Date(),
            paymentId: "",
            payerId: "",
            instructorId: course.instructorId,
            instructorName: course.instructorName,
            courseImage: course.image,
            courseTitle: course.title,
            courseId: course._id,
            coursePricing: course.pricing,
        };

        try {
            const response = await createPaymentService(paymentPayload);
            if (response.success) {
                sessionStorage.setItem("currentOrderId", JSON.stringify(response.data.orderId));
                setApprovalUrl(response.data.approveUrl);
            }
        } catch (error) {
            console.error("Error creating payment:", error);
        }
    };

    useEffect(() => {
        if (approvalUrl) {
            window.location.href = approvalUrl;
        }
    }, [approvalUrl]);

    const fetchRecomendation = async () => {
        try {
            if (!course?.title) return;
            setLoadingRecommended(true);
            const { data } = await fetchRecomendationService(course.title);
            // console.log(data)
            setRecommendedCourses(data);
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setLoadingRecommended(false);
        }
    };

    useEffect(() => {
        if (course?.title) {
            fetchRecomendation();
        }
    }, [course?.title]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Loading course details...</h2>
                    <Link to="/courses" className="text-edu-primary hover:underline flex items-center justify-center">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar />
            <main>
                {/* Hero Banner */}
                <section className="bg-edu-primary text-white py-16">
                    <div className="section-container">
                        <div className="flex flex-col transition-all duration-700 opacity-100">
                            <div className="flex items-center text-sm mb-4">
                                <Link to="/courses" className="hover:underline flex items-center">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    All Courses
                                </Link>
                                <span className="mx-2">/</span>
                                <span>{course.category}</span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
                            <p className="text-lg opacity-90 mb-6 max-w-3xl">{course.description}</p>

                            <div className="flex flex-wrap gap-4 items-center mb-6">
                                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                    <Star className="h-5 w-5 mr-2 text-yellow-400 fill-yellow-400" />
                                    <span className="font-medium">{course.rating}</span>
                                    <span className="mx-1 text-white/70">•</span>
                                    <span>{course.students.length.toLocaleString()} students</span>
                                </div>

                                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                    <Clock className="h-5 w-5 mr-2" />
                                    <span>{course.Duration} Weeks</span>
                                </div>

                                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                                    <Award className="h-5 w-5 mr-2" />
                                    <span>{course.level}</span>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="mr-4">
                                    <p className="text-sm text-white/70">Instructor</p>
                                    <p className="font-medium">{course.instructorName}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-white/70">Last Updated</p>
                                    <p className="font-medium">{new Date(course.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Course Content Section */}
                <section className="py-16">
                    <div className="section-container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2">
                                <Tabs defaultValue="overview" className="w-full">
                                    <TabsList className="mb-8">
                                        <TabsTrigger value="overview">Overview</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="overview" className="space-y-8">
                                        <div>
                                            <h2 className="text-2xl font-semibold mb-4">About This Course</h2>
                                            <p className="text-edu-dark/80 mb-4">
                                                This comprehensive {course.title} course is designed to take you from beginner to professional.
                                                You'll learn all the essential skills, tools, and techniques needed to excel in this field.
                                            </p>
                                            <p className="text-edu-dark/80">
                                                Whether you're looking to start a new career, enhance your existing skills, or just
                                                learn something new, this course provides a structured path to achieve your goals.
                                            </p>
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-semibold mb-4">What You'll Learn</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {[
                                                    "Master fundamental concepts and principles",
                                                    "Build real-world projects for your portfolio",
                                                    "Solve complex problems with proven techniques",
                                                    "Apply best practices in real-world scenarios",
                                                    "Stay updated with latest industry trends",
                                                    "Collaborate effectively with teams",
                                                    "Optimize performance and efficiency",
                                                    "Prepare for professional certification"
                                                ].map((item, index) => (
                                                    <div key={index} className="flex items-start">
                                                        <CheckCircle className="h-5 w-5 mr-2 text-edu-primary shrink-0 mt-0.5" />
                                                        <span>{item}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-semibold mb-4">Prerequisites</h2>
                                            <p className="text-edu-dark/80 mb-2">
                                                This course is designed for {course.level === 'Beginner' ? 'complete beginners with no prior experience' :
                                                    course.level === 'Intermediate' ? 'those with basic understanding of the subject' :
                                                        'experienced professionals looking to advance their skills'}.
                                            </p>
                                            <ul className="list-disc pl-5 text-edu-dark/80 space-y-1">
                                                {course.level === 'Beginner' ? (
                                                    <>
                                                        <li>No previous experience required</li>
                                                        <li>Basic computer skills</li>
                                                        <li>Eagerness to learn</li>
                                                    </>
                                                ) : course.level === 'Intermediate' ? (
                                                    <>
                                                        <li>Basic understanding of core concepts</li>
                                                        <li>Some practical experience recommended</li>
                                                        <li>Familiarity with standard tools</li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li>Strong foundation in the subject</li>
                                                        <li>Professional experience recommended</li>
                                                        <li>Familiarity with advanced concepts</li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>

                            {/* Sidebar */}
                            <div className="mt-8 lg:mt-0">
                                <Card className="sticky top-24 border-edu-secondary/30">
                                    <CardContent className="p-6 space-y-6">
                                        <div className="relative aspect-video w-full bg-edu-secondary overflow-hidden">
                                            <img src={`${course.image}`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                        </div>

                                        {isBought ? (
                                            <div className="space-y-4">
                                                <Button onClick={() => navigate("/my-learning")} className="w-full bg-edu-primary hover:bg-edu-primary/90 text-white py-6">
                                                    Continue Learning...
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="text-3xl font-bold">{`$${course.pricing}`}</div>
                                                <Button onClick={handleCreatePayment} className="w-full bg-edu-primary hover:bg-edu-primary/90 text-white py-6">
                                                    Enroll Now
                                                </Button>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recommended Courses Section */}
                <section className="py-16">
                    <div className="section-container">
                        <h2 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h2>

                        {loadingRecommended ? (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-edu-primary"></div>
                            </div>
                        ) : recommendedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {recommendedCourses.slice(0, 4).map((recommendedCourse) => (
                                    <Card key={recommendedCourse._id} className="course-card overflow-hidden transition-all duration-700 hover:border-edu-primary/20">
                                        <div className="relative">
                                            <div className="relative aspect-video w-full bg-edu-secondary overflow-hidden">
                                                <img
                                                    src={recommendedCourse.image}
                                                    alt={recommendedCourse.title}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-edu-dark/80">
                                                {recommendedCourse.level}
                                            </div>
                                        </div>
                                        <CardContent className="p-6 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="px-3 py-1 rounded-full bg-edu-secondary/50 text-xs font-medium text-edu-dark/80">
                                                    {recommendedCourse.category}
                                                </span>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                                    <span className="ml-1 text-sm font-medium">{recommendedCourse.rating}</span>
                                                </div>
                                            </div>
                                            <Link to={`/courses/${recommendedCourse._id}`}>
                                                <h3 className="text-xl font-semibold hover:text-edu-primary transition-colors duration-300">
                                                    {recommendedCourse.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-edu-dark/70 line-clamp-2">
                                                {recommendedCourse.description}
                                            </p>
                                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                                <div className="flex items-center text-sm text-edu-dark/70">
                                                    <Clock className="h-4 w-4 mr-1" />
                                                    {recommendedCourse.Duration} Weeks
                                                </div>
                                                <div className="flex items-center text-sm text-edu-dark/70">
                                                    <Users className="h-4 w-4 mr-1" />
                                                    {recommendedCourse.students?.length || 0}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm text-edu-dark/70">
                                                    By <span className="font-medium text-edu-dark">{recommendedCourse.instructorName}</span>
                                                </div>
                                                <Link
                                                    to={`/courses/details/${recommendedCourse._id}`}
                                                    className="flex items-center gap-1 text-edu-primary font-medium text-sm hover:text-edu-primary/80 transition-colors"
                                                >
                                                    View Details
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No recommended courses found</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CourseDetail;