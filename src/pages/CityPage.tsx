import CurrentWeather from "@/components/current-weather";
import FevoriteButton from "@/components/fevorite-button";
import HourlyTamprature from "@/components/hourly-tamprature";
import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom";

const CityPage = () => {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");
  const coordinates = { lat, lon };

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const location = locationQuery.data?.[0];
  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error :</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <WeatherSkeleton />;
  }

  return (
    <div>
      {/* Fevorite cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          {params.cityName}, {location?.state}, {weatherQuery.data.sys.country}
        </h1>
        <div>
          <FevoriteButton
            data={{ ...weatherQuery.data, name: params.cityName }}
          />
        </div>
      </div>
      {/* current and hourly weather */}
      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data} location={location!} />
          <HourlyTamprature data={forecastQuery.data} />
        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          <WeatherDetails data={weatherQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div>
  );
};

export default CityPage;
