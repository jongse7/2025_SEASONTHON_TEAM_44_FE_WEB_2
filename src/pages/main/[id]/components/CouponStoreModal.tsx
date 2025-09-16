import X from '@/components/svg/X';

interface CouponStoreModalProps {
  onClose: () => void;
  storeName: string;
}

export function CouponStoreModal({
  onClose,
  storeName,
}: CouponStoreModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full py-[20px] mx-[21px] px-[12px] flex flex-col items-center justify-center bg-white rounded-[12px]">
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full px-2">
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <p className="text-body3 text-gray-600">{storeName}</p>
            <p className="text-body3 text-black">10번째 방문 고객 감사 쿠폰</p>
            <h2 className="text-center text-black text-h3">5,000원 할인</h2>
            <p className="text-body3 text-gray-500">
              {'쿠폰 확인은 [내 정보 -> 내 쿠폰함]'}
            </p>
          </div>
        </div>
        <img
          src="/images/user/coupon.png"
          alt="coupon"
          className="size-[205px]"
        />
      </div>
    </div>
  );
}
