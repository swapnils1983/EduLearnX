import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const coursesData = [
    {
        id: 1,
        title: "UX Design Fundamentals",
        description: "Learn the core principles of user experience design and create intuitive interfaces.",
        image: "/placeholder.svg",
        instructor: "Sarah Johnson",
        rating: 4.8,
        students: 2453,
        duration: "10 weeks",
        level: "Beginner",
        category: "Design"
    },
    {
        id: 2,
        title: "Full-Stack Web Development",
        description: "Master both front-end and back-end technologies to build complete web applications.",
        image: "/placeholder.svg",
        instructor: "Michael Chen",
        rating: 4.9,
        students: 3821,
        duration: "16 weeks",
        level: "Intermediate",
        category: "Programming"
    },
    {
        id: 3,
        title: "Data Science Essentials",
        description: "Learn data analysis, visualization, and machine learning fundamentals.",
        image: "/placeholder.svg",
        instructor: "Emily Rodriguez",
        rating: 4.7,
        students: 1987,
        duration: "12 weeks",
        level: "Intermediate",
        category: "Data Science"
    },
    {
        id: 4,
        title: "Digital Marketing Mastery",
        description: "Develop comprehensive skills in SEO, content marketing, and social media strategy.",
        image: "/placeholder.svg",
        instructor: "James Wilson",
        rating: 4.6,
        students: 2145,
        duration: "8 weeks",
        level: "All Levels",
        category: "Marketing"
    }
];

// const FeaturedCourses = () => {
//     const [animateElements, setAnimateElements] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             const element = document.getElementById('featured-courses');
//             if (element) {
//                 const position = element.getBoundingClientRect();
//                 if (position.top < window.innerHeight * 0.75) {
//                     setAnimateElements(true);
//                 }
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         handleScroll();

//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <section id="featured-courses" className="py-20 bg-white">
//             <div className="section-container">
//                 <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
//                     <div className="space-y-4 mb-6 md:mb-0">
//                         <div className={`inline-flex items-center px-3 py-1 rounded-full bg-edu-secondary text-edu-primary text-sm font-medium transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Featured Courses</div>
//                         <h2 className={`text-3xl md:text-4xl font-bold transition-all duration-700 delay-100 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Learn from the best instructors</h2>
//                         <p className={`text-edu-dark/70 max-w-2xl transition-all duration-700 delay-200 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Our courses are designed and taught by industry experts who are passionate about sharing their knowledge and helping you achieve your goals.</p>
//                     </div>
//                     <Link to="/courses" className={`flex items-center font-medium text-edu-primary hover:text-edu-primary/80 transition-all duration-700 delay-300 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
//                         View all courses <ArrowRight className="ml-2 h-4 w-4" />
//                     </Link>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                     {coursesData.map((course, index) => (
//                         <div
//                             key={course.id}
//                             className={`course-card group transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-8'}`}
//                             style={{ transitionDelay: `${400 + index * 100}ms` }}
//                         >
//                             <div className="relative">
//                                 <div className="aspect-video w-full bg-edu-secondary flex items-center justify-center overflow-hidden">
//                                     <div className="text-edu-dark/50">Course Image</div>
//                                 </div>
//                                 <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-edu-dark/80">{course.level}</div>
//                             </div>

//                             <div className="p-6 space-y-4">
//                                 <div className="flex items-center justify-between">
//                                     <span className="px-3 py-1 rounded-full bg-edu-secondary/50 text-xs font-medium text-edu-dark/80">{course.category}</span>
//                                     <div className="flex items-center">
//                                         <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
//                                         <span className="ml-1 text-sm font-medium">{course.rating}</span>
//                                     </div>
//                                 </div>

//                                 <h3 className="text-xl font-semibold group-hover:text-edu-primary transition-colors duration-300">{course.title}</h3>
//                                 <p className="text-sm text-edu-dark/70 line-clamp-2">{course.description}</p>

//                                 <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
//                                     <div className="flex items-center text-sm text-edu-dark/70"><Clock className="h-4 w-4 mr-1" />{course.duration}</div>
//                                     <div className="flex items-center text-sm text-edu-dark/70"><Users className="h-4 w-4 mr-1" />{course.students.toLocaleString()}</div>
//                                 </div>

//                                 <div className="flex items-center justify-between">
//                                     <div className="text-sm text-edu-dark/70">By <span className="font-medium text-edu-dark">{course.instructor}</span></div>
//                                     <Link to={`/courses/${course.id}`} className="text-edu-primary font-medium text-sm hover:text-edu-primary/80 transition-colors">View Course</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className={`flex justify-center mt-12 transition-all duration-700 delay-800 ${animateElements ? 'opacity-100' : 'opacity-0'}`}>
//                     <Link to="/courses">
//                         <Button className="rounded-full bg-edu-secondary text-edu-dark hover:bg-edu-secondary/80 px-8">Browse All Courses</Button>
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

const FeaturedCourses = () => {
    return (
        <section id="featured-courses" className="py-20 bg-white">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-4 mb-6 md:mb-0">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-edu-secondary text-edu-primary text-sm font-medium">
                            Featured Courses
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-edu-dark">Learn from the best instructors</h2>
                        <p className="text-edu-dark/70 max-w-2xl">
                            Our courses are designed and taught by industry experts who are passionate about sharing their knowledge and helping you achieve your goals.
                        </p>
                    </div>
                    <Link to="/courses" className="flex items-center font-medium text-edu-primary hover:text-edu-primary/80">
                        View all courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {coursesData.map((course) => (
                        <div
                            key={course.id}
                            className="course-card group transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                        >
                            <div className="relative">
                                <div className="aspect-video w-full bg-edu-secondary flex items-center justify-center overflow-hidden">
                                    <div className="text-edu-dark/50">Course Image</div>
                                </div>
                                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium text-edu-dark/80">
                                    {course.level}
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <h3 className="text-xl font-semibold group-hover:text-edu-primary transition-colors duration-300">
                                    {course.title}
                                </h3>
                                <p className="text-sm text-edu-dark/70 line-clamp-2">{course.description}</p>
                                <Link
                                    to={`/courses/${course.id}`}
                                    className="text-edu-primary font-medium text-sm hover:text-edu-primary/80"
                                >
                                    View Course
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedCourses;