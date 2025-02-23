import { BookOpenText, User, Users } from "lucide-react";

const CourseContent = ({ courses }) => {
    return (
        <div className="container px-4 py-16 mx-auto animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Course Overview</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {courses?.description}
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                                <BookOpenText className="w-5 h-5 text-primary" />
                                <div>
                                    <h3 className="font-medium">12 Modules</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Comprehensive curriculum
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                                <User className="w-5 h-5 text-primary" />
                                <div>
                                    <h3 className="font-medium">1-on-1 Mentoring</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Personal guidance
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-secondary rounded-lg">
                                <Users className="w-5 h-5 text-primary" />
                                <div>
                                    <h3 className="font-medium">Community Access</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Learn with peers
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">What You'll Learn</h2>
                        {/* <ul className="space-y-4">
                            {[
                                "Advanced React Hooks and Custom Hooks",
                                "TypeScript Best Practices",
                                "State Management Patterns",
                                "Performance Optimization",
                                "Testing Strategies",
                                "Real-world Project Architecture",
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-6 h-6 text-xs font-medium text-primary bg-primary/10 rounded-full">
                                        {index + 1}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul> */}
                        {courses?.objectives && (
                            <ul className="list-disc pl-5">
                                {courses.objectives.split('.').map((point, index) =>
                                    point.trim() ? <li key={index}>{point.trim()}</li> : null
                                )}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
