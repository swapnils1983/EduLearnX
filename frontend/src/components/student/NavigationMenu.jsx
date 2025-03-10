import { AuthContext } from "@/context/AuthContext";
import { Book, Home, LogOut } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavigationMenu = () => {
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");

        setAuth({
            authenticate: false,
            user: null
        });

        navigate("/login");
    };

    const menuItems = [
        { icon: Home, label: "Home", path: "/" },
        { icon: Book, label: "My Courses", path: "/student-courses" },
    ];

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
                <button
                    onClick={handleLogout}
                    className="flex flex-col md:flex-row items-center md:space-x-3 p-2 md:p-3 rounded-lg hover:bg-red-500 transition-colors duration-200"
                >
                    <LogOut className="w-6 h-6 text-soft-text" />
                    <span className="text-xs md:text-sm mt-1 md:mt-0 text-soft-text">
                        Logout
                    </span>
                </button>
            </div>
        </nav>
    );
};

export default NavigationMenu;
