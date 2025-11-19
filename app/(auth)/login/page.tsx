"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { loginSchema, LoginSchema } from "@/modules/auth/validations";
import { useRouter } from "next/navigation";
import { useLogin } from "@/modules/auth/hooks";
import { showToast } from "@/lib/toast";
import { useAuthContext } from "@/context/Context";
import Button from "@/components/ui/button";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, isPending } = useLogin();
  const { setUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    login(data, {
      onSuccess: async (response: any) => {
        console.log(response, 'response login');
        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);
        
        if (response.user) {
          localStorage.setItem("user", JSON.stringify(response.user));
          setUser(response.user);
        } else {
          try {
            const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me/`, {
              headers: {
                'Authorization': `Bearer ${response.access}`
              }
            });
            if (profileRes.ok) {
              const userData = await profileRes.json();
              localStorage.setItem("user", JSON.stringify(userData));
              setUser(userData);
            }
          } catch (e) {
            console.error('Error fetching user profile:', e);
          }
        }
        
        showToast.success("Welcome back to your dashboard");
        setTimeout(() => {
          router.push("/todo");
        }, 300);
      },
      onError: (error: any) => {
        const errorMessage = error?.response?.data?.message || error?.response?.data?.error || "Login failed. Please try again.";
        showToast.error(errorMessage);
      },
    });
  };

  return (
    <div className="min-h-screen w-full flex  bg-white">

      {/* LEFT Image */}
      <div className="hidden lg:flex w-[40%] items-center justify-center bg-secondary">
        <div className="w-[80%]">
          <Image
            src="/loginImage.png"
            width={600}
            height={600}
            alt="Login Image"
            className="w-full object-contain h-auto"
          />
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center   mx-auto justify-center py-10">
        <div className="w-full p-6 md:p-0  md:min-w-md  ">

          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-[#0B1B33]">
            Log in to your account
          </h1>
          <p className="text-center text-[16px] text-gray-500 mt-1">
            Start managing your tasks efficiently
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 w-full   text-black space-y-4"
          >
            {/* EMAIL */}
            <div>
              <label className="block mb-1 text-[14px] font-medium text-gray-700">Email</label>
              <input
                {...register("email")}
                type="email"
                className={`border rounded-md px-4 py-3 w-full outline-none 
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <label className="block mb-1 text-[14px] font-medium text-gray-700">Password</label>

              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                className={`border rounded-md px-4 py-3 w-full outline-none 
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />

              {/* TOGGLE ICON */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-primary right-3 bottom-4 cursor-pointer "
              >
                {showPassword ? <Eye size={20} /> : <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 16 16"><path fill="currentColor" d="m10.12 10.827l4.026 4.027a.5.5 0 0 0 .708-.708l-13-13a.5.5 0 1 0-.708.708l3.23 3.23A6 6 0 0 0 3.2 6.182a6.7 6.7 0 0 0-1.117 1.982c-.021.061-.047.145-.047.145l-.018.062s-.076.497.355.611a.5.5 0 0 0 .611-.355l.001-.003l.008-.025l.035-.109a5.7 5.7 0 0 1 .945-1.674a5 5 0 0 1 1.124-1.014L6.675 7.38a2.5 2.5 0 1 0 3.446 3.446m-.74-.74A1.5 1.5 0 1 1 7.413 8.12zM6.32 4.2l.854.854Q7.564 5 8 5c2.044 0 3.286.912 4.028 1.817a5.7 5.7 0 0 1 .945 1.674q.025.073.035.109l.008.025v.003l.001.001a.5.5 0 0 0 .966-.257v-.003l-.001-.004l-.004-.013a2 2 0 0 0-.06-.187a6.7 6.7 0 0 0-1.117-1.982C11.905 5.089 10.396 4 8.002 4c-.618 0-1.177.072-1.681.199"></path></svg>}
              </span>


              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="cursor-pointer" />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-primary hover:underline cursor-pointer"
              >
                Forgot your password?
              </a>
            </div>

            {/* BUTTON */}
            <Button
            loading={isPending}
              type="submit"
              className="w-full cursor-pointer py-3 bg-primary hover:bg-[#3A67E8] transition text-white rounded-md font-medium mt-2"
            >
              Log In
            </Button>

            {/* SIGNUP LINK */}
            <p className="text-center text-gray-600 mt-3">
              Don’t have an account?
              <Link href="/signup" className="text-primary ml-1 font-medium">
                Register now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
