import React, { useState, useEffect, useCallback, useRef } from "react";
import { Filter, Clock, Users, Star, ArrowLeft, Eye } from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { fetchInstructorCourseListService } from "@/services";

const categories = ["All", "Programming", "Design", "Marketing", "Business"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
    const [animateElements, setAnimateElements] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedLevel, setSelectedLevel] = useState("All Levels");
    const [courses, setCourses] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [totalCourses, setTotalCourses] = useState(0);
    const observer = useRef();

    const limit = 8;

    const fetchCourses = useCallback(async (pageNum, reset = false) => {
        try {
            setLoading(true);
            const params = {
                page: pageNum,
                limit,
            };

            if (selectedCategory !== "All") {
                params.category = selectedCategory;
            }

            if (selectedLevel !== "All Levels") {
                params.level = selectedLevel;
            }

            const data = await fetchInstructorCourseListService(params);
            // console.log(data)
            if (reset) {
                setCourses(data.data || []);
                setPage(1);
            } else {
                setCourses(prev => [...prev, ...(data.data || [])]);
            }

            setTotalCourses(data.pagination?.totalItems || 0);
            setHasMore(data.pagination?.currentPage < data.pagination?.totalPages);

            if (initialLoad) {
                setInitialLoad(false);
                setAnimateElements(true);
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory, selectedLevel, initialLoad]);

    useEffect(() => {
        fetchCourses(1, true);
    }, [selectedCategory, selectedLevel, fetchCourses]);

    const lastCourseElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        if (page > 1) {
            fetchCourses(page);
        }
    }, [page, fetchCourses]);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="bg-edu-primary text-white py-16">
                    <div className="section-container">
                        <div className={`max-w-2xl transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Expand Your Knowledge</h1>
                            <p className="text-lg md:text-xl opacity-90 mb-8">
                                Browse our extensive collection of courses taught by industry experts and take your skills to the next level.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="bg-edu-secondary py-6 sticky top-0 z-10 shadow-sm">
                    <div className="section-container py-0">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-edu-dark/70" />
                                <span className="text-edu-dark/70 font-medium">Filters:</span>
                            </div>

                            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                {categories.map(category => (
                                    <button
                                        key={category}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                            ? 'bg-edu-primary text-white'
                                            : 'bg-white text-edu-dark/70 hover:bg-edu-primary/10'
                                            }`}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2 w-full md:w-auto">
                                {levels.map(level => (
                                    <button
                                        key={level}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedLevel === level
                                            ? 'bg-edu-primary text-white'
                                            : 'bg-white text-edu-dark/70 hover:bg-edu-primary/10'
                                            }`}
                                        onClick={() => setSelectedLevel(level)}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Grid Section */}
                <section className="py-16">
                    <div className="section-container">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold">
                                {totalCourses} {totalCourses === 1 ? 'Course' : 'Courses'} Available
                            </h2>
                            <Link to="/" className="flex items-center text-edu-primary hover:text-edu-primary/80 transition-colors">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Link>
                        </div>

                        {courses.length === 0 && !loading ? (
                            <div className="text-center py-16">
                                <h3 className="text-xl font-medium text-edu-dark/70 mb-4">No courses found</h3>
                                <p className="text-edu-dark/50 mb-8">Try adjusting your search criteria</p>
                                <Button
                                    onClick={() => {
                                        setSelectedCategory("All");
                                        setSelectedLevel("All Levels");
                                    }}
                                    className="bg-edu-primary text-white hover:bg-edu-primary/90"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {courses.map((course, index) => (
                                        <Card
                                            key={course._id + index}
                                            ref={index === courses.length - 1 ? lastCourseElementRef : null}
                                            className={`course-card overflow-hidden transition-all duration-700 hover:border-edu-primary/20 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
                                            style={{ transitionDelay: `${200 + index * 50}ms` }}
                                        >
                                            <div className="relative">
                                                <div className="relative aspect-video w-full bg-edu-secondary overflow-hidden">
                                                    <img src={`${course.image}`} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                                </div>

                                                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-edu-dark/80">
                                                    {course.level}
                                                </div>
                                            </div>

                                            <CardContent className="p-6 space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="px-3 py-1 rounded-full bg-edu-secondary/50 text-xs font-medium text-edu-dark/80">
                                                        {course.category}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-semibold hover:text-edu-primary transition-colors duration-300">
                                                    {course.title}
                                                </h3>

                                                <p className="text-sm text-edu-dark/70 line-clamp-2">
                                                    {course.description}
                                                </p>

                                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                                    <div className="flex items-center text-sm text-edu-dark/70">
                                                        <Clock className="h-4 w-4 mr-1" />
                                                        {course.Duration} Weeks
                                                    </div>
                                                    <div className="flex items-center text-sm text-edu-dark/70">
                                                        <Users className="h-4 w-4 mr-1" />
                                                        {course?.students?.length}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="text-sm text-edu-dark/70">
                                                        By <span className="font-medium text-edu-dark">{course.instructorName}</span>
                                                    </div>
                                                    <Link
                                                        to={`/courses/details/${course._id}`}
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
                                {loading && (
                                    <div className="flex justify-center mt-8">
                                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-edu-primary"></div>
                                    </div>
                                )}
                                {!hasMore && courses.length > 0 && (
                                    <div className="text-center mt-8 text-edu-dark/70">
                                        You've reached the end of the list
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Courses;