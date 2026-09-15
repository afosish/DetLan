import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Complete synchronous purge of any stale mock account from browser storage
try {
  const keysToPurge: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      const val = localStorage.getItem(key) || '';
      if (
        val.includes('detlan.app') ||
        val.includes('investigator.google') ||
        val.includes('Детектив Google') ||
        val.includes('guest-detective-007')
      ) {
        keysToPurge.push(key);
      }
    }
  }
  keysToPurge.forEach((k) => localStorage.removeItem(k));
} catch {
  // ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

