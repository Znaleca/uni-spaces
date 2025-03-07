'use client';

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import createUser from "@/app/actions/createUser";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for password visibility toggle

const RegisterPage = () => {
  const [state, formAction] = useFormState(createUser, {});
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [passwordError, setPasswordError] = useState(""); // State for password error message
  const [matchError, setMatchError] = useState(""); // State for password match error message

  useEffect(() => {
    if (state.error) toast.error(state.error);
    if (state.success) {
      toast.success("You can now log in!");
      router.push("/login");
    }
  }, [state]);

  // Validate password length and matching
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    
    if (value !== password) {
      setMatchError("Passwords do not match.");
    } else {
      setMatchError("");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200/50 via-green-200/50 to-teal-200/50">
      {/* Registration Form */}
      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg shadow-lg p-10 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        <form action={formAction}>
          {/* Nickname Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Nickname
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="John"
              autoComplete="name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="johndoe@example.com"
              autoComplete="email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Enter your password"
                required
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6 relative">
            <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                name="confirm-password"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>
            </div>
            {matchError && (
              <p className="text-red-500 text-sm mt-1">{matchError}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            disabled={passwordError || matchError}
          >
            Register
          </button>

          {/* Footer Links */}
          <p className="text-center mt-4 text-sm text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
