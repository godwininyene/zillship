'use client'

import { useState } from "react";
import InputField from "@/ui/InputField";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  
  const message = searchParams.get("message") || ''

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const dataToSend = Object.fromEntries(formData);

      const res = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Login failed");
        return;
      }

      setSuccess(true);
      e.target.reset();

      // redirect after login
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Sign in to ZillShip
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Manage your shipments and track packages
          </p>
        </div>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {error || message && (
              <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                {error || message}
              </p>
            )}

            {success && (
              <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
                Login successful
              </p>
            )}

            <InputField
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              required
            />

            <InputField
              label="Password"
              name="password"
              autoComplete="current-password"
              type="password"
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-8 py-3 rounded-lg"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
