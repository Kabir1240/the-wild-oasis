import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings"

export default function useBookingDelete() {
    const queryClient = useQueryClient()
  
    const {
      isPending: isDeletingBooking,
      mutate: deleteBooking,
    } = useMutation({
      mutationFn: (id) => deleteBookingAPI(id),
      onSuccess: () => {
        toast.success("Booking successfully deleted")
        queryClient.invalidateQueries({
          queryKey: ["bookings"],
        })
      },
      onError: (error) => toast.error(error.message)
    })
  
  return ({isDeletingBooking, deleteBooking})
}
