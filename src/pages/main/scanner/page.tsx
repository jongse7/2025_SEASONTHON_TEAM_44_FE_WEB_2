import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let isInitialized = false;

    const initializeScanner = async () => {
      if (!videoRef.current || isInitialized) return;

      try {
        if (qrScannerRef.current) {
          qrScannerRef.current.destroy();
          qrScannerRef.current = null;
        }

        const hasCamera = await QrScanner.hasCamera();
        if (!hasCamera) {
          setHasPermission(false);
          return;
        }

        isInitialized = true;

        qrScannerRef.current = new QrScanner(
          videoRef.current,
          (result) => {
            if (result.data.startsWith("http")) {
              window.location.href = result.data;
            }
          },
          {
            returnDetailedScanResult: true,
            highlightScanRegion: true,
            highlightCodeOutline: true,
            preferredCamera: "environment",
          }
        );

        await qrScannerRef.current.start();
        setHasPermission(true);
      } catch (error) {
        console.error("QR 스캐너 초기화 실패:", error);
        setHasPermission(false);
      }
    };

    const timeoutId = setTimeout(initializeScanner, 100);

    return () => {
      clearTimeout(timeoutId);
      isInitialized = true;
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
    };
  }, []);

  if (hasPermission === false) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">카메라 접근 불가</h2>
          <p className="text-gray-300 mb-4">
            QR 코드를 스캔하려면 카메라 권한이 필요합니다.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-500 text-white px-6 py-3 rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
        muted
        autoPlay
      />

      <div className="absolute top-20 left-0 right-0 text-center z-20">
        <p className="text-white text-lg font-medium">QR 코드 스캔</p>
      </div>

      <div className="absolute bottom-20 left-0 right-0 text-center z-20">
        <p className="text-white text-lg font-medium">
          QR 코드를 스캐너 안에 맞춰주세요
        </p>
      </div>

      {hasPermission === null && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>카메라를 준비하는 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}
