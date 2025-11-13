import { toast } from "sonner";

type Props = {
  status: string;
  message: string;
};

export const showToast = ({ status, message }: Props) => {
    console.log("Toaster")
  if (status === "success") {
    toast.success(message);
  } else {
    toast.error(message);
  }
};
