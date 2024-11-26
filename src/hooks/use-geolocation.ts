import { useEffect, useState } from "react";
import { Cordinates } from "../api/types";
interface GeolocationState {
  cordinates: Cordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function useGeolocation() {
  const [locationData, setLocationData] = useState<GeolocationState>({
    cordinates: null,
    error: null,
    isLoading: true,
  });
  
  const getLocation = () => {
    setLocationData((pre) => ({ ...pre, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        cordinates: null,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          cordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
            break;
        }
        setLocationData({
          cordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
