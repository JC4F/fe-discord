import Invite from "page/invite";
import Login from "page/login";
import MainScreen from "page/main";
import NotFound from "page/not-found";
import Register from "page/register";
import React from "react";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
