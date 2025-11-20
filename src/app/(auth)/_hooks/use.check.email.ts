import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { axiosInstance } from "@/lib/axios";

export function useCheckEmail() {
  const [email, setEmail] = useState("");
  const [debouncedEmail, setDebouncedEmail] = useState("");

  // Debounce logic
  useEffect(() => {
    const handler = debounce(() => {
      setDebouncedEmail(email);
    }, 600); // 600ms delay
    handler();
    return () => {
      handler.cancel();
    };
  }, [email]);

  // useMutation for backend check
  const mutation = useMutation({
    mutationKey: ["check-email"],
    mutationFn: async (email: string) => {
      const res = await axiosInstance.post("/api/auth/check-email", { email });
      return res.data;
    },
  });

  // Trigger mutation when debouncedEmail changes

  useEffect(() => {
    if (debouncedEmail) {
      mutation.reset();
      mutation.mutate(debouncedEmail);
    }
  }, [debouncedEmail]);

  return {
    email,
    setEmail,
    ...mutation,
  };
}
