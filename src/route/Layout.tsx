import { OverlayProvider } from "overlay-kit";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="max-w-[768px] mx-auto flex justify-items-center scrollbar-hide">
      <OverlayProvider>
        <Outlet />
      </OverlayProvider>
    </div>
  );
}
