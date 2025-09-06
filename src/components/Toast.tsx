import { useEffect, useState } from "react";

interface ToastProps {
  onClose: () => void;
  label: string;
}

export default function Toast({ onClose, label }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300);
    }, 3000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out">
      <div
        className={`bg-gray-800 text-white px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-150 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
        {label}
      </div>
    </div>
  );
}
