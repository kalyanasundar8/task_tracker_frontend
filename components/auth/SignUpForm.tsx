"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { showToast } from "../toasts/Toasts";
import { ArrowRight } from "lucide-react";
import { SignUpFormSchema } from "@/lib/validation/signup.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
  // confirmpassword: string;
}

const SignUpForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Onsubmit event
  const onSubmit = async (data: FormData) => {
    const userInfo = {
      user_name: data.username,
      email: data.email,
      password: data.password,
      // confirmPassword: data.confirmpassword,
      auth_type: "email",
    };

    console.log(data);
    const response = await fetch(
      "https://task-tracker-yjaw.onrender.com/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      }
    );

    if (!response.ok) {
      showToast({ status: "error", message: "Something went wrong!" });
    }
    showToast({ status: "success", message: "Data saved" });
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-3 w-full sm:w-3/4 md:w-2/6 lg:w-1/3 transition-all duration-300 transform"
    >
      <div className="flex flex-col items-start">
        <label htmlFor="username" className="text-sm">
          Username*
        </label>
        <input
          {...register("username", { required: true })}
          type="text"
          placeholder="username"
          className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
        />
        <p
          className={`text-sm p-1 text-red-600 transition-all duration-300 transform ${
            errors.username
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-1"
          }`}
        >
          {errors.username?.message || " "}
        </p>
      </div>
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
      {/* <div className="flex flex-col items-start">
              <label htmlFor="confirmpassword" className="text-sm">
                Confirm Password*
              </label>
              <input
                {...register("confirmpassword", { required: true })}
                type="password"
                placeholder="confirm password"
                className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
              />
              <p
                className={`text-sm p-1 text-red-600 transition-all duration-300 transform ${
                  errors.confirmpassword
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
                }`}
              >
                {errors.confirmpassword?.message}
              </p>
            </div> */}
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
        <p className="text-gray-400">Already have an account?</p>
        <Link
          href="/auth/signin"
          className="font-semibold tracking-tighter opacity-50 hover:opacity-100 transition-all  duration-300"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
