import React, { useEffect } from 'react';
import { Book, Play, Code, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const LectureTypeIcon = ({ type }) => {
    switch (type) {
        case 'video':
            return <Play className="w-4 h-4" />;
        case 'reading':
            return <Book className="w-4 h-4" />;
        case 'interactive':
            return <Code className="w-4 h-4" />;
        default:
            return null;
    }
};

const LectureSideBar = ({ lectures, activeLectureId, onSelectLecture }) => {
    return (
        <div className="w-80 h-full flex flex-col border-r border-border bg-card animate-fade-in">
            <div className="p-6 border-b border-border">
                <h2 className="text-lg font-medium">Course Lectures</h2>
            </div>

            <div className="flex-1 overflow-y-auto py-2">
                {lectures.map((lecture) => (
                    <button
                        key={lecture._id}
                        onClick={() => onSelectLecture(lecture._id)}
                        className={cn(
                            "w-full text-left px-6 py-4 transition-all duration-300 ease-out",
                            "hover:bg-secondary group relative",
                            activeLectureId === lecture._id
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground"
                        )}
                    >
                        <div className="absolute left-0 w-1 h-full transition-all duration-300 rounded-r-md bg-primary opacity-0 transform scale-y-0 origin-left group-hover:opacity-50 group-hover:scale-y-100"
                            style={{ opacity: activeLectureId === lecture.id ? 1 : 0, transform: activeLectureId === lecture.id ? 'scaleY(1)' : 'scaleY(0)' }}
                        />

                        <div className="flex items-start gap-3">
                            <div className={cn(
                                "mt-0.5 flex items-center justify-center rounded-full p-1 text-muted-foreground",
                                activeLectureId === lecture._id && "text-primary"
                            )}>
                                <LectureTypeIcon type={lecture.type} />
                            </div>

                            <div className="flex-1">
                                <h3 className="font-medium mb-1 line-clamp-2">{lecture.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{lecture.duration} min</span>
                                    <span className="mx-2">•</span>
                                    <span className="capitalize">{lecture.type}</span>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LectureSideBar;