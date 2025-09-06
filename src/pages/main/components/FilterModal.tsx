import { FILTER_LABELS, FILTER_OPTIONS } from '../const';
import { cn } from '@/utils/cn';
import { shadows } from '@/style/shadow';

interface FilterModalProps {
  onClose: () => void;
  onSelectFilter: (filter: keyof typeof FILTER_OPTIONS) => void;
}

export default function FilterModal({
  onClose,
  onSelectFilter,
}: FilterModalProps) {
  const handleFilterSelect = (filter: keyof typeof FILTER_OPTIONS) => {
    onSelectFilter(filter);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute top-full left-0 right-0 z-50 mt-1">
        <div
          className={cn('bg-gray-50 rounded-[12px]', shadows.custom)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center">
            {Object.entries(FILTER_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() =>
                  handleFilterSelect(key as keyof typeof FILTER_OPTIONS)
                }
                className="text-center whitespace-nowrap text-gray-600 text-body3 py-3 hover:bg-gray-100 rounded-[8px] px-[17.5px]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
