import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useLogin() {
  const navigate = useNavigate();

  const { mutate:login, isLoading:isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => {
      return loginAPI({ email, password });
    },
    onSuccess: (user) => {
      console.log(user);
      navigate('/');
    },
    onError: (err) => {
      console.log("Error", err.message);
      toast.error("Provided Email or Password are Incorrect")
    }
  })

  return { login, isLoggingIn }
}
