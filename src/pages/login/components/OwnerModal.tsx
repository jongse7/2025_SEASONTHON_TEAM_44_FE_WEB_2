import Button from "@/components/Button";
import Space from "@/components/Space";
import X from "@/components/svg/X";
import Toast from "@/components/Toast";
import { useModal } from "@/hooks/useModal";

interface OwnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OwnerModal({ isOpen, onClose }: OwnerModalProps) {
  const { openModal } = useModal();

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="w-full py-[26.5px] mx-[21px] px-[12px] bg-white rounded-[12px]">
        <div className="w-full flex justify-end">
          <button
            onClick={onClose}
            className="top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          >
            <X />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full px-2">
          <h2 className="text-center text-black text-sub1">
            사장님 로그인은 <br /> 웹에서 이용해주세요
          </h2>
          <Space className="h-[10px]" />
          <div className="border-1 border-gray-100 bg-gray-30 rounded-[6px]">
            <div className="flex items-center">
              <p className="py-[5px] w-[187px] border-r-1 border-gray-100 whitespace-nowrap overflow-hidden text-ellipsis px-2.5 text-body4 text-gray-500">
                http://localhost:5173/owner
              </p>
              <Button
                className="p-[5px] text-body3 text-gray-500"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      "http://localhost:5173/owner"
                    );
                    openModal(({ onClose }) => (
                      <Toast
                        label="클립보드에 복사되었습니다"
                        onClose={onClose}
                      />
                    ));
                  } catch (error) {
                    console.error("복사 실패:", error);
                  }
                }}
              >
                복사
              </Button>
            </div>
          </div>
          <Space className="h-[30px]" />
          <img
            src="/images/user-x.png"
            alt="user-x"
            className="w-[119px] h-[168px]"
          />
          <Button
            onClick={onClose}
            className="w-full py-[17px] text-button1 bg-primary-500 text-white rounded-[12px]"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
