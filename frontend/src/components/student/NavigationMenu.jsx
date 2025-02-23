import { AuthContext } from "@/context/AuthContext";
import { fetchInstructorCourseListService } from "@/services";
import { Book, Calendar, Home, MessageSquare, Search, Settings, User } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
    const navigate = useNavigate();
    // const { auth } = useContext(AuthContext)
    // console.log(auth)
    const menuItems = [
        { icon: Home, label: "Dashboard", path: "/" },
        { icon: Book, label: "My Courses", path: "/student-courses" },
        // { icon: Calendar, label: "Schedule", path: "/schedule" },
        { icon: MessageSquare, label: "Messages", path: "/messages" },
        // { icon: Search, label: "Search", path: "/search" },
        { icon: Settings, label: "Settings", path: "/settings" },
        { icon: User, label: "Profile", path: "/profile" },
    ];

    // fetchCources();
    // console.log(data)
    return (
        <nav className="fixed bottom-0 left-0 w-full md:relative md:w-auto bg-card md:bg-transparent shadow-lg md:shadow-none z-50">
            <div className="flex md:flex-col justify-around md:justify-start p-4 md:p-0 md:space-y-2">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className="flex flex-col md:flex-row items-center md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-lavender transition-colors duration-200"
                    >
                        <item.icon className="w-6 h-6 text-soft-text" />
                        <span className="text-xs md:text-sm mt-1 md:mt-0 text-soft-text">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default NavigationMenu;
