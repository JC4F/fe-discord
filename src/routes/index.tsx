import Invite from "page/invite";
import Login from "page/login";
import MainScreen from "page/main";
import NotFound from "page/not-found";
import Register from "page/register";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { ProtectedLeaveRoute } from "./protected-leave-route";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute component={<MainScreen />} />} />
      <Route
        path="/register"
        element={<ProtectedLeaveRoute component={<Register />} />}
      />
      <Route
        path="/login"
        element={<ProtectedLeaveRoute component={<Login />} />}
      />
      <Route path="/invite" element={<Invite />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
