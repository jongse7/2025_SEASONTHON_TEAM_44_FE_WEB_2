import Space from "@/components/Space";
import Pop from "@/components/svg/Pop";
import Tab from "@/components/Tab";
import CouponCard from "@/pages/user/coupon/components/CouponCard";
import { getRegularCouponOptions } from "@/query/options/regular";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useSearchParams, Link } from "react-router-dom";

export function CouponPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: coupons } = useSuspenseQuery(getRegularCouponOptions());
  const tab =
    (searchParams.get("tab") as "my-coupon" | "schedule-coupon") || "my-coupon";

  const handleTabClick = (tab: "my-coupon" | "schedule-coupon") => {
    setSearchParams({ tab });
  };

  return (
    <div className="w-full min-h-screen">
      <header className="py-3 flex flex-row px-5 items-center justify-between">
        <Link to="/user">
          <Pop />
        </Link>
        <h1 className="text-sub1">내 쿠폰함</h1>
        <Space className="w-[20px]" />
      </header>
      <main className="bg-gray w-full h-full bg-gray-30 px-5">
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
        <div className="flex flex-col gap-[5px] py-[10px]">
          {coupons.response.map((coupon) =>
            tab === "my-coupon" ? (
              Array.from({ length: coupon.couponCount }).map((_, idx) => (
                <CouponCard
                  key={`${coupon.stampId}-${idx}`}
                  coupon={coupon}
                  isCoupon
                />
              ))
            ) : (
              <CouponCard
                key={coupon.stampId}
                coupon={coupon}
                isCoupon={false}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
