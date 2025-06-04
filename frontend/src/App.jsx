import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentHomePage from "./pages/StudentHomePage";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MyLearning from "./pages/MyLearning";
import TeacherAddCourse from "./pages/TeacherAddCourse";
import TeacherDashboard from "./pages/TeacherDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import InstructorDashboardPage from "./pages/InstructorDashboardPage";
import PaypalPaymentReturnPage from "./pages/PaypalPaymentReturnPage";
import StudentViewLecturePage from "./pages/StudentViewLecturePage";

const App = () => {
  const { auth, loading } = useContext(AuthContext)
  const { authenticate, user } = auth
  if (loading) return <h1>Loading....</h1>
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/instructor"
            element={
              <ProtectedRoute
                element={<TeacherDashboard />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          <Route
            path="/instructor/add-course"
            element={
              <ProtectedRoute
                element={<TeacherAddCourse />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          {/* <Route
            path="/instructor/edit-course/:courseId"
            element={
              <RouteGuard
                element={<AddNewCoursePage />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          /> */}

          <Route path="" element={<StudentHomePage />} />
          <Route path="home" element={<StudentHomePage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path="/courses/watch/:id" element={<StudentViewLecturePage />} />
          <Route
            path="courses/details/:id"
            element={<CourseDetail />}
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          {/* <Route path="student-courses" element={<StudentCoursesPage />} /> */}
          {/* <Route
            path="course-progress/:id"
            element={<StudentViewCourseProgressPage />}
          /> */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  )
};

export default App;