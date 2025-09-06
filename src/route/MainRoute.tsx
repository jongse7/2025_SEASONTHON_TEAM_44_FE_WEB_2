import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "@/pages/login/page";
import { MainPage } from "@/pages/main/page";
import { StorePage } from "@/pages/main/[id]/page";
import { UserPage } from "@/pages/user/page";
import { CouponPage } from "@/pages/user/coupon/page";
import { LocationPage } from "@/pages/location/page";
import Layout from "@/route/Layout";

export function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/:storeId" element={<StorePage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/coupon" element={<CouponPage />} />
        <Route path="/location" element={<LocationPage />} />
      </Route>
    </Routes>
  );
}
