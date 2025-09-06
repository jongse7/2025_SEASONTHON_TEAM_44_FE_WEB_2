import { useState } from 'react';
import Search from '@/components/svg/Search';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState<string>('');

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="찾으시는 단골 가게가 있나요?"
        className="w-full px-5 py-3 pr-12 bg-gray-30 border-none rounded-[12px] text-body2 placeholder:text-gray-200 focus:outline-none"
      />
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
        <Search className="size-[25px] text-gray-500" />
      </div>
    </div>
  );
}
