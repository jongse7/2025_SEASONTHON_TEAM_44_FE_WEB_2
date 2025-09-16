import LogoText from '@/components/svg/LogoText';
import SearchBar from '@/components/SearchBar';
import { cn } from '@/utils/cn';
import { gradients } from '@/style/gradient';

export default function MainHeader() {
  return (
    <header
      className={cn('px-5 w-full flex flex-col items-start', gradients.primary)}
    >
      <LogoText className="mt-2" />
      <div className="w-full py-[10px]">
        <SearchBar />
      </div>
    </header>
  );
}
