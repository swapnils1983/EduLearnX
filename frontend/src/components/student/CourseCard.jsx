import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const CourseCard = (course) => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`learn/${course.courseId}`)
    }
    return (
        <Card onClick={handleClick} className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in p-4 w-full max-w-2xl cursor-pointer">
            <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                    src={course.courseImage}
                    alt={course.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader className="space-y-1 mt-3">
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-500">Instructor: {course.instructorName}</p>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Date of Purchase:</span>
                    <span>{new Date(course.dateOfPurchase).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span>Progress:</span>
                    <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2 rounded-md" />
            </CardContent>
        </Card>
    );
};

export default CourseCard;