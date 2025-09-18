import { postNotiRead } from '@/api/authenticated/noti';
import { postStoreRegister, postStoreVisit } from '@/api/authenticated/store';
import Button from '@/components/Button';
import Space from '@/components/Space';
import Pop from '@/components/svg/Pop';
import X from '@/components/svg/X';
import Toast from '@/components/Toast';
import { useModal } from '@/hooks/useModal';
import { getStampStoreDetailOptions } from '@/query/options/stamp';
import { getStoreRegularOptions } from '@/query/options/store';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CouponStoreModal } from './components/CouponStoreModal';

export function StorePage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const id = Number(storeId);

  const isFromScanner = searchParams.get('from') === 'scanner';
  const isFromRecommend = searchParams.get('from') === 'recommend';

  const { data: isStore } = useSuspenseQuery(getStoreRegularOptions(id));
  const { data } = useSuspenseQuery(getStampStoreDetailOptions(id));

  const storeDetail = data.response;

  const { mutate: postDasion, isIdle } = useMutation({
    mutationFn: () => postStoreRegister(id),
    onSuccess: () => {
      openModal(({ onClose }) => (
        <Toast label="단골 등록 성공" onClose={onClose} />
      ));
      queryClient.invalidateQueries({
        queryKey: ['regular', id],
      });
    },
  });
  const { mutate: postStamp } = useMutation({
    mutationFn: () => postStoreVisit(id),
    onSuccess: () => {
      if (data.response.availableStamp === 0) {
        openModal(({ onClose }) => (
          <CouponStoreModal
            storeName={data.response.storeName}
            onClose={onClose}
          />
        ));
      } else {
        openModal(({ onClose }) => (
          <Toast label="스탬프 적립 완료" onClose={onClose} />
        ));
      }
      queryClient.invalidateQueries({
        queryKey: ['stamp', 'store', 'detail', id],
      });
    },
  });
  const { mutate: notiRead } = useMutation({
    mutationFn: (notiId: number) => postNotiRead(notiId),
    onSuccess: () => {
      openModal(({ onClose }) => (
        <Toast label="공지 읽음 처리 완료" onClose={onClose} />
      ));
      queryClient.invalidateQueries({ queryKey: ['stamp', 'main'] });
      queryClient.invalidateQueries({
        queryKey: ['stamp', 'store', 'detail', id],
      });
    },
  });

  useEffect(() => {
    if (isFromRecommend) {
      return;
    }

    if (isStore.response === false) {
      postDasion();
    } else {
      if (isFromScanner && isIdle) {
        postStamp();
      }
    }
  }, [isStore, postDasion, isFromScanner, postStamp, isIdle, isFromRecommend]);

  const handleBackClick = () => {
    navigate('/main');
  };

  const totalVisits = 10;
  const progressPercentage = (storeDetail.availableStamp / totalVisits) * 100;

  return (
    <div className="w-full h-screen px-5 pb-10 flex flex-col items-center justify-start bg-gray-30">
      <header className="w-full py-[13px] flex items-start">
        <Button onClick={handleBackClick}>
          <Pop />
        </Button>
      </header>
      <Space className="h-[10px]" />
      <div className="flex flex-col w-full gap-[20px] items-center justify-center">
        {storeDetail.storeImageUrl ? (
          <img
            src={storeDetail.storeImageUrl}
            className="w-full h-[190px] rounded-[12px] object-cover"
            alt="store"
          />
        ) : (
          <div className="w-full h-[190px] rounded-[12px] bg-gray-200 flex items-center justify-center">
            <p className="text-white text-body1">
              이미지가 등록되지 않은 가게입니다
            </p>
          </div>
        )}
        <div className="flex flex-col w-full gap-[5px] items-center justify-center">
          <h1 className="text-h3 text-black">{storeDetail.storeName}</h1>
          <p className="text-body2 text-gray-800">{storeDetail.introduction}</p>
        </div>
        <div className="flex flex-col gap-[5px] p-[15px] items-center bg-primary-50 rounded-[20px]">
          <p className="text-body1 text-left w-full text-gray-600">
            단골 그래프
          </p>
          <div className="w-full">
            <div className="w-full h-[15px] bg-gray-100 rounded-[12px] overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-[12px] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <div className="flex text-gray-500 flex-row max-w-full w-[331px] justify-between">
            <p className="text-body3">
              특급 단골 쿠폰까지 {10 - storeDetail.availableStamp}번 남았어요!
            </p>
            <p className="text-body4">{`${storeDetail.availableStamp} / 10`}</p>
          </div>
        </div>
        {/* <Button
          className="w-full text-button1 text-white py-[17px] bg-primary-500 rounded-[12px]"
          onClick={() => postStamp()}
        >
          스탬프 찍기
        </Button> */}
        {storeDetail.latestNoti && (
          <div className="flex flex-col w-full gap-[15px] items-center justify-center">
            <div className="border-2 w-full border-primary-200 flex flex-col gap-5 rounded-[20px] p-[20px]">
              <div className="flex flex-row justify-start gap-[15px] items-center">
                <div className="rounded-[12px] bg-primary-700 whitespace-nowrap text-white text-body3 p-[10px] justify-items-center flex">
                  새로운공지
                </div>
                <p className="text-sub1 text-black">
                  {storeDetail.latestNoti.title}
                </p>
              </div>
              <p className="text-body2 text-gray-800 text-left line-clamp-4 overflow-hidden">
                {storeDetail.latestNoti.content}
              </p>
              <Button
                className="w-full text-body3 text-white py-[13.5px] bg-gray-800 rounded-[12px]"
                onClick={() => notiRead(storeDetail.latestNoti!.id)}
              >
                확인했어요
              </Button>
            </div>
          </div>
        )}
        <div className="flex flex-col w-full gap-[15px] p-[20px] bg-gray-50 rounded-[12px]">
          <div className="flex flex-row justify-start gap-[34px] items-center">
            <p className="text-body1 text-gray-500">연락처</p>
            <p className="text-body2 text-black">{storeDetail.phone}</p>
          </div>
          <div className="flex flex-row justify-start gap-[20px] items-center">
            <p className="text-body1 text-gray-500">운영시간</p>
            <p className="text-body2 text-black">
              {storeDetail.open}-{storeDetail.close}
            </p>
          </div>
          <div className="flex flex-row justify-start gap-[47px] items-start">
            <p className="text-body1 text-gray-500 whitespace-nowrap">주소</p>
            <div className="flex flex-col items-end">
              <p className="text-body2 text-black line-clamp-2 text-left">
                {storeDetail.address} {storeDetail.detailAddress}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[5px] w-full pb-5">
          <p className="text-body1 text-black w-full text-left">포토 메뉴판</p>
          {storeDetail.menuImageUrls && storeDetail.menuImageUrls.length > 0 ? (
            <div className="flex gap-[10px] overflow-x-auto scrollbar-hide">
              {storeDetail.menuImageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="menu"
                  className="h-[190px] w-auto rounded-[8px] object-cover flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    openModal(({ onClose }) => (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
                        <div className="relative w-full h-full flex items-center justify-center p-4">
                          <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10"
                          >
                            <X className="text-white" />
                          </button>
                          <img
                            src={url}
                            alt="menu"
                            className="max-w-full max-h-full object-contain rounded-[8px]"
                          />
                        </div>
                      </div>
                    ))
                  }
                />
              ))}
            </div>
          ) : (
            <div className="w-full h-auto bg-gray-200 rounded-[8px] flex items-center justify-center py-[80px]">
              <p className="text-white text-body1">
                메뉴판이 등록되지 않은 가게입니다
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
