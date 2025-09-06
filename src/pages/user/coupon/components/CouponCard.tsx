import type { GetRegularCouponResponse } from "@/schema/api/regular";

interface CouponCardProps {
  coupon: GetRegularCouponResponse;
}

export default function CouponCard({ coupon }: CouponCardProps) {
  return (
    <div className="px-[10px] py-[15px] rounded-[12px] border-2 border-gary-50 flex flex-row gap-[26px] w-full">
      <div className="flex flex-row gap-[10px]">
        <img
          src={coupon.storeImage}
          alt={coupon.storeName}
          className="w-[100px] h-[65px] object-cover rounded-[12px]"
        />
        <div className="flex-1 flex flex-col py-[9.5px] gap-[5px]">
          <h4 className="text-sub2 text-black">{coupon.storeName}</h4>
          <p className="text-body3 text-primary-400">
            쿠폰까지 {coupon.availableStamp}개 남았어요
          </p>
        </div>
      </div>
      {coupon.availableStamp === 0 && (
        <button className="px-2.5 py-[5px] bg-primary-500 text-white items-center justify-center flex rounded-[12px]">
          <p>사용하기</p>
        </button>
      )}
    </div>
  );
}
