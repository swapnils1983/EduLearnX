import { useContext, useEffect, useState } from "react";
import CourseCard from "@/components/student/CourseCard";
import NavigationMenu from "@/components/student/Navbar";
import { AuthContext } from "@/context/AuthContext";
import { fetchStudentBoughtCoursesService } from "@/services";


const StudentCourcePage = () => {
    const { auth } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    async function fetchStudentCources() {
        const { data } = await fetchStudentBoughtCoursesService(auth.user._id)

        setCourses(data)
    }
    useEffect(() => {
        fetchStudentCources()
    }, [])
    return (
        <div className="min-h-screen bg-secondary/30 flex">

            <div className="hidden md:block w-64 p-6">
                <NavigationMenu />
            </div>

            <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        My Courses
                    </h1>
                    <p className="text-lg text-gray-600">
                        Continue learning and track your progress
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {courses.map((course) => (
                        <CourseCard key={course.courseId} {...course} />
                    ))}
                </div>

                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No courses found matching your criteria.</p>
                    </div>
                )}
            </main>


            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md">
                <NavigationMenu />
            </div>
        </div>
    );
};

export default StudentCourcePage;
