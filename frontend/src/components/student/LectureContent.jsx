import React, { useEffect } from 'react';
import { Badge, Book, Play } from 'lucide-react';
import { Separator } from '@radix-ui/react-select';
import { toast } from 'sonner';
import { updateStudentProgressService } from '@/services';

const LectureContent = ({ lecture, courseId, studentId }) => {
    const handleVideoEnd = async () => {
        try {
            await updateStudentProgressService(courseId, lecture._id, studentId);
            console.log(lecture._id)
            toast.success("Lecture marked as completed");
        } catch (err) {
            toast.error("Failed to update progress");
            console.error(err);
        }
    };

    return (
        <div className="w-full h-full overflow-y-auto animate-scale-in">
            <div className="p-8 max-w-4xl mx-auto">
                <div className="mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 capitalize flex items-center gap-1.5">
                            {lecture.type === 'video' && <Play className="w-3 h-3" />}
                            {lecture.type === 'reading' && <Book className="w-3 h-3" />}
                            {lecture.type}
                        </span>
                        <span>{lecture.duration} minutes</span>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight">{lecture.title}</h1>
                    <p className="text-muted-foreground mt-2">{lecture.description}</p>
                </div>

                {lecture.videoUrl && (
                    <>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                            <video
                                src={lecture.videoUrl}
                                controls
                                className="w-full h-full object-cover"
                                onEnded={handleVideoEnd}
                            />
                        </div>
                        <div className="mt-4 animate-fade-in">
                            <Badge className="mb-2 bg-primary/10 text-primary-foreground/70">
                                Lecture {lecture._id}
                            </Badge>
                            <h1 className="text-2xl md:text-3xl font-medium">{lecture.title}</h1>
                            <Separator className="my-4" />
                        </div>
                    </>
                )}


            </div>
        </div>
    );
};

export default LectureContent;
