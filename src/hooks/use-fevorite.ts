import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface FevoriteItem {
  id: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFevorite() {
  const [fevorite, setFevorite] = useLocalStorage<FevoriteItem[]>(
    "fevorite",
    []
  );

  const queryClient = useQueryClient();

  const favoriteQuery = useQuery({
    queryKey: ["fevorite"],
    queryFn: () => fevorite,
    initialData: fevorite,
    staleTime: Infinity,
  });

  const addFevorite = useMutation({
    mutationFn: async (city: Omit<FevoriteItem, "id" | "addedAt">) => {
      const newFevorite: FevoriteItem = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };

      const exits = fevorite.some((fev) => fev.id === newFevorite.id);

      if (exits) return fevorite;

      const newFevorites = [newFevorite, ...fevorite].slice(0, 10);

      setFevorite(newFevorites);
      return newFevorites;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fevorite"],
      });
    },
  });

  const removeFevorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavirite = fevorite.filter((city) => city.id !== cityId);
      setFevorite(newFavirite);
      return newFavirite;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fevorite"],
      });
    },
  });

  return {
    fevorite: favoriteQuery.data ?? [],
    addFevorite,
    removeFevorite,
    isFevorite: (lat: number, lon: number): boolean => {
      return fevorite.some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
