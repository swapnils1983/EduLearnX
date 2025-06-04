import { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";

const reviewsData = [
    {
        id: 1,
        name: "Jennifer Martinez",
        role: "UX Designer",
        avatar: "/placeholder.svg",
        content: "The UX Design course completely transformed my career. Within two months of completing it, I landed my dream job. The instructor's real-world examples and hands-on projects were exactly what I needed.",
        rating: 5,
        course: "UX Design Fundamentals"
    },
    {
        id: 2,
        name: "David Kim",
        role: "Software Developer",
        avatar: "/placeholder.svg",
        content: "As someone transitioning from another field, the Full-Stack Development course provided the perfect structure to build my skills step by step. The community support was incredible too.",
        rating: 5,
        course: "Full-Stack Web Development"
    },
    {
        id: 3,
        name: "Maya Johnson",
        role: "Data Analyst",
        avatar: "/placeholder.svg",
        content: "The depth of content in the Data Science course is impressive. I appreciated how the instructor broke down complex concepts into understandable parts without oversimplifying.",
        rating: 4,
        course: "Data Science Essentials"
    },
    {
        id: 4,
        name: "Alex Thompson",
        role: "Marketing Manager",
        avatar: "/placeholder.svg",
        content: "This platform offers the perfect balance of theoretical knowledge and practical application. The Digital Marketing course helped me implement strategies that doubled our company's conversion rate.",
        rating: 5,
        course: "Digital Marketing Mastery"
    }
];

const Reviews = () => {
    const [animateElements, setAnimateElements] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('reviews');
            if (element) {
                const position = element.getBoundingClientRect();
                if (position.top < window.innerHeight * 0.75) {
                    setAnimateElements(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="reviews" className="py-20 bg-white">
            <div className="section-container">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-edu-secondary text-edu-primary text-sm font-medium transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Student Success Stories</div>
                    <h2 className={`text-3xl md:text-4xl font-bold transition-all duration-700 delay-100 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>What our students say</h2>
                    <p className={`text-edu-dark/70 transition-all duration-700 delay-200 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Discover how our courses have helped students achieve their goals and advance their careers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviewsData.map((review, index) => (
                        <div key={review.id} className={`review-card relative transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${300 + index * 100}ms` }}>
                            <Quote className="absolute top-4 right-4 h-6 w-6 text-edu-primary/20" />
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-edu-secondary/50 flex items-center justify-center overflow-hidden">
                                    <div className="text-edu-dark/50 text-xs">Photo</div>
                                </div>
                                <div>
                                    <h4 className="font-medium text-edu-dark">{review.name}</h4>
                                    <p className="text-sm text-edu-dark/70">{review.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <p className="text-edu-dark/80 text-sm mb-4 line-clamp-4">{review.content}</p>
                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-xs text-edu-dark/60">Course: <span className="text-edu-primary font-medium">{review.course}</span></p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-16 flex justify-center transition-all duration-700 delay-700 ${animateElements ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="bg-edu-secondary/30 rounded-2xl p-6 md:p-10 max-w-4xl text-center space-y-6">
                        <div className="flex justify-center">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-edu-secondary/50"></div>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">Join our global learning community</h3>
                        <p className="text-edu-dark/70 max-w-2xl mx-auto">Connect with students and instructors from around the world. Share knowledge, collaborate on projects, and accelerate your learning journey.</p>
                        <div className="flex justify-center space-x-3">
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-edu-dark flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> 12,450 online now
                            </div>
                            <div className="px-4 py-2 bg-white rounded-full text-sm font-medium text-edu-dark">200+ countries</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
