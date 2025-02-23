import { AuthContext } from "@/context/AuthContext";
import { GraduationCap } from "lucide-react";
import { useContext } from "react";

const WelcomeSection = () => {
    const { auth } = useContext(AuthContext)
    return (
        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-100 to-purple-200 text-gray-800 shadow-md animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-medium text-gray-600 mb-1">Welcome back</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{auth.user.userName}</h1>
                    <p className="text-gray-700">You've completed <span className="font-semibold text-gray-900">80%</span> of your weekly goals</p>
                </div>
                <div className="hidden md:flex items-center justify-center w-16 h-16 bg-white shadow rounded-full">
                    <GraduationCap className="w-8 h-8 text-gray-700" />
                </div>
            </div>
        </div>
    );
};

export default WelcomeSection;
