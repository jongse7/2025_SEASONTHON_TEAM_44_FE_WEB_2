import { authenticatedApi } from "./instance";
import {
  geocodeAddressRequestSchema,
  geocodeAddressResponseSchema,
  type GeocodeAddressRequest,
  type GeocodeAddressResponse,
} from "@/schema/api/location";

/**
 * 위도/경도를 주소로 변환
 * @param params - 위도와 경도
 * @returns Promise<GeocodeAddressResponse> - 변환된 주소
 */
export const getGeocodeAddress = async (
  params: GeocodeAddressRequest
): Promise<GeocodeAddressResponse> => {
  const validatedParams = geocodeAddressRequestSchema.parse(params);

  const response = await authenticatedApi
    .get("geocode/address", {
      searchParams: {
        lat: validatedParams.lat,
        lng: validatedParams.lng,
      },
    })
    .json();

  return geocodeAddressResponseSchema.parse(response);
};
