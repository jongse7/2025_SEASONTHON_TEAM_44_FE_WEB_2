import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Space from '@/components/Space';
import Pop from '@/components/svg/Pop';
import StoreCard from '@/pages/user/components/StoreCard';
import { getStampMypageOptions } from '@/query/options/stamp';
import { getUserMeSimpleOptions } from '@/query/options/user';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteUsersMe } from '@/api/authenticated/user';
import Location from '@/components/svg/Location';

export function UserPage() {
  const navigate = useNavigate();
  const { data: mypageData } = useSuspenseQuery(getStampMypageOptions());
  const { data: userData } = useSuspenseQuery(getUserMeSimpleOptions());
  const { mutate: deleteUser } = useMutation({
    mutationFn: () => deleteUsersMe(),
    onSuccess: () => {
      localStorage.clear();
      navigate('/');
    },
  });
  return (
    <div className="w-full min-h-screen bg-gray-30">
      <header className="w-full py-[11px] flex items-center justify-center">
        <h1 className="text-sub1 text-black">마이온</h1>
      </header>
      <main className="w-full p-[20px]">
        <div className="w-full px-5 py-6 flex flex-row items-start justify-between rounded-[12px] bg-white">
          <div className="flex w-full justify-between items-start">
            <div className="flex gap-[10px] items-center">
              <div className="size-[50px] rounded-full bg-gray-30">
                <img
                  src="/images/user.png"
                  className="size-[50px] rounded-full"
                ></img>
              </div>
              <div className="flex-1 gap-[5px] flex flex-col">
                <h2 className="text-sub2 text-black">
                  {userData.response.name}님
                </h2>
                <div className="text-body2 text-gray-600 w-full flex items-center gap-[1px]">
                  <Location className="size-[19px] text-gray-600" />
                  {userData.response.region}
                </div>
              </div>
            </div>
            {/* <button className="px-2.5 py-[6px] bg-gray-50 items-center justify-center flex rounded-[12px]">
              <span className="text-button2 text-gray-600">프로필 수정</span>
            </button> */}
          </div>
        </div>
      </main>
      <div className="w-full px-5">
        <div className="flex gap-4">
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/store.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1">단골 가게</p>
            <p className="text-sub1 text-primary-500">
              {mypageData.response.storeCount}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/stamp.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1 whitespace-nowrap">
              스탬프 적립
            </p>
            <p className="text-sub1 text-primary-500">
              {mypageData.response.totalStamp}
            </p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/sales.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1">보유 쿠폰</p>
            <p className="text-sub1 text-primary-500">
              {mypageData.response.couponCount}
            </p>
          </div>
        </div>
        <Space className="h-[10px]" />
        <div
          onClick={() => {
            navigate('/user/coupon');
          }}
          className="bg-white p-5 rounded-xl cursor-pointer flex items-center justify-between"
        >
          <h3 className="text-body1 text-black">내 쿠폰함</h3>
          <Pop className="rotate-180" />
        </div>
        <h3 className="text-sub1 text-black my-[10px]">최근 방문</h3>
        {!mypageData.response.recentStores ||
        mypageData.response.recentStores.length === 0 ? (
          <div className="w-full h-[100px] flex items-center justify-center">
            <p className="text-body1 text-gray-400">
              최근 방문한 가게가 없습니다.
            </p>
          </div>
        ) : (
          mypageData.response.recentStores.map((store) => (
            <StoreCard key={store!.storeId} store={store} />
          ))
        )}
        <div className="flex w-full text-gray-400 text-body3 flex-col">
          <Button
            className="p-5 w-full flex item-start"
            onClick={() => {
              localStorage.removeItem('accessToken');
              navigate('/');
            }}
          >
            로그아웃
          </Button>
          <div className="h-[1px] bg-gray-50" />
          <Button
            className="p-5 w-full flex item-start"
            onClick={() => deleteUser()}
          >
            회원탈퇴
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
