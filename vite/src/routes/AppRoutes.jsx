import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Appointments from "../pages/admin/Appointments";
import Patients from "../pages/admin/Patients";
import Therapists from "../pages/admin/Therapists";
import Clinics from "../pages/admin/Clinics";
import Services from "../pages/admin/Services";
import Enquiries from "../pages/admin/Enquiries";
import Notifications from "../pages/admin/Notifications";
import Payments from "../pages/admin/Payments";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";
import AdminLanding from "../pages/AdminLanding";
import AdminLogin from "../pages/AdminLogin";
import AdminSignup from "../pages/AdminSignup";
import AdminForgotPassword from "../pages/AdminForgotPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        {/* <Route path="/" element={<h1>Home</h1>} /> */}
        {/* Landing Page */}
        <Route path="/" element={<AdminLanding />} />

        {/* Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/signup" element={<AdminSignup />} />

        <Route
          path="/admin/forgot-password"
          element={<AdminForgotPassword />}
        />

        {/* Admin Panel */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* /admin */}
          <Route index element={<Dashboard />} />

          {/* /admin/appointments */}
          <Route path="appointments" element={<Appointments />} />

          <Route path="patients" element={<Patients />} />

          <Route path="therapists" element={<Therapists />} />

          <Route path="clinics" element={<Clinics />} />

          <Route path="services" element={<Services />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
