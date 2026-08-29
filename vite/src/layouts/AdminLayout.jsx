import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">

      <AdminSidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-64">

        <AdminHeader
          setMobileOpen={setMobileOpen}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}