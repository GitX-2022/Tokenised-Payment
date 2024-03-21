import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const AdminWrapper = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      <NavBar
        options={[
          { name: "Add Event", path: "/admin/add-event" },
          { name: "Add Student", path: "/admin/add-student" },
          { name: "Reward Student", path: "/admin/reward-student" },
          { name: "Transaction Log", path: "/admin/transaction-log" },
        ]}
      />
      <div className="w-4/5 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminWrapper;
