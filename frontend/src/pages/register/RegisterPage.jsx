import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import loadingIcon from "../../assets/loading.png";
import imathIcon from "/math_icon.png";

export function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassoword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState("hidden");
  const [showError, setShowError] = useState("hidden");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(null);

  const navigate = useNavigate();

  function clearErrors() {
    setMessage("");
    setShowError("hidden");
  }

  async function createAccount(event) {
    event.preventDefault();

    if (password !== confirmPassoword) {
      setShowError("");
      setMessage("password do not match");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://imath.onrender.com/api/user/register",
        {
          username: username,
          email: email,
          password: password,
        },
      );

      setShowSuccess("");
      setMessage(response.data.message);
      setUserName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsLoading(false);
      setTimeout(() => {
        navigate("/login");
        setShowSuccess("hidden");
      }, 1000);
    } catch (error) {
      console.log(error.response);
      const detail = error.response.data.detail;
      setShowError("");
      setMessage(detail);
      setIsLoading(false);
    }
  }

  return (
    <>
      <title>iMath | Register</title>
      <div className="h-dvh overflow-hidden bg-gray-50 flex items-center justify-center px-4">
        {/* <!-- Overall container --> */}

        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-5">
          <h1 className="text-2xl font-bold text-center text-green-700">
            <div className="w-fit flex items-center mx-auto">
              <img src={imathIcon} alt="imath icon" className="w-10" />
              <span>iMath</span>
            </div>
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            Create your account.
          </p>

          <div
            className={`${showSuccess} mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 `}
          >
            Registration successful.
          </div>

          <div
            className={`${showError} mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`}
          >
            {/* Registration failed. Please try again. */}
            {message}
          </div>

          <form className="mt-5 space-y-4" onSubmit={createAccount}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                type="text"
                placeholder="Enter your username"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                required={true}
                value={username}
                onChange={(event) => {
                  setUserName(event.target.value);
                }}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                required={true}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                required={true}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>

              <input
                type="password"
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                required={true}
                value={confirmPassoword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>

            <button
              disabled={isLoading}
              className="w-full h-10 rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-wait disabled:opacity-70 disabled:hover:bg-green-600"
            >
              {isLoading ? (
                <div className="w-full flex items-center justify-center">
                  <img src={loadingIcon} className="w-6 animate-spin" />
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="font-medium text-green-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
