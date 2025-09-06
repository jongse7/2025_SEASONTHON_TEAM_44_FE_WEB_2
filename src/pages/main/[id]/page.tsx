import Button from "@/components/Button";
import Space from "@/components/Space";
import Pop from "@/components/svg/Pop";
import { useNavigate, useParams } from "react-router-dom";

export function StorePage() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  console.log(storeId);

  const currentVisits = 7;
  const totalVisits = 10;
  const progressPercentage = (currentVisits / totalVisits) * 100;

  const handleBackClick = () => {
    navigate("/main");
  };
  return (
    <div className="w-full h-screen px-5 flex flex-col items-center= justify-start bg-gray-30">
      <header className="w-full py-[13px] flex items-start">
        <Button onClick={handleBackClick}>
          <Pop />
        </Button>
      </header>
      <Space className="h-[10px]" />
      <div className="flex flex-col w-full gap-[20px] items-center justify-center">
        <img
          src="https://picsum.photos/400/300?random=${storeId} object-cover"
          className="w-full h-[190px] rounded-[12px]"
          alt="store"
        />
        <div className="flex flex-col w-full gap-[5px] items-center justify-center">
          <h1 className="text-h3 text-black">다시온 분식</h1>
          <p className="text-body2 text-gray-800">
            저희집 해물라면이 정말 일품입니다
          </p>
        </div>
        <div className="flex flex-col gap-[5px] p-[15px] items-center bg-primary-50 rouned-[20px]">
          <p className="text-body1 text-left w-full text-primary-700">
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
          <div className="flex text-primary-400 flex-row max-w-full w-[331px] justify-between">
            <p className="text-body3">
              특급 단골 쿠폰까지 {totalVisits - currentVisits}번 남았어요!
            </p>
            <p className="text-body4">
              {currentVisits}/{totalVisits}
            </p>
          </div>
        </div>
        <Button className="w-full text-button1 text-white py-[17px] bg-primary-500 rounded-[12px]">
          스탬프 찍기
        </Button>
        <div className="flex flex-col w-full gap-[15px] items-center justify-center">
          <div className="border-2 border-primary-200 flex flex-col gap-5 rounded-[20px] p-[20px]">
            <div className="flex flex-row justify-between gap-[15px] items-center">
              <div className="rounded-[12px] bg-primary-700 text-white text-body3 p-[10px] justify-items-center flex">
                새로운공지
              </div>
              <p className="text-sub1 text-black">마감 2시간 전 특급 할인!</p>
            </div>
            <p className="text-body2 text-gray-800 text-left line-clamp-4 overflow-hidden">
              마감 2시간 전이라 특급 할인 진행하고 있으니 와서 보고 가세요~!
              정말 맛있습니다
            </p>
            <Button className="w-full text-body3 text-white py-[13.5px] bg-gray-800 rounded-[12px]">
              확인했어요
            </Button>
          </div>
        </div>
        <div className="flex flex-col w-full gap-[15px] p-[20px] bg-gray-50 rounded-[12px]">
          <div className="flex flex-row justify-start gap-[34px] items-center">
            <p className="text-body1 text-gray-500">연락처</p>
            <p className="text-body2 text-black">010-1234-5678</p>
          </div>
          <div className="flex flex-row justify-start gap-[20px] items-center">
            <p className="text-body1 text-gray-500">운영시간</p>
            <p className="text-body2 text-black">평일 09:00-20:00</p>
          </div>
          <div className="flex flex-row justify-start gap-[47px] items-start">
            <p className="text-body1 text-gray-500 whitespace-nowrap">주소</p>
            <div className="flex flex-col items-end">
              <p className="text-body2 text-black line-clamp-2 text-left">
                경기 성남시 분당구 동판교로177번길 25 2층 220호
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
