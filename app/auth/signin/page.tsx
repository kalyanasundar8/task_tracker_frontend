"use client";
import SignInForm from "@/components/auth/SignInForm";

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
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default page;
