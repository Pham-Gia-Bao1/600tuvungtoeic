import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { ChatPage } from "../pages/Chat";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import Courses from "@/pages/Courses";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/courses" element={<MainLayout><Courses /></MainLayout>} />
      <Route path="/#" element={
        <PrivateRoute>
          <div>Cart page (protected)</div>
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
