import { postStampCouponUse } from '@/api/authenticated/stamp';
import Button from '@/components/Button';
import X from '@/components/svg/X';
import { useModal } from '@/hooks/useModal';
import { CouponUsedModal } from '@/pages/user/coupon/components/CouponUsedModal';
import { cn } from '@/utils/cn';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface CouponModalProps {
  onClose: () => void;
  storeName: string;
  stampId: number;
}

export function CouponModal({ onClose, storeName, stampId }: CouponModalProps) {
  const { openModal } = useModal();
  const [isUsed, setIsUsed] = useState(false);
  const { mutate: postCouponUse } = useMutation({
    mutationFn: () => postStampCouponUse(stampId),
    onSuccess: () => {
      openModal(({ onClose }) => <CouponUsedModal onClose={onClose} />);
      setIsUsed(true);
    },
  });
  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/20',
        isUsed && 'hidden',
      )}
    >
      <div className="w-full py-[20px] mx-[21px] px-[12px] bg-white rounded-[12px]">
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
          </div>
          <img
            src="/images/user/coupon.png"
            alt="user-x"
            className="w-[180px] h-[180px]"
          />
          <div className="flex flex-col items-center justify-center w-full gap-[5px]">
            <p className="text-primary-700 text-body3">
              사장님께서 직접 사용하기 버튼을 눌러주세요
            </p>
            <Button
              onClick={() => postCouponUse()}
              className="w-full py-[17px] text-button1 bg-primary-500 text-white rounded-[12px]"
            >
              쿠폰 사용하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
