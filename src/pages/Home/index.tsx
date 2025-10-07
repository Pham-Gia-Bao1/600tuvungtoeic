import React from "react";
import { Button } from "@/components/common/Button/Button";
import { Icon } from "@/components/common/Icon/Icon";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Cộng đồng Mastery",
    description: "Cùng học hỏi và chia sẻ kiến thức cùng như tài nguyên miễn phí.",
    icon: "users",
  },
  {
    id: 2,
    title: "Online Test",
    description: "Thi thử IELTS Online Test với trải nghiệm thi thật và kho đề khủng kèm giải thích chi tiết.",
    icon: "book-open",
  },
  {
    id: 3,
    title: "Listening Test",
    description: "Kho đề luyện tập TOEIC Listening với phân loại theo dạng câu hỏi.",
    icon: "headphones",
  },
  {
    id: 4,
    title: "Reading Test",
    description: "Kho đề luyện tập TOEIC Reading với phân loại theo dạng câu hỏi.",
    icon: "book-open",
  },
  {
    id: 5,
    title: "Tin tức tiếng Anh",
    description: "Cập nhật liên tục mỗi ngày các tin tức tiếng Anh mới nhất.",
    icon: "newspaper",
  },
  {
    id: 6,
    title: "Chứng chỉ & Thành tích",
    description: "Theo dõi quá trình học tập, đạt chứng chỉ và thành tích nổi bật.",
    icon: "award",
  },
];


const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-sky-50 bg-[url('/images/cover-on-luyen-1-scaled.jpg')] bg-cover bg-center">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between px-6 py-16 gap-10">
          {/* Text content */}
          <div className="w-full lg:max-w-[60%]">
            <h1 className="text-3xl md:text-4xl font-bold leading-snug text-white">
              Nền tảng tự học{" "}
              <span className="text-sky-500">Tiếng Anh</span> Online <br /> top 1
              Việt Nam
            </h1>
            <p className="mt-4 text-gray-200 text-base">
              Website tự học TOEIC toeicmastery.vn cung cấp đầy đủ nội dung chất
              lượng gồm TOEIC Online Test và phần luyện tập TOEIC 2 kỹ năng
              Reading và Listening giúp cho người học chuẩn bị tốt nhất cho kỳ
              thi chính thức.
            </p>
            <Button variant="primary" size="sm" className="mt-6 rounded-md bg-sky-500 px-6 py-2 text-white hover:bg-sky-600 transition">
              Bắt đầu học ngay
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-600 mb-10">
          Tự học tiếng Anh của Mastery có gì?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="flex gap-4 p-5 rounded border border-gray-100">
              <div className="p-3 bg-sky-50 rounded-lg flex justify-center items-center">
                <Icon className="text-sky-600" size={28} name={feature.icon} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
