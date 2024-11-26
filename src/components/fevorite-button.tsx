import { WeatherData } from "@/api/types";
import { useFevorite } from "@/hooks/use-fevorite";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FevoriteButtonProps {
  data: WeatherData;
}
const FevoriteButton = ({ data }: FevoriteButtonProps) => {
  const { addFevorite, removeFevorite, isFevorite } = useFevorite();
  const isCurrenltyFevorite = isFevorite(data.coord.lat, data.coord.lon);

  const handleToggleFevorite = () => {
    if (isCurrenltyFevorite) {
      removeFevorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${data.name} from fevorites`);
    } else {
      addFevorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${data.name} to fevorites`);
    }
  };

  return (
    <Button
      variant={isCurrenltyFevorite ? "default" : "outline"}
      size={"icon"}
      className={isCurrenltyFevorite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      onClick={handleToggleFevorite}
    >
      <Star
        className={`h-4 w-4 ${isCurrenltyFevorite ? "fill-current" : ""}`}
      />
    </Button>
  );
};

export default FevoriteButton;
