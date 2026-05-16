import "./app.css";

import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./context/ThemeContext";
import PageThemeSync from "./context/PageThemeSync";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollProgress from "./components/ScrollProgress/ScrollProgress";
import AnnouncementBar from "./components/AnnouncementBar/AnnouncementBar";
import Loader from "./components/Loader/Loader";
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import Workshops from "./pages/Workshops/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import WorkshopForm from "./pages/WorkshopForm/WorkshopForm";
import Payment from "./pages/Payment/Payment";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import AboutUs from "./pages/AboutUs/AboutUs";
import Courses from "./pages/Courses/Courses";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import RefundPolicy from "./pages/RefundPolicy/RefundPolicy";
import Testimony from "./pages/Testimony/Testimony";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import CourseForm from "./pages/CourseForm/CourseForm";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

// Admin
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminCourses from "./pages/Admin/AdminCourses";
import AdminWorkshops from "./pages/Admin/AdminWorkshops";
import AdminAnnouncements from "./pages/Admin/AdminAnnouncements";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#6366f1",
          fontSize: "1.5rem",
        }}
      >
        <i className="fas fa-circle-notch fa-spin" />
      </div>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate to="/admin" state={{ from: location }} replace />
  );
};

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: "easeIn" } },
};

const PublicShell = () => {
  const location = useLocation();

  // Loader only on homepage, only once per session
  const [loaderDone, setLoaderDone] = useState(() => {
    if (location.pathname !== "/") return true;
    return sessionStorage.getItem("loader-shown") === "true";
  });

  // Scroll to section when navigating from another page via state
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      const el = document.querySelector(target);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
    }
  }, [location.state]);

  return (
    <>
      {!loaderDone && (
        <Loader
          onDone={() => {
            setLoaderDone(true);
            sessionStorage.setItem("loader-shown", "true");
          }}
        />
      )}
      <ScrollToTop />
      <ScrollProgress />
      <PageThemeSync />
      <AnnouncementBar />
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Routes location={location}>
            <Route path="/" element={<Homepage />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/workshop-details" element={<WorkshopDetails />} />
            <Route path="/workshop-form" element={<WorkshopForm />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/testimony" element={<Testimony />} />
            <Route path="/course-details" element={<CourseDetails />} />
            <Route path="/course-form" element={<CourseForm />} />
            <Route path="/courses/:slug" element={<CourseDetails />} />
            <Route path="/workshops/:slug" element={<WorkshopDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/admin" element={<AdminLogin />} />
              <Route
                path="/admin/*"
                element={
                  <RequireAuth>
                    <AdminLayout />
                  </RequireAuth>
                }
              >
                <Route
                  index
                  element={<Navigate to="/admin/dashboard" replace />}
                />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="workshops" element={<AdminWorkshops />} />
                <Route path="announcements" element={<AdminAnnouncements />} />
              </Route>

              <Route path="/*" element={<PublicShell />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
