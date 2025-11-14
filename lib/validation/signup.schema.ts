import { z } from "zod";

// ZOD form validation schema
export const SignUpFormSchema = z.object({
  username: z.string().min(3, "Username must be atleast 3 characters long"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be atleast 6 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
      "Password must contains atleast one letter and one number"
    ),
  // confirmpassword: z.string().min(1, "Please confirm your password"),
});
// .refine((data) => data.password === data.confirmpassword, {
//   message: "Password do not match",
//   path: ["confirmpassword"],
// });
