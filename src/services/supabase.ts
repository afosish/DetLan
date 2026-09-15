import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
  id: 'guest-detective-007',
  email: 'detective.poirot@detlan.app',
  name: 'Еркюль Пуаро',
  avatar: '🕵️‍♂️',
  xp: 45, // starts with preliminary clues
  streak: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  alibiCount: 2, // 2 free alibis for peace of mind
  completedEpisodes: [],
  unlockedClues: ['hotel_key_note'],
  disarmedTrapsCount: 1,
  isGuest: true,
};

const STORAGE_KEY = 'detlan_detective_profile';

export function getLocalProfile(): DetectiveProfile {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
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
    }
  });

  // Listen to OAuth redirects, sign-in, sign-out
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      handleUserSession(session.user, onProfileChange);
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}

function handleUserSession(user: any, onProfileChange: (profile: DetectiveProfile) => void) {
  const existing = getLocalProfile();
  const isSameUser = existing.id === user.id;

  const profile: DetectiveProfile = {
    id: user.id,
    email: user.email || existing.email,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Детектив',
    avatar: user.user_metadata?.avatar_url || '🕵️‍♂️',
    xp: isSameUser ? existing.xp : 45,
    streak: isSameUser ? existing.streak : 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
    alibiCount: isSameUser ? existing.alibiCount : 2,
    completedEpisodes: isSameUser ? existing.completedEpisodes : [],
    unlockedClues: isSameUser ? existing.unlockedClues : ['hotel_key_note'],
    disarmedTrapsCount: isSameUser ? existing.disarmedTrapsCount : 0,
    isGuest: false,
  };

  saveLocalProfile(profile);
  onProfileChange(profile);
}

// Google OAuth Login
export async function signInWithGoogle() {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) throw error;
    return data;
  } else {
    // Demo fallback when keys are not configured yet
    const guestUser: DetectiveProfile = {
      ...DEFAULT_GUEST_PROFILE,
      name: 'Детектив Google',
      email: 'investigator.google@detlan.app',
      isGuest: false,
    };
    saveLocalProfile(guestUser);
    return { user: guestUser };
  }
}

export async function signInWithEmail(email: string, _pass: string) {
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: _pass,
    });
    if (error) throw error;
    return data;
  } else {
    const profile: DetectiveProfile = {
      ...DEFAULT_GUEST_PROFILE,
      name: email.split('@')[0] || 'Детектив',
      email,
      isGuest: false,
    };
    saveLocalProfile(profile);
    return { user: profile };
  }
}

export async function signUpWithEmail(email: string, _pass: string, name?: string) {
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: _pass,
      options: {
        data: { full_name: name || 'Детектив' }
      }
    });
    if (error) throw error;
    return data;
  } else {
    const profile: DetectiveProfile = {
      ...DEFAULT_GUEST_PROFILE,
      name: name || email.split('@')[0] || 'Новий детектив',
      email,
      isGuest: false,
    };
    saveLocalProfile(profile);
    return { user: profile };
  }
}

export async function signOutUser() {
  if (supabase) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem(STORAGE_KEY);
}
