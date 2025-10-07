import React from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Card } from "../../components/ui/Card";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center drop-shadow-lg animate-pulse mb-10">
          🎉 Welcome to MyApp 🎉
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card title="Getting Started">
            <p className="text-lg text-gray-700">
              This is a colorful demo built with <span className="font-semibold text-indigo-600">Vite</span> + <span className="font-semibold text-pink-600">React</span> + <span className="font-semibold text-yellow-500">TailwindCSS</span>.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-block px-4 py-2 rounded-xl text-white font-medium bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 hover:from-blue-500 hover:to-green-400 transition-transform duration-300 shadow-lg"
            >
              🚀 View Products
            </Link>
          </Card>

          <Card title="Fun Effects">
            <div className="flex flex-col gap-4">
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-bold shadow-md hover:scale-105 transition-transform">
                🌟 Gradient Button
              </button>
              <div className="p-6 rounded-xl bg-white/20 backdrop-blur-lg text-white shadow-lg">
                Tailwind makes styling <span className="underline">super fun</span> ✨
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
