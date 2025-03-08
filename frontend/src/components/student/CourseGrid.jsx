import { fetchInstructorCourseListService } from "@/services";
import { Book, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseGrid = () => {
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate()
    const fetchCourses = async () => {
        const { data } = await fetchInstructorCourseListService();
        setCourses(data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (
                // <div onClick={navigate('/course-detail')}
                <div
                    key={course._id}
                    className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up"
                >
                    <div onClick={() => navigate(`home/course-detail/${course._id}`)} className="relative h-48 overflow-hidden">
                        <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.description}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                            <span className="font-medium">{course.instructorName}</span>
                            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">{course.level}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm font-semibold">
                            <span className="text-green-600">${course.pricing}</span>
                            <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" /> {course.duration} hrs
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CourseGrid;
