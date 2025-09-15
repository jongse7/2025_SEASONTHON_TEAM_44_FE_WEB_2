import ArrowDropdown from '@/components/svg/ArrowDropdown';
import { FILTER_OPTIONS, FILTER_LABELS } from '@/pages/main/const';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Footer from '@/components/Footer';
import MainHeader from '@/pages/main/components/MainHeader';
import PostCard from '@/pages/main/components/PostCard';
import FilterModal from '@/pages/main/components/FilterModal';
import { useSuspenseQuery } from '@tanstack/react-query';
import { cn } from '@/utils/cn';
import { SortOption } from '@/schema/api/stamp';
import { getStampMainOptions } from '@/query/options/stamp';

const FILTER_TO_SORT_MAP: Record<string, SortOption> = {
  [FILTER_OPTIONS.STAMP_SOON]: SortOption.STAMP,
  [FILTER_OPTIONS.RECENT_VISIT]: SortOption.LAST_VISIT,
  [FILTER_OPTIONS.NEWEST_REGISTER]: SortOption.NEWEST,
  [FILTER_OPTIONS.OLDEST_REGISTER]: SortOption.OLDEST,
};

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const selectedFilter =
    (searchParams.get(
      'filter',
    ) as (typeof FILTER_OPTIONS)[keyof typeof FILTER_OPTIONS]) ||
    FILTER_OPTIONS.NEWEST_REGISTER;

  const searchQuery = searchParams.get('search') || '';
  const sortOption = FILTER_TO_SORT_MAP[selectedFilter] || SortOption.NEWEST;

  const { data: mainData } = useSuspenseQuery(
    getStampMainOptions(searchQuery || undefined, sortOption),
  );
  const posts = mainData.response.storeList;

  const handleSelectFilter = (filter: keyof typeof FILTER_OPTIONS) => {
    setSearchParams({ filter });
    setIsFilterOpen(false);
  };

  return (
    <div className="w-full min-h-screen">
      <MainHeader />
      <article className="w-full py-[5px]">
        <img src="/images/main/article.png" alt="article" />
      </article>
      <main className="w-full px-5 py-[5px] flex flex-col items-center">
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
                  isFilterOpen ? 'rotate-180' : ''
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
        <div
          className={cn(
            'w-full flex flex-col gap-[10px] mt-[5px]',
            posts.length === 0 && 'h-[500px] flex items-center justify-center',
          )}
        >
          {posts.length === 0 ? (
            <p className="text-body1 w-full text-center text-gray-400">
              동네 가게를 방문하세요
            </p>
          ) : (
            posts.map((post, index) => (
              <PostCard key={`${post.storeId}-${index}`} post={post} />
            ))
          )}
        </div>
      </main>
      <div className="h-[120px]" />
      <Footer />
    </div>
  );
};
