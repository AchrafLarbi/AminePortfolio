/* eslint-disable no-unused-vars */
import { useState } from "react";
import { loginUser } from "../../utils/auth";
import customBg from "../../assets/custom_bg.png";
import { AlertCircle } from "lucide-react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const user = await loginUser(username, password);

      if (user) {
        window.location.href = "/houarioran31";
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-black text-white"
      style={{
        backgroundImage: `url(${customBg})`,
        backgroundSize: "15%",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center"></div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-black/40 p-8 rounded-lg border border-gray-800 relative"
          >
            {error && (
              <div
                className="absolute -top-12 left-0 right-0 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500 flex items-center gap-2 animate-shake"
                role="alert"
              >
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <h2 className="text-2xl font-bold text-center text-white mb-8">
              Admin Login
            </h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className={`w-full px-4 py-3 bg-black/40 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                    error ? "border-red-500" : "border-gray-800"
                  }`}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full px-4 py-3 bg-black/40 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors ${
                    error ? "border-red-500" : "border-gray-800"
                  }`}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-yellow-500 text-black rounded-md font-semibold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
