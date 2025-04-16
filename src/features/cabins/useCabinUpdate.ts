import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCabinUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateCabin, isPending: isUpdating } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (error) => {toast.error(error.message)}
  });

  return { updateCabin, isUpdating }
}
