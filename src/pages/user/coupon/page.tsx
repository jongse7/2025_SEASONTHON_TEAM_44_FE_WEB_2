import Space from '@/components/Space';
import Pop from '@/components/svg/Pop';
import Tab from '@/components/Tab';
import CouponCard from '@/pages/user/coupon/components/CouponCard';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { cn } from '../../../utils/cn';
import { getStampCouponsOptions } from '@/query/options/stamp';
import { CouponType } from '@/schema/api/stamp';

const TAB_TO_COUPON_TYPE_MAP: Record<string, CouponType> = {
  'my-coupon': CouponType.OWNED,
  'schedule-coupon': CouponType.SCHEDULED,
};

export function CouponPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab =
    (searchParams.get('tab') as 'my-coupon' | 'schedule-coupon') || 'my-coupon';

  const couponType = TAB_TO_COUPON_TYPE_MAP[tab];
  const { data: coupons } = useSuspenseQuery(
    getStampCouponsOptions(couponType),
  );

  const handleTabClick = (tab: 'my-coupon' | 'schedule-coupon') => {
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
            isActive={tab === 'my-coupon'}
            onClick={() => handleTabClick('my-coupon')}
          >
            내 쿠폰
          </Tab>
          <Tab
            isActive={tab === 'schedule-coupon'}
            onClick={() => handleTabClick('schedule-coupon')}
          >
            예정 쿠폰
          </Tab>
        </div>
        <div
          className={cn(
            'flex flex-col gap-[5px] py-[10px]',
            coupons.response.length === 0 &&
              'h-full flex items-center justify-center',
          )}
        >
          {coupons.response.length === 0 ? (
            <p className="text-body1 w-full text-center text-gray-400">
              가게를 방문해 쿠폰을 발급 받으세요
            </p>
          ) : (
            coupons.response.map((coupon) =>
              tab === 'my-coupon' ? (
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
              ),
            )
          )}
        </div>
      </main>
    </div>
  );
}
