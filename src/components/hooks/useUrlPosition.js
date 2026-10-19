import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  const [searchParamsl] = useSearchParams();
  const lat = searchParamsl.get("lat");
  const lng = searchParamsl.get("lng");
  return [lat, lng];
}
