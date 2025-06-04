import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// const Hero = () => {
//     return (
//         <div className="relative overflow-hidden bg-gradient-to-b from-white to-edu-secondary/30 pt-24 pb-16 md:pt-32 md:pb-24">
//             <div className="section-container relative z-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//                     <div className="space-y-8 max-w-2xl">
//                         <div className="space-y-4">
//                             <div className="inline-flex items-center px-3 py-1 rounded-full bg-edu-primary/10 text-edu-primary text-sm font-medium animate-slide-down opacity-0" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
//                                 <span className="relative flex h-2 w-2 mr-2">
//                                     <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-edu-primary opacity-75"></span>
//                                     <span className="relative inline-flex rounded-full h-2 w-2 bg-edu-primary"></span>
//                                 </span>
//                                 Transforming education through technology
//                             </div>

//                             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight animate-slide-down opacity-0" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
//                                 Learn Without <br />
//                                 <span className="text-edu-primary">Limits</span>
//                             </h1>

//                             <p className="text-lg md:text-xl text-edu-dark/80 leading-relaxed max-w-lg animate-slide-down opacity-0" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
//                                 Discover a new way of learning with our cutting-edge platform. Access world-class courses taught by industry experts.
//                             </p>
//                         </div>

//                         <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-down opacity-0" style={{ animationDelay: "500ms", animationFillMode: "forwards" }}>
//                             <Link to="/courses">
//                                 <Button className="w-full sm:w-auto rounded-full bg-edu-primary text-white px-8 py-6 text-lg hover:bg-edu-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
//                                     Explore Courses
//                                 </Button>
//                             </Link>
//                             <Link to="/about" className="flex items-center text-edu-dark hover:text-edu-primary transition-colors duration-300 font-medium">
//                                 Learn more about us
//                                 <ArrowRight className="ml-2 h-4 w-4" />
//                             </Link>
//                         </div>

//                         <div className="flex items-center gap-4 animate-slide-down opacity-0" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
//                             <div className="flex -space-x-2">
//                                 {[1, 2, 3, 4].map((i) => (
//                                     <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200"></div>
//                                 ))}
//                             </div>
//                             <div className="text-sm text-edu-dark/70">
//                                 <span className="font-semibold text-edu-dark">10,000+</span> students already learning
//                             </div>
//                         </div>
//                     </div>

//                     <div className="relative animate-scale-up opacity-0" style={{ animationDelay: "700ms", animationFillMode: "forwards" }}>
//                         <div className="relative z-10 aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
//                             <div className="absolute inset-0 bg-edu-primary/20"></div>
//                             <div className="w-full h-full bg-gradient-to-br from-edu-primary/30 to-edu-accent/30 flex items-center justify-center">
//                                 <div className="text-white text-opacity-90 text-xl font-medium"><img src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?t=st=1741891035~exp=1741894635~hmac=bc253f9be30852b2b091819a532dd2da9d680654e78ffab302cf25c89e8ad842&w=1380" alt="" /></div>
//                             </div>
//                         </div>

//                         <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-edu-secondary rounded-full z-0 animate-float"></div>
//                         <div className="absolute -top-6 -left-6 w-24 h-24 bg-edu-primary/20 rounded-full z-0 animate-float" style={{ animationDelay: "1s" }}></div>
//                     </div>
//                 </div>

//                 <div className="mt-20 pt-12 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-8">
//                     {[
//                         { number: "200+", label: "Courses" },
//                         { number: "500+", label: "Instructors" },
//                         { number: "50k+", label: "Students" },
//                         { number: "99%", label: "Satisfaction" }
//                     ].map((stat, i) => (
//                         <div key={i} className="text-center animate-slide-up opacity-0" style={{ animationDelay: `${700 + i * 100}ms`, animationFillMode: "forwards" }}>
//                             <div className="text-3xl md:text-4xl font-bold text-edu-primary">{stat.number}</div>
//                             <div className="text-edu-dark/70 font-medium">{stat.label}</div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Hero;

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-edu-primary to-edu-accent pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="section-container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 max-w-2xl">
                        <div className="space-y-4">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white text-sm font-medium animate-slide-down opacity-0">
                                Transforming education through technology
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white animate-slide-down opacity-0">
                                Learn Without <br />
                                <span className="text-edu-secondary">Limits</span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-lg animate-slide-down opacity-0">
                                Discover a new way of learning with our cutting-edge platform. Access world-class courses taught by industry experts.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-4 animate-slide-down opacity-0">
                            <Link to="/courses">
                                <Button className="w-full sm:w-auto rounded-full bg-white text-edu-primary px-8 py-6 text-lg hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]">
                                    Explore Courses
                                </Button>
                            </Link>
                            <Link to="/about" className="flex items-center text-white hover:text-edu-secondary transition-colors duration-300 font-medium">
                                Learn more about us
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    <div className="relative animate-scale-up opacity-0">
                        <div className="relative z-10 aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg"
                                alt="Online Learning"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;