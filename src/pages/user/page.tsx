import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Space from "@/components/Space";
import Pop from "@/components/svg/Pop";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gray-30">
      <header className="w-full py-[11px] flex items-center justify-center">
        <h1 className="text-sub1 text-black">마이온</h1>
      </header>
      <main className="w-full p-[20px]">
        <div className="w-full px-5 py-6 flex flex-row items-start justify-between rounded-[12px] bg-white">
          <div className="flex w-full justify-between items-start">
            <div className="flex gap-[10px] items-center">
              <img
                src="/images/user.png"
                className="size-[50px] rounded-full"
              ></img>
              <div className="flex-1">
                <h2 className="text-sub2 text-black">다시온님</h2>
                <p className="text-body2 text-gray-600">분당구 판교동</p>
              </div>
            </div>
            <button className="px-2.5 py-[6px] bg-gray-50 items-center justify-center flex rounded-[12px]">
              <span className="text-button2 text-gray-600">프로필 수정</span>
            </button>
          </div>
        </div>
      </main>
      <Space className="h-6" />
      <div className="w-full px-5">
        <div className="flex gap-4">
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/store.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1">단골 가게</p>
            <p className="text-sub1 text-primary-500">6</p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/stamp.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1">스탬프 적립</p>
            <p className="text-sub1 text-primary-500">23</p>
          </div>
          <div className="flex-1 bg-white rounded-xl p-4 flex flex-col items-center">
            <img src="/images/user/sales.png" className="size-[50px]" />
            <p className="text-body1 text-black mb-1">보유 쿠폰</p>
            <p className="text-sub1 text-primary-500">2</p>
          </div>
        </div>
        <Space className="h-[10px]" />
        <div
          onClick={() => {
            navigate("/user/coupon");
          }}
          className="bg-white p-5 rounded-xl flex items-center justify-between"
        >
          <h3 className="text-body1 text-black">내 쿠폰함</h3>
          <Pop className="rotate-180" />
        </div>
        <h3 className="text-sub1 text-black my-[10px]">최근 방문</h3>
        <div className="bg-white rounded-xl py-[15px] px-[10px]">
          <div className="flex items-center gap-4">
            <img
              src="https://picsum.photos/400/300"
              className="w-[100px] h-[65px] object-cover rounded-[12px]"
            />
            <div className="flex-1 gap-[2px] flex flex-col">
              <h4 className="text-sub2 text-black">다시온 베이커리</h4>
              <p className="text-body4 text-gray-500">어제 방문</p>
              <p className="text-body3 text-primary-400">
                7개만 더 모으면 쿠폰 발급!
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full text-gray-400 text-body3 bottom-[90px] fixed flex-col">
          <Button className="p-5 w-full flex item-start">로그아웃</Button>
          <div className="h-[1px] bg-gray-50" />
          <Button className="p-5 w-full flex item-start">회원탈퇴</Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
