import ArrowDropdown from "@/components/svg/ArrowDropdown";
import { FILTER_OPTIONS, FILTER_LABELS } from "@/pages/main/const";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import MainHeader from "@/pages/main/components/MainHeader";
import PostCard from "@/pages/main/components/PostCard";
import FilterModal from "@/pages/main/components/FilterModal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getRegularMainOptions } from "@/query/options/regular";

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: mainData } = useSuspenseQuery(getRegularMainOptions());
  const allPosts = mainData.response.storeList;

  const selectedFilter =
    (searchParams.get(
      "filter"
    ) as (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS]) ||
    FILTER_OPTIONS.NEWEST_REGISTER;

  const searchQuery = searchParams.get("search") || "";

  const filteredPosts = allPosts.filter((post) =>
    post.storeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const posts = [...filteredPosts].sort((a, b) => {
    switch (selectedFilter) {
      case "stamp_soon":
        return a.availableStamp - b.availableStamp;
      case "recent_visit":
        return (
          new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
        );
      case "newest_register":
        return b.storeId - a.storeId;
      case "oldest_register":
        return a.storeId - b.storeId;
      default:
        return 0;
    }
  });

  const handleSelectFilter = (filter: keyof typeof FILTER_OPTIONS) => {
    setSearchParams({ filter });
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full">
      <MainHeader />
      <article className="w-full py-[5px]">
        <img src="/images/main/article.png" alt="article" />
      </article>
      <main className="w-full px-5 py-[5px] h-full flex flex-col items-center">
        <div className="w-full flex flex-row justify-between">
          <div className="w-full flex flex-row gap-[5px] items-center">
            <h2 className="text-sub1 text-black">나의 단골가게</h2>
            <p className="text-sub1 text-primary-500">{`(${posts.length})`}</p>
          </div>
          <div className="relative">
            <div
              className="flex w-fit flex-row gap-[5px] items-center cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
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
        {posts.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-body1 text-gray-400">
              최근 방문한 가게가 없습니다.
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col gap-[10px] mt-[5px]">
            {posts.map((post) => (
              <PostCard key={post.storeId} post={post} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
