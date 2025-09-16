import Button from '@/components/Button';
import X from '@/components/svg/X';
import { useQueryClient } from '@tanstack/react-query';

interface CouponUsedModalProps {
  onClose: () => void;
}

export function CouponUsedModal({ onClose }: CouponUsedModalProps) {
  const queryClient = useQueryClient();
  const handleClose = () => {
    onClose();
    queryClient.invalidateQueries({ queryKey: ['stamp', 'mypage'] });
    queryClient.invalidateQueries({ queryKey: ['stamp', 'coupons'] });
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
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
            <h2 className="text-center text-black text-h3">
              쿠폰이 사용되었어요!
            </h2>
          </div>
          <img
            src="/images/user/coupon.png"
            alt="user-x"
            className="w-[180px] h-[180px]"
          />
          <Button
            onClick={handleClose}
            className="w-full py-[17px] text-button1 bg-primary-500 text-white rounded-[12px]"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
