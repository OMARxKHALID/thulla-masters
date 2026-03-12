"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, Loader2, Fingerprint } from "lucide-react";

import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await loginAction(formData);

      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050512] flex items-center justify-center p-6 sm:p-8 font-sans border-0">
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 p-8 sm:p-12 rounded-[2.5rem]">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-2xl bg-yellow-400 border border-yellow-500/50 mb-6 shadow-lg shadow-yellow-400/20">
              <Fingerprint className="w-8 h-8 text-zinc-900" />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight uppercase leading-none">
              Admin Portal
            </h1>
            <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mt-3">
              Thulla Control Center
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="group space-y-2">
                <label className="text-[10px] font-black tracking-widest text-zinc-600 uppercase ml-1">
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your administrator email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-zinc-200 text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700 font-medium"
                  />
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[10px] font-black tracking-widest text-zinc-600 uppercase ml-1">
                  Login Password
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4 group-focus-within:text-yellow-400 transition-colors" />
                  <input
                    type="password"
                    required
                    placeholder="Enter your administrator password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 pl-12 pr-6 text-zinc-200 text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700 font-medium"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/5 border border-red-500/10 text-red-500/80 text-[11px] font-bold py-3 px-4 rounded-xl text-center uppercase tracking-wider">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-900 font-black py-4 rounded-2xl shadow-xl shadow-yellow-400/5 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2 text-sm tracking-tight"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "AUTHENTICATE ACCESS"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
