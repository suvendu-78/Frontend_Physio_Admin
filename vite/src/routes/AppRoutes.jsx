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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<h1>Home</h1>} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
