import { useLocation, useNavigate } from "react-router-dom";
import Home from "./svg/Home";
import User from "./svg/User";
import QR from "./svg/QR";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const isHomeActive = currentPath.includes("/main");
  const isUserActive = currentPath.includes("/user");

  const handleHomeClick = () => {
    navigate("/main", { replace: true });
  };

  const handleUserClick = () => {
    navigate("/user", { replace: true });
  };

  return (
    <footer className="fixed bottom-0 pt-[5px] pb-[32px] left-0 right-0 h-[85px] bg-white flex flex-row justify-between items-end z-50">
      <div
        className="flex-1 flex-col items-center justify-center flex cursor-pointer"
        onClick={handleHomeClick}
      >
        <Home
          className={`size-[30px] ${
            isHomeActive ? "text-gray-800" : "text-gray-200"
          }`}
        />
        <p
          className={`text-body4 ${
            isHomeActive ? "text-gray-800" : "text-gray-200"
          }`}
        >
          홈
        </p>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-[35px]">
        <div className="w-[70px] h-[70px] bg-primary-500 rounded-full flex items-center justify-center">
          <QR className="size-[38px] text-white" />
        </div>
      </div>

      <div
        className="flex-1 flex-col items-center justify-center flex cursor-pointer"
        onClick={handleUserClick}
      >
        <User
          className={`size-[30px] ${
            isUserActive ? "text-gray-800" : "text-gray-200"
          }`}
        />
        <p
          className={`text-body4 ${
            isUserActive ? "text-gray-800" : "text-gray-200"
          }`}
        >
          마이온
        </p>
      </div>
    </footer>
  );
}
