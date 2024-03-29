import "./App.css";
import LoginPage from "./components/LoginPage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin"
import CreateCourse from "./pages/CreateCourse";
import HomePage from "./pages/HomePage";
import Enrollment from "./pages/Enrollment";
import TempPage from "./pages/TempPage"
import CourseDetailsPage from "./pages/AssignmentPage";
import { useEffect } from "react";
import { nclient } from "./config/client";
import { useDispatch } from "react-redux";
import { set_profile } from "./redux/actions";
import { useNavigate } from "react-router-dom";
import AllSubmissionPage from "./pages/AllSubmissionPage";
import CreateAssignment from "./pages/CreateAssignment";
import SubmissionPage from "./pages/SubmissionPage";
import AddTApage from "./pages/AddTApage";
import AdminLoginPage from "./pages/AdminLoginPage";
import CreateFaculty from "./pages/CreateFacultyPage";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    nclient.get("student/profile", {
      headers: {
        Authorization: localStorage.getItem("token"),
        },
        }).then((res) => {
          dispatch(set_profile(res.data.user));
        }).catch((err) => {
          navigate("/login");
        });
  }, [dispatch,navigate])
  
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<LoginPage />} />
      <Route
        path="/enroll"
        element={
          <ProtectedRoute>
            <Enrollment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-course"
        element={
          <ProtectedRoute>
            <CreateCourse />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/temp"
        element={
          <ProtectedRoute>
            <TempPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/course/:courseId"
        element={
          <ProtectedRoute>
            <CourseDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignment/:assignmentId"
        element={
          <ProtectedRoute>
            <AllSubmissionPage/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/assignment-create/:courseId"
        element={
          <ProtectedRoute>
            <CreateAssignment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/submission/:submissionId"
        element={
          <ProtectedRoute>
            <SubmissionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-ta/:courseId"
        element={
          <ProtectedRoute>
            <AddTApage />
          </ProtectedRoute>
        }
      />
      <Route
        exact
        path="/admin/login"
        element={
          <AdminLoginPage />
        }
      />
      <Route
        exact
        path="/admin"
        element={
          <ProtectedRouteAdmin>
            <CreateFaculty />
          </ProtectedRouteAdmin>
        }
      />
    </Routes>
  );
}
