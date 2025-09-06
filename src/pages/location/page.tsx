import Button from "@/components/Button";
import Space from "@/components/Space";

export const LocationPage = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-end">
      <h1 className="text-h3 text-black text-center">
        먼저, 더 나은 단골 서비스를
        <br />
        이용하기 위해 동네를 알려주세요
      </h1>
      <img
        src="/images/location/location-icon.png"
        alt="location"
        className="size-[210px] my-[120px]"
      />
      <div className="px-5 w-full gap-[5px] flex flex-col">
        <Button className="w-full text-button1 py-[17px] bg-primary-500 text-white rounded-[12px]">
          현재 위치로 설정
        </Button>
        <Button className="w-full text-button1 text-gray-800 py-[17px] bg-primary-50 rounded-[12px]">
          동 검색하기
        </Button>
      </div>
      <Space className="h-[13px]" />
      <p className="text-button2 text-gray-400 text-center">
        방문 통계를 통해 사장님이 더 좋은 서비스를 준비할 수 있어요.
        <br />
        구체적인 주소는 저장하지 않으며, 동 이름만 기록됩니다.
      </p>
      <Space className="h-12" />
    </main>
  );
};
