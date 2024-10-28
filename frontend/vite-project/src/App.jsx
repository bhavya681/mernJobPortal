import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import ApplyPage from "./pages/ApplyPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "./components/AdminPage";
import RecruiterPage from "./components/Recruiter";
import Navbar from "./components/shared/Navbar";
import ForgotPassword from "./components/ForgotPassword";
import LatestJobs from "./components/LatestJobs.jsx";
import HeroSection from "./components/HeroSection.jsx";
import CategoryCarousel from "./components/CategoryCarousel.jsx";
import Footer from "./components/Footer.jsx";
import JobDetail from "./components/JobDetail";
import { useSelector } from "react-redux";
import ErrorK from "./pages/ErrorK";
import ApplyJob from "./components/ApplyJob";
import RecruiterCompanies from "./recruiter/RecruiterCompanies";
import RecruiterJobs from "./recruiter/RecruiterJobs";
import CompanyCreate from "./recruiter/CompanyCreate";
import CompanyCreated from "./recruiter/CompanyCreated";
import AdminJobByID from "./recruiter/AdminJobByID";
import AdminJobCreated from "./recruiter/AdminJobCreated";
import RecruiterallJobs from "./recruiter/RecruiterallJobs";
import ApplicantPage from "./recruiter/ApplicantPage";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {user?.role === "student" ? (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/browse" element={<ApplyPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/recruiter" element={<RecruiterPage />} />
              <Route path="/details/:id" element={<JobDetail />} />
              <Route path="/apply/:id" element={<ApplyJob />} />
            </>
          ) : user?.role === "recruiter" ? (
            <>
              <Route path="/admin/jobs" element={<RecruiterallJobs />} />
              <Route path="/admin/companies" element={<RecruiterCompanies />} />
              <Route path="/recruiter/company/create" element={<CompanyCreate/>}/>
              <Route path="/admin/companies/:id" element={<CompanyCreated/>}/>
              <Route path="/admin/jobs/:id" element={<AdminJobByID/>}/>
              <Route path="/admin/job/create" element={<AdminJobCreated/>}/>

              <Route path="/admin/jobs/:id/applicants" element={<ApplicantPage/>}/>
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/browse" element={<ApplyPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              {/* <Route path="/admin" element={<AdminPage />} />
              <Route path="/recruiter" element={<RecruiterPage />} /> */}
            </>
          )}
          <Route path="/*" element={<ErrorK />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
