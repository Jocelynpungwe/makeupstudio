import { lazy, Suspense, useCallback, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Seo from '../components/seo/Seo'
import HeroScrub from '../sections/HeroScrub'

// The film paints first. Everything after it loads as a separate chunk and mounts progressively.
const Below = lazy(() => import('../sections/Below'))
const Footer = lazy(() => import('../components/layout/Footer'))

export default function Home() {
  const { hash } = useLocation()
  const [done, setDone] = useState(false)
  const onDone = useCallback(() => setDone(true), [])

  return (
    <>
      <Seo path="/" />
      <main id="main" tabIndex={-1} className="outline-none">
        <span id="top" className="absolute left-0 top-0" aria-hidden="true" />
        <HeroScrub />
        <Suspense fallback={null}>
          <Below immediate={!!hash && hash !== '#top'} onDone={onDone} />
        </Suspense>
      </main>
      {done && (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </>
  )
}
