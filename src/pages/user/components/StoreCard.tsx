import type { GetStampMypageResponseSchema } from '@/schema/api/stamp';

interface StoreCardProps {
  store: GetStampMypageResponseSchema['response']['recentStores'][0];
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="bg-white rounded-xl py-[15px] px-[10px]">
      <div className="flex items-center gap-4">
        <img
          src={store!.storeImage}
          className="w-[100px] h-[65px] object-cover rounded-[12px]"
        />
        <div className="flex-1 gap-[2px] flex flex-col">
          <h4 className="text-sub2 text-black">{store!.storeName}</h4>
          <p className="text-body4 text-gray-500">{'오늘 방문'}</p>
          <p className="text-body3 text-primary-400">
            {10 - store!.availableStamp}개만 더 모으면 쿠폰 발급!
          </p>
        </div>
      </div>
    </div>
  );
}
