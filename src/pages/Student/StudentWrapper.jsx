import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";

const StudentWrapper = () => {
  return (
    <div className="w-screen h-screen flex overflow-hidden bg-white">
      <NavBar
        options={[
          { name: "View Profile", path: "/student/view-profile" },
          { name: "Send Tokens", path: "/student/send-tokens" },
          {
            name: "Browse Opportunities",
            path: "/student/browse-opportunities",
          },
          { name: "Transaction Log", path: "/student/transaction-log" },
        ]}
      />
      <div className="w-4/5 h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentWrapper;
