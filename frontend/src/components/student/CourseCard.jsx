import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const CourseCard = ({ title, description, image, progress, category, duration }) => {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
            <div className="aspect-video relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader className="space-y-1">
                <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-secondary text-sm">
                        {category}
                    </Badge>
                    <span className="text-sm text-gray-500">{duration}</span>
                </div>
                <h3 className="font-semibold text-lg leading-none tracking-tight">{title}</h3>
            </CardHeader>
            <CardContent className="space-y-4">
                <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                </div>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
