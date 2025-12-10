import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const { signInUser, googleLogin } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Save user using axiosSecure → POST /users
  const saveUser = async (userObj) => {
    try {
      const res = await axiosSecure.post("/users", userObj);
      console.log("User saved:", res.data);
    } catch (error) {
      console.error("User save failed:", error.response?.data || error);
    }
  };


  const onSubmit = async (data) => {
    try {
      const cred = await signInUser(data.email, data.password);

      await saveUser({
        name: cred.user.displayName || "",
        email: cred.user.email,
        photoURL: cred.user.photoURL || "",
      });

      Swal.fire({
        title: "Login Successful!",
        text: "Welcome back to CityFix!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Login Failed!",
        text: err.message,
        icon: "error",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();

      await saveUser({
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });

      Swal.fire({
        title: "Google Login Successful!",
        text: "Welcome to CityFix!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      Swal.fire({
        title: "Google Login Failed!",
        text: err.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Login to CityFix
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full border rounded-xl p-3 hover:shadow-md transition"
        >
          <FcGoogle className="text-2xl" />
          Login with Google
        </button>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
