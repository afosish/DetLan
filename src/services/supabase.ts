import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl =
  (import.meta.env.VITE_SUPABASE_URL as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
  (import.meta.env.SUPABASE_URL as string) ||
  '';

const supabaseAnonKey =
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string) ||
  (import.meta.env.SUPABASE_ANON_KEY as string) ||
  (import.meta.env.SUPABASE_PUBLISHABLE_KEY as string) ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface DetectiveProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
  xp: number;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  alibiCount: number; // Streak freezes
  completedEpisodes: string[];
  unlockedClues: string[];
  disarmedTrapsCount: number;
  isGuest: boolean;
}

export const DEFAULT_GUEST_PROFILE: DetectiveProfile = {
  id: 'guest',
  email: '',
  name: 'Гість',
  avatar: '🕵️‍♂️',
  xp: 0,
  streak: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  alibiCount: 0,
  completedEpisodes: [],
  unlockedClues: [],
  disarmedTrapsCount: 0,
  isGuest: true,
};

const STORAGE_KEY = 'detlan_detective_profile';

export function getLocalProfile(): DetectiveProfile {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      // Clean up any old mock data
      if (
        !parsed.email ||
        parsed.email.includes('detlan.app') || 
        parsed.id === 'guest-detective-007' ||
        parsed.name === 'Детектив Google' ||
        parsed.name === 'Еркюль Пуаро' ||
        parsed.email === 'investigator.google@detlan.app'
      ) {
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_GUEST_PROFILE;
      }
      return parsed;
    } catch {
      // ignore
    }
  }
  return DEFAULT_GUEST_PROFILE;
}

export function saveLocalProfile(profile: DetectiveProfile) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

// Subscribe to Supabase Auth state changes (including Google OAuth redirect back)
export function subscribeToAuthChanges(onProfileChange: (profile: DetectiveProfile) => void) {
  if (!supabase) return () => {};

  // Check initial session
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      handleUserSession(session.user, onProfileChange);
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  });

  // Listen to OAuth redirects, sign-in, sign-out
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      handleUserSession(session.user, onProfileChange);
      if (window.location.hash.includes('access_token')) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else if (event === 'SIGNED_OUT') {
      localStorage.removeItem(STORAGE_KEY);
      onProfileChange(DEFAULT_GUEST_PROFILE);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}

function handleUserSession(user: any, onProfileChange: (profile: DetectiveProfile) => void) {
  // Use a user-specific storage key so each Google account has their own isolated progress
  const userKey = `detlan_profile_${user.id}`;
  const savedUserData = localStorage.getItem(userKey);
  
  let existing: DetectiveProfile | null = null;
  if (savedUserData) {
    try {
      existing = JSON.parse(savedUserData);
    } catch {
      // ignore
    }
  }

  // Real Google display name and photo
  const googleName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split('@')[0] ||
    'Детектив';

  const googleAvatar =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.picture ||
    '🕵️‍♂️';

  const profile: DetectiveProfile = {
    id: user.id,
    email: user.email || '',
    name: googleName,
    avatar: googleAvatar,
    xp: existing ? existing.xp : 0,
    streak: existing ? existing.streak : 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
    alibiCount: existing ? existing.alibiCount : 0,
    completedEpisodes: existing ? existing.completedEpisodes : [],
    unlockedClues: existing ? existing.unlockedClues : [],
    disarmedTrapsCount: existing ? existing.disarmedTrapsCount : 0,
    isGuest: false,
  };

  localStorage.setItem(userKey, JSON.stringify(profile));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  onProfileChange(profile);
}

export function resetUserProfile(userId: string): DetectiveProfile {
  const current = getLocalProfile();
  const resetProfile: DetectiveProfile = {
    ...current,
    id: userId,
    xp: 0,
    streak: 0,
    alibiCount: 0,
    completedEpisodes: [],
    unlockedClues: [],
    disarmedTrapsCount: 0,
  };
  localStorage.setItem(`detlan_profile_${userId}`, JSON.stringify(resetProfile));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resetProfile));
  return resetProfile;
}

// Google OAuth Login - REAL GOOGLE AUTH ONLY
export async function signInWithGoogle() {
  if (!supabase) {
    throw new Error(
      'У Vercel не налаштовано змінні Supabase! Будь ласка, перейдіть у Vercel -> Settings -> Environment Variables, додайте VITE_SUPABASE_URL та VITE_SUPABASE_ANON_KEY і зробіть Redeploy.'
    );
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

export async function signInWithEmail(email: string, _pass: string) {
  if (!supabase) {
    throw new Error('Supabase не підключено! Додайте змінні середовища у Vercel.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: _pass,
  });

  if (error) throw error;
  return data;
}

export async function signUpWithEmail(email: string, _pass: string, name?: string) {
  if (!supabase) {
    throw new Error('Supabase не підключено! Додайте змінні середовища у Vercel.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password: _pass,
    options: {
      data: { full_name: name || 'Детектив' }
    }
  });

  if (error) throw error;
  return data;
}

export async function signOutUser() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(STORAGE_KEY);
}
