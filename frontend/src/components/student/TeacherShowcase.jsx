import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const teachersData = [
    {
        id: 1,
        name: "Dr. Maya Patel",
        title: "Data Science Professor",
        image: "/placeholder.svg",
        bio: "Former Google AI researcher with 10+ years of experience in machine learning and data science.",
        courses: 12,
        students: 8450,
        rating: 4.9,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 2,
        name: "James Wilson",
        title: "UX Design Lead",
        image: "/placeholder.svg",
        bio: "Award-winning designer with experience at top tech companies like Apple and Airbnb.",
        courses: 8,
        students: 12340,
        rating: 4.8,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 3,
        name: "Dr. Robert Chen",
        title: "Software Engineering Director",
        image: "/placeholder.svg",
        bio: "25+ years of software development experience and former CTO of multiple successful startups.",
        courses: 15,
        students: 15680,
        rating: 4.7,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    },
    {
        id: 4,
        name: "Sarah Johnson",
        title: "Digital Marketing Strategist",
        image: "/placeholder.svg",
        bio: "Marketing consultant who has helped scale 100+ businesses through digital strategies.",
        courses: 10,
        students: 7890,
        rating: 4.8,
        socials: { linkedin: "#", twitter: "#", website: "#" }
    }
];

const TeacherShowcase = () => {
    const [animateElements, setAnimateElements] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('teacher-showcase');
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
        <section id="teacher-showcase" className="py-20 bg-edu-secondary/30">
            <div className="section-container">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div className="space-y-4 mb-6 md:mb-0">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-edu-primary/10 text-edu-primary text-sm font-medium transition-all duration-700 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Expert Instructors</div>
                        <h2 className={`text-3xl md:text-4xl font-bold transition-all duration-700 delay-100 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Learn from industry leaders</h2>
                        <p className={`text-edu-dark/70 max-w-2xl transition-all duration-700 delay-200 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>Our instructors bring years of professional experience and academic excellence to deliver high-quality education.</p>
                    </div>
                    <Link to="/teachers" className={`flex items-center font-medium text-edu-primary hover:text-edu-primary/80 transition-all duration-700 delay-300 ${animateElements ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
                        Meet all instructors
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default TeacherShowcase;
