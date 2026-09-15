// Service worker registration
export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          reg.update();
          console.log('[DetLan] Service Worker registered & updated:', reg.scope);
        })
        .catch((err) => {
          console.warn('[DetLan] Service Worker registration failed:', err);
        });
    });
  }
}

