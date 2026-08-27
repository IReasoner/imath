import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState("hidden");
  const [showError, setShowError] = useState("hidden");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  function clearErrors() {
    setShowError("hidden");
  }

  async function login(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", `${email}`);
    formData.append("password", `${password}`);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData,
      );

      localStorage.setItem("access_token", response.data.access_token);

      setEmail("");
      setPassword("");
      setShowSuccess("");
      setMessage("login successfully");
      setTimeout(() => {
        navigate("/career");
        setShowSuccess("hidden");
      }, 1500);
    } catch (error) {
      console.log(error.response);
      const detail = error.response.data.detail;
      setShowError("");
      setMessage(detail);
    }
  }

  return (
    <>
      <title>iMath | Login</title>

      <div className="h-dvh overflow-hidden bg-gray-50 flex items-center justify-center px-4">
        {/* <!-- Overall container --> */}
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white shadow-md p-5">
          <h1 className="text-2xl font-bold text-center text-green-700">
            iMath
          </h1>

          <p className="mt-1 text-center text-sm text-gray-500">
            Sign in to continue.
          </p>

          {/* <!-- Success --> */}

          <div
            className={`${showSuccess} mt-4 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700`}
          >
            {message}
          </div>

          {/* <!-- Error --> */}

          <div
            className={`${showError} mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700`}
          >
            {message}
          </div>

          <form className="mt-5 space-y-4" onSubmit={login}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs text-green-700 hover:underline"
                  onClick={() =>
                    alert(
                      "Forget password functionality is yet to be added, you can contact this number 08105732607 on whatapp for changing of your password",
                    )
                  }
                >
                  Forgot password?
                </a>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                onFocus={clearErrors}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>

            <button className="w-full h-10 rounded-lg bg-green-600 text-sm font-semibold text-white transition hover:bg-green-700">
              Login
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/register"
              className="font-medium text-green-700 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
