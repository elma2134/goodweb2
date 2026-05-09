import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface LoginPageProps {
  onLogin: (username: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // AUTO LOGIN SESSION
  useEffect(() => {
    const savedUser = localStorage.getItem('admin-auth');

    if (savedUser) {
      onLogin(savedUser);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // PRIVATE LOGIN
    const ADMIN_USER = 'admin';
    const ADMIN_PASS = '231031';

    if (
      username === ADMIN_USER &&
      password === ADMIN_PASS
    ) {
      localStorage.setItem('admin-auth', username);
      onLogin(username);
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-black to-blue-950 opacity-95"></div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-8">

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg mb-5">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-bold text-white">
              ADMIN PANEL
            </h1>

            <p className="text-gray-300 mt-2 text-sm">
              Secure Access Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* USERNAME */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  text-white
                  placeholder-gray-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                "
                placeholder="Enter username"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full px-4 py-3 pr-12
                    rounded-xl
                    bg-white/5
                    border border-white/10
                    text-white
                    placeholder-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500
                  "
                  placeholder="Enter password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 right-4 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 rounded-xl
                bg-indigo-600 hover:bg-indigo-700
                transition-all duration-300
                text-white font-semibold
                flex items-center justify-center gap-2
              "
            >
              <Lock size={18} />
              Secure Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
