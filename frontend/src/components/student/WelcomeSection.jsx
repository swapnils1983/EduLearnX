import { AuthContext } from "@/context/AuthContext";
import { Badge, GraduationCap, Play } from "lucide-react";
import { useContext } from "react";


const WelcomeSection = () => {
    const { auth } = useContext(AuthContext);

    return (
        <section className="mb-16 animate-fade-in">
            <div className="rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-blue-500/70 mix-blend-multiply" />
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
                    alt="Students learning"
                    className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16">

                    <h1 className="text-3xl md:text-5xl font-bold text-white max-w-2xl">
                        Learn at your own pace with our video lectures
                    </h1>
                    <p className="text-white/90 mt-4 max-w-lg">
                        Access high-quality educational content from experienced instructors. Start learning today.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WelcomeSection;
