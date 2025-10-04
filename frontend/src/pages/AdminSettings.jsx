import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/authContext";

const AdminSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);

  // 👁️ Password visibility states
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          alert("✅ Password Changed Successfully!");
          navigate("/admin-dashboard");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="mt-5 min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-6">
      {/* Background Grid */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
            Change Password
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-lg border border-red-500/30 rounded-xl text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-gradient-to-br from-gray-900/40 to-blue-900/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20 p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Old Password */}
              <div className="relative">
                <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                  Old Password
                </label>
                <input
                  type={showOld ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Old Password"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-cyan-300"
                >
                  {showOld ? "👁️" : "🙈"}
                </button>
              </div>

              {/* New Password */}
              <div className="relative">
                <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                  New Password
                </label>
                <input
                  type={showNew ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-cyan-300"
                >
                  {showNew ? "👁️" : "🙈"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-cyan-300 text-sm font-semibold mb-2 tracking-wide">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800/50 backdrop-blur-sm border border-cyan-500/30 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-11 text-gray-400 hover:text-cyan-300"
                >
                  {showConfirm ? "👁️" : "🙈"}
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full relative group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 border border-cyan-400/30 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:translate-x-32 transition-transform duration-700"></div>
                <span className="relative flex items-center justify-center gap-2">
                  Change Password
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Security Status */}
        <div className="flex justify-center items-center gap-3 mt-6 text-cyan-300/70 text-sm">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>
            Security system online • Last updated:{" "}
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
