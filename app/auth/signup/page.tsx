"use client";
import { showToast } from "@/components/toasts/Toasts";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";

// ZOD form validation schema
const SignUpFormSchema = z
  .object({
    username: z.string().min(3, "Username must be atleast 3 characters long"),
    email: z.email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be atleast 6 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Password must contains atleast one letter and one number"
      ),
    confirmpassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password do not match",
    path: ["confirmpassword"],
  });

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const page = () => {
  // Useform from react-hook-form
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
      confirmpassword: "",
    },
  });

  // Onsubmit event
  const onSubmit = (data: FormData) => {
    console.log(data);
    showToast({ status: "success", message: "Data saved" });
  };

  return (
    // Main section for signup page
    <section className="container mx-auto p-2">
      {/* container for signup form */}
      <div className="flex items-center justify-center mt-10">
        {/* Form container */}
        <div className="flex flex-col items-center justify-center space-y-10 w-full py-10 px-6">
          {/* Header */}
          <div className="flex flex-col items-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tighter text-center">
              Taskiee
            </h1>
            <p className="text-center text-sm md:text-[16px] w-2/3 md:w-full">
              Lets create your new account and get started
            </p>
          </div>
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
            <div className="flex flex-col items-start">
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
              <p className="text-gray-400">Already have an account?</p>
              <Link
                href="/auth/signin"
                className="font-semibold tracking-tighter opacity-50 hover:opacity-100 transition-all  duration-300"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
