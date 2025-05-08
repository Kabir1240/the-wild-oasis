import { useQuery } from "@tanstack/react-query"
import getCabins from "../../services/apiCabins"

export default function useCabins() {
  const {
    isPending: isFetchingCabins,
    data: cabins,
    error: cabinsError,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  })

  return { isFetchingCabins, cabinsError, cabins }
}