import { Routes, Route, Navigate } from "react-router-dom";
import { OverlayProvider } from "overlay-kit";
import { LoginPage } from "@/pages/login/page";
import { MainPage } from "@/pages/main/page";
import { StorePage } from "@/pages/main/[id]/page";
import { UserPage } from "@/pages/user/page";
import { CouponPage } from "@/pages/user/coupon/page";
import { LocationPage } from "@/pages/location/page";
import OnboardingPage from "@/pages/onboadring/page";

function App() {
  return (
    <div className="max-w-[768px] mx-auto flex justify-items-center scrollbar-hide">
      <OverlayProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/main/:storeId" element={<StorePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/coupon" element={<CouponPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Routes>
      </OverlayProvider>
    </div>
  );
}

export default App;
