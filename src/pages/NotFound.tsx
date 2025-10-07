import React from "react";
import { MainLayout } from "../components/layout/MainLayout";

const NotFound: React.FC = () => {
  return (
    <MainLayout>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-4 text-gray-600">Page not found</p>
      </div>
    </MainLayout>
  );
};

export default NotFound;
