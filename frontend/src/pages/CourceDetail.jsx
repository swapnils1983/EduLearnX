import CourseContent from "@/components/student/CourseContent";
import CourseHeader from "@/components/student/CourseHeader";
import { fethCourceDetailById } from "@/services";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const CourceDetail = () => {
    const course_id = useParams();
    const [courses, setCourses] = useState();
    const fetchCourses = async () => {
        const { data } = await fethCourceDetailById(course_id.id);
        console.log(data);
        setCourses(data);
    };
    console.log(course_id)
    useEffect(() => {
        fetchCourses();
    }, []);
    return (
        <div className="min-h-screen bg-background">
            <CourseHeader courses={courses} />
            <CourseContent courses={courses} />
        </div>
    );
};

export default CourceDetail;