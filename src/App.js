import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Test from "./pages/Test";
import Login from "./pages/Login";
import "./styles/tailwind.output.css";
import AdminWrapper from "./pages/Admin/AdminWrapper";
import AddEvent from "./pages/Admin/AddEvent";
import RewardStudent from "./pages/Admin/RewardStudent";
import TransactionLog from "./pages/Admin/TransactionLog";
import StudentWrapper from "./pages/Student/StudentWrapper";
import Profile from "./pages/Student/Profile";
import BrowseOpportunities from "./pages/Student/BrowseOpportunities";
import AddStudent from "./pages/Admin/AddStudent";
import SendTokens from "./pages/Student/SendTokens";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="admin" element={<AdminWrapper />}>
          <Route path="add-event" element={<AddEvent />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route path="reward-student" element={<RewardStudent />} />
          <Route path="transaction-log" element={<TransactionLog />} />
          <Route path="*" element={<div />} />
          <Route index element={<Navigate to="/admin/add-event" />} />
        </Route>
        <Route path="student" element={<StudentWrapper />}>
          <Route path="view-profile" element={<Profile />} />
          <Route path="send-tokens" element={<SendTokens />} />
          <Route path="browse-opportunities" element={<BrowseOpportunities />} />
          <Route path="transaction-log" element={<TransactionLog />} />
          <Route index element={<Navigate to="/student/view-profile" />} />
        </Route>
        <Route path="test" element={<Test />} />
        <Route path="login" element={<Login />} />
        <Route index element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
