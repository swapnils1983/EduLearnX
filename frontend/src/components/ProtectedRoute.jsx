import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function ProtectedRoute({ authenticated, user, element }) {
    const location = useLocation();

    console.log(authenticated, user, "useruser");

    if (!authenticated && location.pathname.includes("/signup")) {
        return <Navigate to="/signup" />;
    }
    if (!authenticated && !location.pathname.includes("/login")) {
        return <Navigate to="/login" />;
    }

    if (
        authenticated &&
        user?.role !== "instructor" &&
        (location.pathname.includes("instructor") ||
            location.pathname.includes("/auth"))
    ) {
        return <Navigate to="/home" />;
    }

    if (
        authenticated &&
        user.role === "instructor" &&
        !location.pathname.includes("instructor")
    ) {
        return <Navigate to="/instructor" />;
    }

    return <Fragment>{element}</Fragment>;
}

export default ProtectedRoute;