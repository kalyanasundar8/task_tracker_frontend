"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "../toasts/Toasts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInFormSchema } from "@/lib/validation/ValidationSchema";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Onsubmit event
  const onSubmit = async (data: FormData) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await fetch(
        // "https://task-tracker-yjaw.onrender.com/api/auth/signup",
        "http://localhost:5454/api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.log(errorResponse);
        showToast({ status: "error", message: errorResponse.message });
        return;
      }

      // Show toast message if the user account successfully created
      showToast({ status: "success", message: "Successfully logged" });
      // Navigate to home page if the user account created successfully
      router.push("/");
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-3 w-full sm:w-3/4 md:w-2/6 lg:w-1/3 transition-all duration-300 transform"
    >
      <div className="flex flex-col items-start">
        <label htmlFor="email" className="text-sm">
          Email*
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="email"
          className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
        />
        <p
          className={`text-sm p-1 text-red-600 transition-all duration-300 transform ${
            errors.email
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1"
          }`}
        >
          {errors.email?.message}
        </p>
      </div>
      <div className="flex flex-col items-start">
        <label htmlFor="password" className="text-sm">
          Password*
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password"
          className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
        />
        <p
          className={`text-sm p-1 text-red-600 transition-all duration-300 transform ${
            errors.password
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1"
          }`}
        >
          {errors.password?.message}
        </p>
      </div>
      <button
        disabled={!isValid}
        className={`group flex items-center text-center justify-center gap-2 w-full p-3 bg-black text-white rounded-sm ${
          !isValid ? "opacity-50" : ""
        }`}
      >
        Create account{" "}
        <ArrowRight
          size={18}
          className="transition-all duration-300 opacity-0 group-hover:opacity-100"
        />
      </button>
      <div className="text-sm flex items-center justify-center space-x-2 mt-4">
        <p className="text-gray-400">I dont have an account?</p>
        <Link
          href="/auth/signup"
          className="font-semibold tracking-tighter opacity-50 hover:opacity-100 transition-all  duration-300"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
