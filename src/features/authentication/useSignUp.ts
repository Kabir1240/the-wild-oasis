import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignUp() {
  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: signUpAPI,
    onSuccess: (user) => {
      console.log(user);
      toast.success('Account successfully created. Please verify new account from your email address');
    }
  })

  return { signUp, isSigningUp };
}
