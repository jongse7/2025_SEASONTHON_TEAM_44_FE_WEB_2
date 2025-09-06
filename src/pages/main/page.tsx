import ArrowDropdown from "@/components/svg/ArrowDropdown";
import { FILTER_OPTIONS, FILTER_LABELS } from "@/pages/main/const";
import { useState } from "react";
import Footer from "@/components/Footer";
import type { PostCardProps } from "@/pages/main/components/PostCard";
import MainHeader from "@/pages/main/components/MainHeader";
import PostCard from "@/pages/main/components/PostCard";
import FilterModal from "@/pages/main/components/FilterModal";

export const MainPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<
    keyof typeof FILTER_OPTIONS
  >(FILTER_OPTIONS.NEWEST_REGISTER);

  const posts: PostCardProps[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    imageUrl: `https://picsum.photos/400/300?random=${i + 1}`,
    title: `단골가게 ${i + 1}`,
    date: "2024-01-15",
    visitCount: Math.floor(Math.random() * 10) + 1,
    isNotice: Math.random() > 0.8,
  }));

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSelectFilter = (filter: keyof typeof FILTER_OPTIONS) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full">
      <MainHeader />
      <article className="w-full py-[5px]">
        <img src="/images/main/article.png" alt="article" />
      </article>
      <main className="w-full px-5 py-[5px] flex flex-col items-center">
        <div className="w-full flex flex-row justify-between">
          <div className="w-full flex flex-row gap-[5px] items-center">
            <h2 className="text-sub1 text-black">나의 단골가게</h2>
            <p className="text-sub1 text-primary-500">{"(6)"}</p>
          </div>
          <div className="relative">
            <div
              className="flex w-fit flex-row gap-[5px] items-center cursor-pointer"
              onClick={handleFilterClick}
            >
              <ArrowDropdown
                className={`size-[24px] transition-transform duration-300 ${
                  isFilterOpen ? "rotate-180" : ""
                }`}
              />
              <p className="text-body1 text-gray-600 whitespace-nowrap">
                {FILTER_LABELS[selectedFilter as keyof typeof FILTER_LABELS]}
              </p>
            </div>
            {isFilterOpen && (
              <FilterModal
                onClose={() => setIsFilterOpen(false)}
                onSelectFilter={handleSelectFilter}
              />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col gap-[10px] mt-[5px]">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              imageUrl={post.imageUrl}
              title={post.title}
              date={post.date}
              visitCount={post.visitCount}
              isNotice={post.isNotice}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};
