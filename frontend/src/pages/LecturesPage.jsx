import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Play } from 'lucide-react';
import Layout from '@/components/Layout';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { fethCourceDetailById } from '@/services';
import NavigationMenu from '@/components/student/NavigationMenu';

const LecturesPage = () => {
    const { id } = useParams();
    const [lectures, setLectures] = useState([]);
    const [activeLecture, setActiveLecture] = useState(null);

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const { data } = await fethCourceDetailById(id);
                setLectures(data.curriculum);

                setActiveLecture(data.curriculum[0] || null);
            } catch (error) {
                console.error("Error fetching lectures:", error);
            }
        };
        fetchLectures();
    }, [id]);

    const handleLectureSelect = (lecture) => {
        setActiveLecture(lecture);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="w-ful">
                <NavigationMenu />
            </div>

            <div className="flex flex-1 flex-col lg:flex-row overflow-auto">
                <div className="flex-1 p-4 lg:p-6">
                    <div className="max-w-5xl mx-auto">
                        {activeLecture ? (
                            <>
                                <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100">
                                    <video
                                        src={activeLecture.videoUrl}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="mt-4 animate-fade-in">
                                    <Badge className="mb-2 bg-primary/10 text-primary-foreground/70">
                                        Lecture {activeLecture._id}
                                    </Badge>
                                    <h1 className="text-2xl md:text-3xl font-medium">{activeLecture.title}</h1>
                                    <Separator className="my-4" />
                                </div>
                            </>
                        ) : (
                            <p>Loading lectures...</p>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-80 border-t lg:border-l border-border/50 bg-card/30 backdrop-blur-sm">
                    <div className="p-4 border-b border-border/50">
                        <h2 className="font-medium">Course Lectures</h2>
                        <p className="text-sm text-muted-foreground">{lectures.length} lectures</p>
                    </div>
                    <ScrollArea className="h-[calc(100vh-140px)]">
                        <div className="p-2">
                            {lectures.map((lecture) => (
                                <div
                                    key={lecture._id}
                                    onClick={() => handleLectureSelect(lecture)}
                                    className={cn(
                                        "flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
                                        activeLecture?._id === lecture._id ? "bg-primary/10" : "hover:bg-primary/5"
                                    )}
                                >
                                    <div className="relative h-20 aspect-video flex-shrink-0 rounded-md overflow-hidden border border-border/50 bg-gray-200 flex items-center justify-center">
                                        <Play className="w-8 h-8 text-gray-500" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className={cn("text-sm mt-1 line-clamp-2 leading-tight",
                                            activeLecture?._id === lecture._id ? "font-medium" : "")}>{lecture.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
};

export default LecturesPage;
