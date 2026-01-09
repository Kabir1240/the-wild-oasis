import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser as updateUserAPI } from "../../services/apiAuth";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateUserAPI,
    onSuccess: () => {
      toast.success("User account updated Successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"]
      });
    },
    onError: (error) => {toast.error(error.message)}
  });

  return { updateUser, isUpdatingUser }
}
