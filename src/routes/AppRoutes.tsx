import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { PrivateRoute } from "./PrivateRoute";
import { ChatPage } from "../pages/Chat";
import { MainLayout } from "@/components/layout/MainLayout/MainLayout";
import Courses from "@/pages/Courses";
import { ToeicTest } from "@/pages/ToeicTest/ToeicTest";
import { LessonDetailPage } from "@/pages/VocabDetail/VocabDetailPage";
import { VocabPage } from "@/pages/Vocab/VocabPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/chat" element={<ChatPage />} />
      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses />
          </MainLayout>
        }
      />
      <Route path="/toeic-test" element={<ToeicTest />} />
      <Route path="/vocab" element={<MainLayout><VocabPage /></MainLayout>} />
      <Route path="/vocab/lesson/:id" element={<MainLayout><LessonDetailPage /></MainLayout>} />
      <Route
        path="/#"
        element={
          <PrivateRoute>
            <div>Cart page (protected)</div>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
