import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Labs from "../pages/Doctors/Labs";
import LabDetails from "../Lab/LabDetails";
import Services from "../pages/Services";
import MyAccount from "../Dashboard/User-Account/MyAccount";
import Dashboard from "../Dashboard/Doctor-Account/Dashboard";
import AdminDashboard from "../Dashboard/Lab-Account/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import Contact from "../pages/Contact";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import Blogs from "../pages/Blogs";
import Blog from "../pages/WriteBlog";
import ShowBlog from "../pages/Blog"
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import OtherDoctors from "../pages/OtherDoctors"
import BloodTest from "../Dashboard/Lab-Account/TestForm/BloodTest";

const Router = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />

      <Route path="/labs" element={<Labs />} />
      <Route path="/labs/:id" element={<LabDetails />} />
      <Route path="/services" element={<Services />} />

      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/labdashboard"
        element={
          // <ProtectedRoute allowedRoles={["labAdmin"]}>
          <AdminDashboard />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/blog"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Blog />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:id" element={<ShowBlog />} />

      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword/:id/:token" element={<ResetPassword />} />

      <Route path="/otherdoctors" element={<OtherDoctors />} />

      <Route path="/reportform" element={<BloodTest />} />

    </Routes>
  );
};

export default Router;
