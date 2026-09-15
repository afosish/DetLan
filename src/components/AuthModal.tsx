import React, { useState } from 'react';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  signOutUser, 
  type DetectiveProfile 
} from '../services/supabase';
import { soundEngine } from '../services/soundEngine';
import { X, Mail, Lock, UserCheck, ShieldAlert, Sparkles, LogOut } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProfile: DetectiveProfile;
  onProfileUpdated: (profile: DetectiveProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentProfile,
  onProfileUpdated,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMessage(null);
    soundEngine.playTypewriter();
    try {
      const res = await signInWithGoogle();
      if (res && 'user' in res && res.user) {
        onProfileUpdated(res.user as DetectiveProfile);
        soundEngine.playVictory();
        onClose();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Помилка авторизації через Google');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Будь ласка, заповніть електронну пошту та пароль.');
      return;
    }
    setLoading(true);
    setErrorMessage(null);
    soundEngine.playTypewriter();

    try {
      if (isSignUp) {
        const res = await signUpWithEmail(email, password, name);
        if (res && 'user' in res && res.user) {
          onProfileUpdated(res.user as DetectiveProfile);
        }
      } else {
        const res = await signInWithEmail(email, password);
        if (res && 'user' in res && res.user) {
          onProfileUpdated(res.user as DetectiveProfile);
        }
      }
      soundEngine.playVictory();
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Помилка автентифікації');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    soundEngine.playStampThud();
    const guest: DetectiveProfile = {
      ...currentProfile,
      name: 'Еркюль Пуаро (Гість)',
      isGuest: true,
    };
    onProfileUpdated(guest);
    onClose();
  };

  const handleLogout = async () => {
    soundEngine.playTypewriter();
    await signOutUser();
    const resetGuest: DetectiveProfile = {
      ...currentProfile,
      name: 'Детектив-стажер',
      email: '',
      isGuest: true,
      xp: 0,
    };
    onProfileUpdated(resetGuest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-[#121a28] border-2 border-[#d4af37] rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 font-serif-vintage overflow-hidden">
        {/* Decorative Confidential stamp */}
        <div className="absolute top-4 right-12 rotate-12 border-2 border-red-500/40 px-2 py-0.5 rounded text-red-500/50 text-[10px] font-mono tracking-widest uppercase pointer-events-none">
          ЦІЛКОМ ТАЄМНО
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playTypewriter();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#8b6914] p-0.5 mx-auto mb-3 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-[#0d131f] rounded-[14px] flex items-center justify-center text-3xl">
              🕵️‍♂️
            </div>
          </div>
          <h3 className="text-2xl font-bold text-[#f5d77f]">
            Особиста справа детектива
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Авторизація та синхронізація детективного прогресу
          </p>
        </div>

        {/* Current status if signed in */}
        {!currentProfile.isGuest && (
          <div className="bg-[#172437] border border-[#2b3c5a] rounded-2xl p-3 mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <div className="text-xs">
                <div className="font-bold text-slate-200">{currentProfile.name}</div>
                <div className="text-[11px] text-slate-400 font-mono">{currentProfile.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 text-xs bg-red-950/40 border border-red-500/30 text-red-300 rounded-lg hover:bg-red-900/50 transition-colors flex items-center gap-1 font-mono"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Вийти</span>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="bg-red-950/50 border border-red-500/40 text-red-200 p-3 rounded-xl text-xs flex items-start gap-2 mb-4 font-mono">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleAuth}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-sans font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-3 mb-4 active:scale-98"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Продовжити через Google</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-700 w-full" />
          <span className="bg-[#121a28] px-2 text-[11px] font-mono text-slate-400 uppercase">
            або електронна пошта
          </span>
          <div className="border-t border-slate-700 w-full" />
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-3 font-sans">
          {isSignUp && (
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">
                Ім'я чи псевдонім детектива
              </label>
              <input
                type="text"
                placeholder="наприклад: Еркюль Пуаро"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#0b1019] border border-slate-700 focus:border-[#d4af37] text-sm text-white outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Електронна пошта
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                placeholder="detective@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0b1019] border border-slate-700 focus:border-[#d4af37] text-sm text-white outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1">
              Пароль досьє
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#0b1019] border border-slate-700 focus:border-[#d4af37] text-sm text-white outline-none transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#e5c158] text-[#0a0e17] font-serif-vintage font-bold text-sm transition-all shadow-md mt-2"
          >
            {loading ? 'Перевірка алібі...' : isSignUp ? 'Зареєструвати слідчого' : 'Увійти до кабінету'}
          </button>
        </form>

        {/* Toggle Sign Up / Login */}
        <div className="mt-3 text-center">
          <button
            onClick={() => {
              soundEngine.playTypewriter();
              setIsSignUp(!isSignUp);
            }}
            className="text-xs text-[#d4af37] hover:underline font-mono"
          >
            {isSignUp ? 'Вже маєте посвідчення? Увійти' : 'Не маєте досьє? Зареєструватися'}
          </button>
        </div>

        {/* Guest Demo Login Option */}
        <div className="mt-5 pt-4 border-t border-slate-800 text-center">
          <button
            onClick={handleGuestLogin}
            className="text-xs text-slate-400 hover:text-[#f5d77f] font-mono flex items-center justify-center gap-1.5 mx-auto transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Швидкий вхід як Запрошений Детектив (Demo)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
