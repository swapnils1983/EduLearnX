import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { fetchInstructorCourseListService } from "@/services";

const FeaturedCourses = () => {
    const [coursesData, setCoursesData] = useState([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            const data = await fetchInstructorCourseListService({ limit: 4 });
            setCoursesData(data.data);
        };

        fetchCourseData();
    }, []);

    return (
        <section id="featured-courses" className="py-20 bg-white">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-4 mb-6 md:mb-0">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-edu-secondary text-edu-primary text-sm font-medium">
                            Featured Courses
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-edu-dark">Learn from the best instructors</h2>
                        <p className="text-edu-dark/70 max-w-2xl">
                            Our courses are designed and taught by industry experts who are passionate about sharing their knowledge and helping you achieve your goals.
                        </p>
                    </div>
                    <Link to="/courses" className="flex items-center font-medium text-edu-primary hover:text-edu-primary/80">
                        View all courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coursesData.map((course) => (
                        <div
                            key={course._id}
                            className="course-card group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <div className="aspect-video w-full bg-edu-secondary flex items-center justify-center overflow-hidden">
                                    <img
                                        src={course.image}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-edu-dark/80">
                                    {course.level}
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold group-hover:text-edu-primary transition-colors duration-300">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-edu-dark/70 line-clamp-2">
                                    {course.description}
                                </p>
                                <Link
                                    to={`/courses/${course._id}`}
                                    className="text-edu-primary font-medium text-sm hover:text-edu-primary/80"
                                >
                                    View Course
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;
