import { useQuery } from "@tanstack/react-query";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch("/data/countries.json");
      if (!res.ok) throw new Error("Failed to load countries");
      return res.json();
    },
    staleTime: 1000 * 60 * 10, //10 minutes
  });
}
