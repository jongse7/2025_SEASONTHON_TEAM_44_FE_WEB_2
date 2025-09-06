import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Pop from "@/components/svg/Pop";
import type { LocationData } from "@/schema/location";

declare global {
  interface Window {
    kakao: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}

export const KakaoMapPage = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiKey = import.meta.env.VITE_KAKAO_KEY;

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };

    document.head.appendChild(script);
  }, []);

  const initializeMap = () => {
    if (!mapContainer.current || !window.kakao || !window.kakao.maps) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          createMap(lat, lng);
        },
        () => {
          createMap(37.566826, 126.9786567);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000,
        }
      );
    } else {
      createMap(37.566826, 126.9786567);
    }
  };

  const createMap = (lat: number, lng: number) => {
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);

    const marker = new window.kakao.maps.Marker({
      position: options.center,
      map: map,
    });

    //prettier-ignore
    window.kakao.maps.event.addListener(map, "click", (mouseEvent: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const latlng = mouseEvent.latLng;
      const clickedLat = latlng.getLat();
      const clickedLng = latlng.getLng();

      marker.setPosition(latlng);
      sessionStorage.setItem(
        "selectedLocation",
        JSON.stringify({ lat: clickedLat, lng: clickedLng })
      );
    });
  };

  const handleSetLocation = () => {
    const selectedLocation = sessionStorage.getItem("selectedLocation");
    if (selectedLocation) {
      const { lat, lng } = JSON.parse(selectedLocation);
      const locationData: LocationData = {
        latitude: lat,
        longitude: lng,
        accuracy: 0,
      };
      console.log("위치 데이터 전달:", locationData);
      navigate("/location", {
        state: {
          selectedLocation: locationData,
        },
      });
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <div className="bg-white px-5 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate("/location")}
            className="text-gray-800 bg-transparent border-none p-0"
          >
            <Pop />
          </Button>
          <h1 className="text-lg font-semibold">동네 선택</h1>
          <div className="w-12"></div>
        </div>
      </div>

      <div
        ref={mapContainer}
        className="flex-1 w-full"
        style={{ minHeight: "400px" }}
      />
      <div className="absolute z-50 bottom-8 left-1/2 transform -translate-x-1/2">
        <Button
          onClick={handleSetLocation}
          className="bg-primary-500 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          이 위치로 설정
        </Button>
      </div>
    </div>
  );
};
