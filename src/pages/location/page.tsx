import { useState, useEffect } from "react";
import Button from "@/components/Button";
import Space from "@/components/Space";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getUserLocationOptions } from "@/query/options/user";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { getGeocodeAddress } from "@/api/authenticated/location";
import Toast from "@/components/Toast";
import { useModal } from "@/hooks/useModal";
import { postUsersLocation } from "@/api/authenticated/user";
import type { LocationData } from "@/schema/location";

export const LocationPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = useSuspenseQuery(getUserLocationOptions());
  const { mutate: patchLocation } = useMutation({
    mutationFn: (region: string) => postUsersLocation(region),
    onSuccess: () => {
      navigate("/main");
      location.state = undefined;
    },
    onError: () => {
      openModal(({ onClose }) => <Toast label="서버 에러" onClose={onClose} />);
    },
  });
  const { openModal } = useModal();

  useEffect(() => {
    const selectedLocation = location.state?.selectedLocation as
      | LocationData
      | undefined;
    if (selectedLocation) {
      handleLocationSelected(
        selectedLocation.latitude,
        selectedLocation.longitude
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  if (data.response) {
    return <Navigate to="/main" replace />;
  }

  const handleLocationSelected = async (lat: number, lng: number) => {
    setLoading(true);
    console.log("handleLocationSelected 실행:", { lat, lng });

    try {
      const addressResult = await getGeocodeAddress({
        lat,
        lng,
      });

      patchLocation(addressResult.response.address);
      openModal(({ onClose }) => (
        <Toast
          label={`${addressResult.response.address}(으)로 주소가 등록되었습니다.`}
          onClose={onClose}
        />
      ));
    } catch (error) {
      console.error("주소 변환 실패:", error);
      openModal(({ onClose }) => (
        <Toast
          label="주소 변환에 실패했습니다. 다시 시도해주세요."
          onClose={onClose}
        />
      ));
    }

    setLoading(false);
  };

  const getCurrentLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      openModal(({ onClose }) => (
        <Toast
          label="이 브라우저는 위치 서비스를 지원하지 않습니다."
          onClose={onClose}
        />
      ));
      setLoading(false);
      return;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000,
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await handleLocationSelected(latitude, longitude);
      },
      (error) => {
        let errorMessage;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "위치 접근 권한이 거부되었습니다. 브라우저 설정에서 위치 권한을 허용해주세요.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "위치 정보를 사용할 수 없습니다. 잠시 후 다시 시도해주세요.";
            break;
          case error.TIMEOUT:
            errorMessage =
              "위치 요청이 시간 초과되었습니다. 다시 시도해주세요.";
            break;
          default:
            errorMessage = "위치를 가져오는 중 오류가 발생했습니다.";
        }
        openModal(({ onClose }) => (
          <Toast label={errorMessage} onClose={onClose} />
        ));
        setLoading(false);
      },
      options
    );
  };

  const handleSearchLocation = () => {
    navigate("/location/kakao-map");
  };

  return (
    <main className="w-full h-screen flex flex-col items-center justify-end">
      <h1 className="text-h3 text-black text-center">
        먼저, 더 나은 단골 서비스를
        <br />
        이용하기 위해 동네를 알려주세요
      </h1>

      <img
        src="/images/location/location-icon.png"
        alt="location"
        className="size-[210px] my-[120px]"
      />

      <div className="px-5 w-full gap-[5px] flex flex-col">
        <Button
          className="w-full text-button1 text-gray-800 py-[17px] bg-primary-50 rounded-[12px] disabled:bg-gray-200 disabled:text-gray-400"
          onClick={handleSearchLocation}
          disabled={loading}
        >
          {loading ? "처리 중..." : "동 검색하기"}
        </Button>
        <Button
          className="w-full text-button1 py-[17px] bg-primary-500 text-white rounded-[12px] disabled:bg-primary-300"
          onClick={getCurrentLocation}
          disabled={loading}
        >
          {loading ? "위치 가져오는 중..." : "현재 위치로 설정"}
        </Button>
      </div>

      <Space className="h-[13px]" />

      <p className="text-button2 text-gray-400 text-center">
        방문 통계를 통해 사장님이 더 좋은 서비스를 준비할 수 있어요.
        <br />
        구체적인 주소는 저장하지 않으며, 동 이름만 기록됩니다.
      </p>

      <Space className="h-12" />
    </main>
  );
};
