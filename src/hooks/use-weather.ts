import { Cordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATYER_KEYS = {
  weather: (cords: Cordinates) => ["weather", cords] as const,
  forecast: (cords: Cordinates) => ["forecast", cords] as const,
  location: (cords: Cordinates) => ["location", cords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export function useWeatherQuery(cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATYER_KEYS.weather(cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      cordinates ? weatherAPI.getCurrentWeather(cordinates) : null,
    enabled: !!cordinates,
  });
}

export function useForecastQuery(cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATYER_KEYS.forecast(cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (cordinates ? weatherAPI.getForecast(cordinates) : null),
    enabled: !!cordinates,
  });
}

export function useReverseGeocodeQuery(cordinates: Cordinates | null) {
  return useQuery({
    queryKey: WEATYER_KEYS.location(cordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (cordinates ? weatherAPI.reverseGeocode(cordinates) : null),
    enabled: !!cordinates,
  });
}

export function useLocationSearch(query: string) {
  return useQuery({
    queryKey: WEATYER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });
}
