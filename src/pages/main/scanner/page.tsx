import { useEffect, useRef } from "react";

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "environment",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("카메라 접근 실패:", error);
      }
    };

    startCamera();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/images/main/scanner.png"
          alt="QR Scanner"
          className="w-64 h-64 z-10"
        />
      </div>
      <div className="absolute bottom-20 left-0 right-0 text-center">
        <p className="text-white text-lg font-medium">
          QR 코드를 스캐너 안에 맞춰주세요
        </p>
      </div>
    </div>
  );
}
