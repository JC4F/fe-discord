import Login from "page/login/login";
import MainScreen from "page/main/main";
import NotFound from "page/not-found/not-found";
import Register from "page/register/register";
import React from "react";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/invite" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
