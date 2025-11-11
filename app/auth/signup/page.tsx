import { ArrowRight } from "lucide-react";
import Link from "next/link";

const page = () => {
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
          <div className="flex flex-col space-y-4 w-full sm:w-3/4 md:w-2/6 lg:w-1/3">
            <div className="flex flex-col items-start">
              <label htmlFor="username" className="font-medium">Username*</label>
              <input
                type="text"
                placeholder="username"
                className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                placeholder="email"
                className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Password*</label>
              <input
                type="password"
                placeholder="password"
                className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
              />
            </div>
            <div className="flex flex-col items-start">
              <label htmlFor="password">Confirm Password*</label>
              <input
                type="password"
                placeholder="confirm password"
                className="w-full px-2 py-1 md:p-2 border-2 border-gray-300/60 rounded-md focus:outline-blue-500 placeholder:text-sm"
              />
            </div>
            <button className="flex items-center text-center justify-center gap-2 w-full p-3 bg-black text-white rounded-sm">Create account <ArrowRight size={18}/></button>
            <div className="text-sm flex items-center justify-center space-x-2">
              <p className="text-gray-400">Already have an account?</p>
              <Link href="#">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
