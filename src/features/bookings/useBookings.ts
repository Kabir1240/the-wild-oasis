import { useQuery } from "@tanstack/react-query"
import { getBookings } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"

export default function useBookings() {
  const [searchParams] = useSearchParams();
  
  // FILTER
  const filterValue = searchParams.get("status");
  const filter = !filterValue || filterValue === 'all' ? null : { field: 'status', value: filterValue }

  // SORT
  const sortByRaw = searchParams.get('sortBy') || "startDate-desc";
  const [field, direction] = sortByRaw.split('-');
  const sortBy = { field, direction }

  const {
    isPending: isFetchingBookings,
    data: bookings,
    error: bookingsError,
  } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  })

  return { isFetchingBookings, bookingsError, bookings }
}
