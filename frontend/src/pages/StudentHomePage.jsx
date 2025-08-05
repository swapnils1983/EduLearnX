import FeaturedCourses from "@/components/student/FeaturedCourses";
import Footer from "@/components/student/Footer";
import Hero from "@/components/student/Hero";
import Navbar from "@/components/student/Navbar";
import Reviews from "@/components/student/Reviews";
import TeacherShowcase from "@/components/student/TeacherShowcase";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";

const Index = () => {
    const { auth } = useContext(AuthContext);
    console.log(auth)
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, []);

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            <Navbar />
            <main>
                <Hero />
                <FeaturedCourses />
                <TeacherShowcase />
                <Reviews />
            </main>
            <Footer />
        </div>
    );
};

export default Index;
