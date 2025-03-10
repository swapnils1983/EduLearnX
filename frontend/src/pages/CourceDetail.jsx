import CourseContent from "@/components/student/CourseContent";
import CourseHeader from "@/components/student/CourseHeader";
import { AuthContext } from "@/context/AuthContext";
import { fetchStudentBoughtCoursesService, fethCourceDetailById } from "@/services";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const CourceDetail = () => {
    const course_id = useParams();
    const [courses, setCourses] = useState();
    const navigate = useNavigate()
    const { auth } = useContext(AuthContext)
    const [isPurchased, setIsPurchased] = useState(false);
    const fetchCourses = async () => {
        const { data } = await fethCourceDetailById(course_id.id);
        setCourses(data);
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        const checkPurchased = async () => {
            if (!auth?.user) return;

            try {
                const data = await fetchStudentBoughtCoursesService(auth?.user?._id);
                const purchasedCourses = data.data
                const hasPurchased = purchasedCourses.some(course => course.courseId === course_id.id);
                if (hasPurchased) {
                    setIsPurchased(true);
                    navigate("/student-courses");
                }
            } catch (error) {
                console.error("Error fetching purchased courses:", error);
            }
        };

        checkPurchased();
    }, [course_id, auth, navigate]);
    return (
        <div className="min-h-screen bg-background">
            <CourseHeader courses={courses} />
            <CourseContent courses={courses} />
        </div>
    );
};

export default CourceDetail;