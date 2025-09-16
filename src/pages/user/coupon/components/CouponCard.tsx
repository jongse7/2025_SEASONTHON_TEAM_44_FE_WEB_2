import { useModal } from '@/hooks/useModal';
import { CouponModal } from '@/pages/user/coupon/components/CouponModal';
import type { GetStampCouponsResponseSchema } from '@/schema/api/stamp';
import { cn } from '@/utils/cn';

type CouponData = GetStampCouponsResponseSchema['response'][0];

interface CouponCardProps {
  coupon: CouponData;
  isCoupon: boolean;
}

export default function CouponCard({ coupon, isCoupon }: CouponCardProps) {
  const { openModal } = useModal();
  const progressPercentage = (coupon.availableStamp / 10) * 100;
  return (
    <div className="px-[10px] py-[15px] rounded-[12px] items-center border-2 justify-between border-gray-50 bg-white flex flex-row gap-[26px] w-full">
      <div className="flex flex-row gap-[10px]">
        <img
          src={coupon.storeImage}
          alt={coupon.storeName}
          className="w-[100px] h-[65px] object-cover rounded-[12px]"
        />
        <div
          className={cn(
            'flex-1 flex flex-col justify-center gap-[5px]',
            isCoupon && 'py-[9.5px]',
          )}
        >
          <h4 className="text-sub2 text-black">{coupon.storeName}</h4>
          {!isCoupon && (
            <div className="w-[135px] h-[5px] bg-gray-200 rounded-[12px] overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-[12px] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          )}
          <p className="text-body3 text-primary-400">
            {isCoupon
              ? `10회 인증 쿠폰`
              : `쿠폰까지 ${10 - coupon.availableStamp}개 남았어요`}
          </p>
        </div>
      </div>
      {isCoupon && (
        <button
          className="px-2.5 py-[5px] cursor-pointer bg-primary-500 h-fit w-fit text-white items-center justify-center flex rounded-[6px]"
          onClick={() =>
            openModal(({ onClose }) => (
              <CouponModal
                onClose={onClose}
                storeName={coupon.storeName}
                stampId={coupon.stampId}
              />
            ))
          }
        >
          <p className="text-button2">사용하기</p>
        </button>
      )}
    </div>
  );
}
