import { useState } from "react";
import { Link } from "react-router-dom";
import {
    PlayCircle,
    BookOpen,
    Search,
    Clock,
    Filter,
    Heart,
    Award  // Replacing Certificate with Award which is more appropriate for certificates
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { allCoursesData } from "@/data/courses";

// Mock data for purchased courses with additional details
const purchasedCourses = [
    {
        ...allCoursesData[0],
        progress: 45,
        lastAccessed: "2023-10-15T14:30:00",
        completedLectures: 4,
        totalLectures: 12,
        certificate: false,
        favorite: true,
        notes: 3
    },
    {
        ...allCoursesData[2],
        progress: 20,
        lastAccessed: "2023-10-17T09:15:00",
        completedLectures: 2,
        totalLectures: 15,
        certificate: false,
        favorite: false,
        notes: 1
    },
    {
        ...allCoursesData[5],
        progress: 75,
        lastAccessed: "2023-10-10T11:45:00",
        completedLectures: 8,
        totalLectures: 10,
        certificate: false,
        favorite: true,
        notes: 5
    },
    {
        ...allCoursesData[7],
        progress: 10,
        lastAccessed: "2023-10-18T16:20:00",
        completedLectures: 1,
        totalLectures: 14,
        certificate: false,
        favorite: false,
        notes: 0
    },
    {
        ...allCoursesData[3],
        progress: 100,
        lastAccessed: "2023-09-30T10:20:00",
        completedLectures: 8,
        totalLectures: 8,
        certificate: true,
        favorite: true,
        notes: 7
    },
    {
        ...allCoursesData[9],
        progress: 60,
        lastAccessed: "2023-10-05T08:15:00",
        completedLectures: 8,
        totalLectures: 14,
        certificate: false,
        favorite: false,
        notes: 4
    }
];

const MyCourses = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("recent");
    const [filterOption, setFilterOption] = useState("all");

    // Filter courses based on search query and filter option
    const filteredCourses = purchasedCourses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        switch (filterOption) {
            case "inProgress":
                return course.progress > 0 && course.progress < 100;
            case "completed":
                return course.progress === 100;
            case "favorites":
                return course.favorite;
            case "certificates":
                return course.certificate;
            default:
                return true;
        }
    });

    // Sort courses based on the selected sort option
    const sortedCourses = [...filteredCourses].sort((a, b) => {
        switch (sortOption) {
            case "recent":
                return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
            case "title":
                return a.title.localeCompare(b.title);
            case "progress":
                return b.progress - a.progress;
            case "favorite":
                return (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0);
            default:
                return 0;
        }
    });

    // Generate filter options text
    const getFilterText = () => {
        switch (filterOption) {
            case "inProgress": return "In Progress";
            case "completed": return "Completed";
            case "favorites": return "Favorites";
            case "certificates": return "With Certificates";
            default: return "All Courses";
        }
    };

    return (
        <div className="container max-w-6xl mx-auto py-12 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">My Courses</h1>
                <p className="text-gray-600">
                    Review and continue your enrolled courses
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="relative w-full md:w-auto md:min-w-[320px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search your courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto">
                                <Filter className="mr-2 h-4 w-4" />
                                {getFilterText()}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                checked={filterOption === "all"}
                                onCheckedChange={() => setFilterOption("all")}
                            >
                                All Courses
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filterOption === "inProgress"}
                                onCheckedChange={() => setFilterOption("inProgress")}
                            >
                                In Progress
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filterOption === "completed"}
                                onCheckedChange={() => setFilterOption("completed")}
                            >
                                Completed
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filterOption === "favorites"}
                                onCheckedChange={() => setFilterOption("favorites")}
                            >
                                Favorites
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={filterOption === "certificates"}
                                onCheckedChange={() => setFilterOption("certificates")}
                            >
                                With Certificates
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full md:w-auto">
                                Sort: {sortOption === "recent" ? "Recently Accessed" :
                                    sortOption === "title" ? "Title A-Z" :
                                        sortOption === "progress" ? "Progress" : "Favorites"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem
                                checked={sortOption === "recent"}
                                onCheckedChange={() => setSortOption("recent")}
                            >
                                Recently Accessed
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortOption === "title"}
                                onCheckedChange={() => setSortOption("title")}
                            >
                                Title A-Z
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortOption === "progress"}
                                onCheckedChange={() => setSortOption("progress")}
                            >
                                Progress
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortOption === "favorite"}
                                onCheckedChange={() => setSortOption("favorite")}
                            >
                                Favorites
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {sortedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedCourses.map((course) => (
                        <Card key={course.id} className="overflow-hidden transition-all hover:shadow-md flex flex-col">
                            <div className="relative">
                                <div className="aspect-video w-full bg-gray-100 flex items-center justify-center">
                                    <div className="text-gray-400">Course Image</div>
                                </div>
                                {course.progress === 100 && (
                                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                                        Completed
                                    </div>
                                )}
                                {course.favorite && (
                                    <div className="absolute top-2 left-2">
                                        <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                                    </div>
                                )}
                                {course.certificate && (
                                    <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                                        <Award className="h-3 w-3 mr-1" />
                                        Certificate
                                    </div>
                                )}
                            </div>

                            <CardContent className="p-5 flex-1 flex flex-col">
                                <div className="mb-2 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                        <p className="text-sm text-gray-500">{course.instructor}</p>
                                    </div>
                                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded">
                                        {course.category}
                                    </span>
                                </div>

                                <div className="mt-2 mb-3">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{course.progress}%</span>
                                    </div>
                                    <Progress value={course.progress} className="h-2" />
                                </div>

                                <div className="mt-auto flex flex-col gap-3">
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <BookOpen className="h-4 w-4 mr-1" />
                                            {course.completedLectures}/{course.totalLectures} lectures
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1" />
                                            {new Date(course.lastAccessed).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                        </div>
                                    </div>

                                    <Link to={`/courses/${course.id}/lecture/1`} className="mt-2">
                                        <Button className="w-full">
                                            <PlayCircle className="mr-2 h-4 w-4" />
                                            {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium">No courses found</h3>
                    <p className="text-gray-500 mt-2 max-w-md mx-auto">
                        Try adjusting your search or filters, or explore our catalog to find courses that match your interests.
                    </p>
                    <Link to="/courses">
                        <Button className="mt-4">Browse Courses</Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyCourses;