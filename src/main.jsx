// App shell: the poster in index.html paints first, then the app boots on the next frame.
// This keeps the first paint independent of the JavaScript bundle's parse and evaluation time.
const boot = () => import('./boot.jsx')

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(() => setTimeout(boot, 0)), { once: true })
else requestAnimationFrame(() => setTimeout(boot, 0))
