import React from "react";
import Invite from "page/invite";
import Login from "page/login";
import MainScreen from "page/chanels";
import NotFound from "page/not-found";
import Register from "page/register";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./protected-route";
import { ProtectedLeaveRoute } from "./protected-leave-route";
import { SocialAuthCallback } from "page/authen-redirect";
import Me from "page/chanels/me";
import Store from "page/chanels/me/store";
import RoomChat from "page/chanels/me/room-chat";
import Chanel from "page/chanels/chanel";
import SubChanel from "page/chanels/chanel/sub-chanel";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chanels/@me" />} />
      <Route
        path="/register"
        element={<ProtectedLeaveRoute component={<Register />} />}
      />
      <Route
        path="/login"
        element={<ProtectedLeaveRoute component={<Login />} />}
      />
      <Route path="/invite" element={<Invite />} />
      <Route path="/authentication/redirect" element={<SocialAuthCallback />} />
      <Route
        path="/chanels"
        element={<ProtectedRoute component={<MainScreen />} />}
      >
        <Route path="@me" element={<Me />}>
          <Route path="store" element={<Store />} />
          <Route path=":roomChatId" element={<RoomChat />} />
        </Route>
        <Route path=":chanelId" element={<Chanel />}>
          <Route path=":subChanelId" element={<SubChanel />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
