import { postStampCouponUse } from '@/api/authenticated/stamp';
import Button from '@/components/Button';
import X from '@/components/svg/X';
import { useModal } from '@/hooks/useModal';
import { CouponUsedModal } from '@/pages/user/coupon/components/CouponUsedModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
  stampId: number;
}

export function CouponModal({
  isOpen,
  onClose,
  storeName,
  stampId,
}: CouponModalProps) {
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const { mutate: postCouponUse } = useMutation({
    mutationFn: () => postStampCouponUse(stampId),
    onSuccess: () => {
      openModal(({ isOpen, onClose }) => (
        <CouponUsedModal isOpen={isOpen} onClose={onClose} />
      ));
      queryClient.invalidateQueries({ queryKey: ['stamp', 'mypage'] });
      queryClient.invalidateQueries({ queryKey: ['stamp', 'coupons'] });
      onClose();
    },
  });
  if (!isOpen) return null;
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
            <p className="text-body3 text-gray-800">{storeName}</p>
            <h2 className="text-center text-black text-h3">10회 인증 쿠폰 </h2>
            <p className="text-body3 text-primary-700">
              사장님께서 직접 사용하기 버튼을 눌러주세요
            </p>
          </div>
          <img
            src="/images/user/coupon.png"
            alt="user-x"
            className="w-[180px] h-[180px]"
          />
          <Button
            onClick={() => postCouponUse()}
            className="w-full py-[17px] text-button1 bg-primary-500 text-white rounded-[12px]"
          >
            쿠폰 사용하기
          </Button>
        </div>
      </div>
    </div>
  );
}
