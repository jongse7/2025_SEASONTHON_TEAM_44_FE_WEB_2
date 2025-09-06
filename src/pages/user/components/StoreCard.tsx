import type { GetRegularMainStore } from "@/schema/api/regular";

interface StoreCardProps {
  store: GetRegularMainStore;
}

export default function StoreCard({ store }: StoreCardProps) {
  const getVisitDateText = (lastVisit: string) => {
    const today = new Date();
    const visitDate = new Date(lastVisit);
    const diffTime = today.getTime() - visitDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "오늘 방문";
    } else if (diffDays === 1) {
      return "어제 방문";
    } else {
      return `${diffDays}일 전 방문`;
    }
  };

  return (
    <div className="bg-white rounded-xl py-[15px] px-[10px]">
      <div className="flex items-center gap-4">
        <img
          src="https://picsum.photos/400/300"
          className="w-[100px] h-[65px] object-cover rounded-[12px]"
        />
        <div className="flex-1 gap-[2px] flex flex-col">
          <h4 className="text-sub2 text-black">{store.storeName}</h4>
          <p className="text-body4 text-gray-500">
            {getVisitDateText(store.lastVisit)}
          </p>
          <p className="text-body3 text-primary-400">
            {10 - store.availableStamp}개만 더 모으면 쿠폰 발급!
          </p>
        </div>
      </div>
    </div>
  );
}
