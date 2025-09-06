import Space from "@/components/Space";
import Pop from "@/components/svg/Pop";
import Tab from "@/components/Tab";
import { useSearchParams, Link } from "react-router-dom";

export function CouponPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab =
    (searchParams.get("tab") as "my-coupon" | "schedule-coupon") || "my-coupon";

  const handleTabClick = (tab: "my-coupon" | "schedule-coupon") => {
    setSearchParams({ tab });
  };

  return (
    <div className="w-full min-h-screen px-5">
      <header className="py-3 flex flex-row items-center justify-between">
        <Link to="/user">
          <Pop />
        </Link>
        <h1 className="text-sub1">내 쿠폰함</h1>
        <Space className="w-[20px]" />
      </header>
      <main className="bg-gray w-full h-full">
        <div className="flex flex-row items-center justify-start">
          <Tab
            isActive={tab === "my-coupon"}
            onClick={() => handleTabClick("my-coupon")}
          >
            내 쿠폰
          </Tab>
          <Tab
            isActive={tab === "schedule-coupon"}
            onClick={() => handleTabClick("schedule-coupon")}
          >
            예정 쿠폰
          </Tab>
        </div>
      </main>
    </div>
  );
}
