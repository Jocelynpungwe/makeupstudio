import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SmoothScroll from './components/layout/SmoothScroll'
import ScrollManager from './components/layout/ScrollManager'
import Header from './components/layout/Header'
import Cursor from './components/layout/Cursor'
import Home from './pages/Home'

// Secondary pages load on demand; the home page carries the experience.
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <SmoothScroll>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <Cursor />
      <Suspense fallback={<div className="min-h-[100svh] bg-ivory" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </SmoothScroll>
  )
}
