import React, { useContext } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import { AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import InstructorDashboardPage from "./pages/InstructorDashboardPage";
import AddNewCoursePage from "./pages/AddNewCoursePage";
// import StudentHomePage from "./pages/StudentHomePage";
import StudentHomePage from "./pages/StudentHomePage";
import CourceDetail from "./pages/CourceDetail";
import PaypalPaymentReturnPage from "./pages/PaypalPaymentReturnPage";
import StudentCourcePage from "./pages/StudentCourcePage";
import LecturesPage from "./pages/LecturesPage";
function App() {
  const { auth } = useContext(AuthContext)
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route
            path="/auth"
            element={<ProtectedRoute
              element={<AuthPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />}
          />

          <Route
            path="/instructor"
            element={<ProtectedRoute
              element={<InstructorDashboardPage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />}
          />
          <Route
            path="/instructor/add-course"
            element={
              <ProtectedRoute
                element={<AddNewCoursePage />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />

          <Route
            path="/"
            element={<ProtectedRoute
              element={<StudentHomePage />}
              authenticated={auth?.authenticate}
              user={auth?.user}
            />}
          >
            <Route path="" element={<StudentHomePage />} />
            <Route path="home" element={<StudentHomePage />} />
            <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
            {/* <Route path="student-courses" element={<StudentCourcePage />} /> */}
            <Route
              path="course-progress/:id"
              element={<StudentCourcePage />}
            />
          </Route>
          <Route
            path="/student-courses"
            element={
              <ProtectedRoute
                element={<StudentCourcePage />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          <Route
            path="/student-courses/learn/:id"
            element={
              <ProtectedRoute
                element={<LecturesPage />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route path="/home/course-detail/:id"
            element={
              <ProtectedRoute
                element={<CourceDetail />}
                authenticated={auth?.authenticate}
                user={auth?.user}
              />
            }
          />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
}


export default App;
