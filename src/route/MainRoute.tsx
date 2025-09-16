import { Routes, Route } from 'react-router-dom';
import LoginPage from '@/pages/login/page';
import { MainPage } from '@/pages/main/page';
import { StorePage } from '@/pages/main/[id]/page';
import { UserPage } from '@/pages/user/page';
import { CouponPage } from '@/pages/user/coupon/page';
import Layout, {
  ProtectedRoute,
  PublicRoute,
  NotFoundRoute,
} from '@/route/Layout';
import OnboardingPage from '@/pages/onboadring/page';
import { KakaoMapPage } from '@/pages/location/kakao-map/page';
import { LocationPage } from '@/pages/location/page';
import ScannerPage from '@/pages/main/scanner/page';

export function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/:storeId" element={<StorePage />} />
          <Route path="/main/scanner" element={<ScannerPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/coupon" element={<CouponPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/location/kakao-map" element={<KakaoMapPage />} />
        </Route>
        <Route path="*" element={<NotFoundRoute />} />
      </Route>
    </Routes>
  );
}
