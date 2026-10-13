import { ScrollTrigger } from './gsap'
import { HERO_FILM } from '../data/hero.generated'

/**
 * Scroll-scrubbed film engine.
 *
 * Rules this follows (each one prevents a real bug):
 *  - The film is fetched as a Blob (streamed, with progress) so seeking works on hosts without Range support.
 *  - The displayed time EASES toward the scroll target with a dt-normalised lerp, and the loop RESTS when
 *    converged or when the hero is off screen. It never free-runs.
 *  - Seeks are gated: never write currentTime while a previous seek is in flight (coalesce to the newest target).
 *  - DOM writes are delta-gated, so converged captions cost nothing.
 *  - Only transform and opacity are driven.
 *  - The page is complete and beautiful if the film never loads: the poster stays and captions still play.
 */

/** Caption bands in scroll progress. Paced in scroll distance, not seconds: each beat holds ~130-170vh. */
export const BANDS = [
  { id: 'intro', a: 0, b: 0.09, first: true },
  { id: 'prep', a: 0.12, b: 0.3 },
  { id: 'artistry', a: 0.335, b: 0.53 },
  { id: 'glow', a: 0.565, b: 0.77 },
  { id: 'reveal', a: 0.8, b: 1, last: true },
]

const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
const smoothstep = (p, e0, e1) => {
  const t = clamp((p - e0) / (e1 - e0))
  return t * t * (3 - 2 * t)
}

export function createHeroEngine({ mode, section, video, canvas, poster, bandEls, railEls, ringEl, stage }) {
  const S = { target: 0, shown: 0, raf: null, last: 0, onScreen: true, destroyed: false, loadStart: performance.now() }
  const cleanups = []
  const bandCache = bandEls.map(() => ({ o: -1, k: -1, vis: null }))
  let railActive = -2

  /* ------------------------------------------------------------ captions */
  function updateCaptions(p, loadK) {
    for (let i = 0; i < BANDS.length; i++) {
      const el = bandEls[i]
      if (!el) continue
      const { a, b, first, last } = BANDS[i]
      const f = Math.min(0.02, (b - a) / 3)
      let o = smoothstep(p, a, a + f) * (1 - smoothstep(p, b - f, b))
      if (first) o = 1 - smoothstep(p, b - f, b) // the journey opens with words already settled
      if (last) o = smoothstep(p, a, a + f) // ...and ends with them settled
      const ramp = Math.min(0.025, (b - a) * 0.35)
      let k = clamp((p - a) / ramp)
      if (first) k = loadK // one-time, time-based assembly on load, then it simply fades

      const c = bandCache[i]
      if (Math.abs(o - c.o) > 0.004 || (o === 0 && c.o !== 0) || (o === 1 && c.o !== 1)) {
        c.o = o
        el.style.setProperty('--o', o.toFixed(3))
      }
      if (Math.abs(k - c.k) > 0.008 || (k === 1 && c.k !== 1) || (k === 0 && c.k !== 0)) {
        c.k = k
        el.style.setProperty('--k', k.toFixed(3))
      }
      const vis = o > 0.01
      if (vis !== c.vis) {
        c.vis = vis
        el.style.visibility = vis ? 'visible' : 'hidden'
      }
    }

    let active = -1
    for (let i = 1; i < BANDS.length; i++) if (p >= BANDS[i].a - 0.01) active = i - 1
    if (active !== railActive) {
      railActive = active
      railEls.forEach((r, i) => r && (r.dataset.active = String(i === active)))
    }
  }

  /* ------------------------------------------------------------ video seek (gated) */
  let seekBusy = false
  let pendingTime = null
  const requestSeek = (t) => {
    if (!video || !video.duration) return
    if (seekBusy) {
      pendingTime = t
      return
    }
    seekBusy = true
    video.currentTime = t
  }
  const onSeeked = () => {
    seekBusy = false
    if (pendingTime !== null) {
      const t = pendingTime
      pendingTime = null
      requestSeek(t)
    }
  }
  const onVideoError = () => {
    seekBusy = false
    pendingTime = null
    fail()
  }

  /* ------------------------------------------------------------ frame sequence (phones) */
  const N = HERO_FILM.seqFrames
  const frames = new Array(N)
  let loadedCount = 0
  let lastDrawn = -1
  const ctx2d = canvas ? canvas.getContext('2d', { alpha: false }) : null

  const nearest = (i) => {
    if (frames[i]) return frames[i]
    for (let d = 1; d < N; d++) {
      if (frames[i - d]) return frames[i - d]
      if (frames[i + d]) return frames[i + d]
    }
    return null
  }
  function drawSeq(p) {
    if (!ctx2d) return
    const pos = clamp(p) * (N - 1)
    if (Math.abs(pos - lastDrawn) < 0.01) return
    lastDrawn = pos
    const i0 = Math.floor(pos)
    const f = pos - i0
    const a = nearest(i0)
    if (!a) return
    ctx2d.globalAlpha = 1
    ctx2d.drawImage(a, 0, 0, canvas.width, canvas.height)
    const b = i0 + 1 < N ? nearest(i0 + 1) : null
    if (b && f > 0.03 && b !== a) {
      ctx2d.globalAlpha = f
      ctx2d.drawImage(b, 0, 0, canvas.width, canvas.height)
      ctx2d.globalAlpha = 1
    }
  }

  /* ------------------------------------------------------------ the loop */
  function tick(now) {
    if (S.destroyed) return
    const dt = Math.min(100, now - (S.last || now))
    S.last = now
    const k = 0.16 // smoothing per 60fps frame
    S.shown += (S.target - S.shown) * (1 - Math.pow(1 - k, dt / 16.667))

    const loadT = clamp((now - S.loadStart - 200) / 1500)
    const loadK = 1 - Math.pow(1 - loadT, 3)

    const converged = Math.abs(S.target - S.shown) < 0.0005
    if (converged) S.shown = S.target

    if (mode === 'video' && video && video.duration) requestSeek(Math.min(S.shown * video.duration, video.duration - 0.04))
    if (mode === 'sequence') drawSeq(S.shown)
    updateCaptions(S.shown, loadK)

    if (converged && loadT >= 1) {
      S.raf = null
      S.last = 0
    } else S.raf = requestAnimationFrame(tick)
  }
  const wake = () => {
    if (S.raf === null && !S.destroyed) S.raf = requestAnimationFrame(tick)
  }

  /* ------------------------------------------------------------ loading */
  const setRing = (frac) => ringEl?.style.setProperty('--ld', String(Math.round(126 * (1 - clamp(frac)))))
  const ringWrap = () => ringEl?.closest('[data-ring]')
  function ready() {
    if (S.destroyed) return
    stage.classList.add('hero-ready')
    ringWrap()?.setAttribute('data-done', 'true')
    lastDrawn = -1
    wake()
  }
  function fail() {
    if (S.destroyed) return
    stage.classList.add('hero-failed')
    stage.classList.remove('hero-ready')
    ringWrap()?.setAttribute('data-done', 'true')
  }

  const lowData = typeof navigator !== 'undefined' && navigator.connection && (navigator.connection.saveData || /(^|-)2g$/.test(navigator.connection.effectiveType || ''))

  async function loadVideo() {
    if (lowData) return fail() // poster + captions only, honoring Save-Data
    const small = window.innerWidth <= 1280 || (navigator.connection && /3g/.test(navigator.connection.effectiveType || ''))
    const url = small ? '/media/hero/hero-scrub-720.mp4' : '/media/hero/hero-scrub-1080.mp4'
    const bytes = HERO_FILM.videoBytes[small ? '720' : '1080']
    const ctrl = new AbortController()
    cleanups.push(() => ctrl.abort())
    let watchdog = setTimeout(() => ctrl.abort(), 20000)
    try {
      const res = await fetch(url, { signal: ctrl.signal, priority: 'low' })
      if (!res.ok || !res.body) throw new Error('bad response')
      const total = Number(res.headers.get('Content-Length')) || bytes
      const reader = res.body.getReader()
      const chunks = []
      let got = 0
      let lastRing = 0
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        clearTimeout(watchdog)
        watchdog = setTimeout(() => ctrl.abort(), 20000) // 20s with no progress aborts to the poster
        chunks.push(value)
        got += value.length
        const now = performance.now()
        if (now - lastRing > 100 || got >= total) {
          lastRing = now
          setRing(got / total)
        }
      }
      clearTimeout(watchdog)
      setRing(1)
      const objectUrl = URL.createObjectURL(new Blob(chunks, { type: 'video/mp4' }))
      cleanups.push(() => URL.revokeObjectURL(objectUrl))
      video.src = objectUrl
      video.load()
      video.addEventListener(
        'loadeddata',
        () => {
          requestSeek(S.target * video.duration)
          ready()
        },
        { once: true },
      )
    } catch {
      clearTimeout(watchdog)
      fail()
    }
  }

  async function loadSequence() {
    const seen = new Set()
    const build = (steps) => {
      const list = []
      for (const step of steps)
        for (let i = 0; i < N; i += step)
          if (!seen.has(i)) {
            seen.add(i)
            list.push(i)
          }
      return list
    }
    // Phase 1 (coarse, about 50 frames) is enough to scrub with a soft cross-dissolve. Phase 2 fills in the
    // rest only once the visitor starts scrolling (or after a quiet moment), and never on Save-Data.
    const coarse = build([8, 4])
    if (!seen.has(N - 1)) coarse.push(N - 1)
    seen.add(N - 1)
    const fine = lowData ? [] : build([2, 1])

    let aborted = false
    cleanups.push(() => (aborted = true))

    const loadFrame = async (idx, total) => {
      try {
        const im = new Image()
        im.decoding = 'async'
        im.src = `/media/hero/seq/f${String(idx + 1).padStart(4, '0')}.webp`
        await im.decode()
        frames[idx] = im
      } catch {
        /* a missing frame falls back to its neighbour */
      }
      loadedCount++
      if (total) setRing(loadedCount / total)
      if (loadedCount === 12) ready() // enough coarse frames to scrub, the rest fill in
      if (loadedCount % 6 === 0) {
        lastDrawn = -1
        wake()
      }
    }
    const run = async (list, total) => {
      let cursor = 0
      const worker = async () => {
        while (!aborted) {
          const idx = list[cursor++]
          if (idx === undefined) return
          await loadFrame(idx, total)
        }
      }
      await Promise.all(Array.from({ length: 5 }, worker))
    }

    await run(coarse, coarse.length)
    if (aborted) return
    if (loadedCount < 6) return fail()
    ready()
    lastDrawn = -1
    wake()

    if (fine.length) {
      await new Promise((resolve) => {
        const t = setTimeout(resolve, 4500)
        S.startFine = () => {
          clearTimeout(t)
          resolve()
        }
        cleanups.push(() => clearTimeout(t))
      })
      if (aborted) return
      await run(fine, 0)
      lastDrawn = -1
      wake()
    }
  }

  /* ------------------------------------------------------------ start */
  const st = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: 'bottom bottom',
    onUpdate: (self) => {
      S.target = self.progress
      if (S.startFine) {
        const go = S.startFine
        S.startFine = null
        go() // the visitor has started scrolling: fetch the remaining frames now
      }
      wake()
    },
    onToggle: (self) => {
      S.onScreen = self.isActive
      // the HTML poster is a fixed layer behind the page: stop painting it once the hero is off screen
      if (poster) poster.closest('#boot').style.visibility = self.isActive ? 'visible' : 'hidden'
      wake()
    },
    onRefresh: (self) => {
      S.target = self.progress
      S.shown = self.progress // never animate from a stale position after a resize
      lastDrawn = -1
      wake()
    },
  })
  S.target = st.progress
  S.shown = st.progress

  if (video) {
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onVideoError)
  }
  const onVis = () => !document.hidden && wake()
  document.addEventListener('visibilitychange', onVis)

  // The poster wins the bandwidth race by design: start the heavy load once it has painted
  let started = false
  const begin = () => {
    if (started || S.destroyed) return
    started = true
    if (mode === 'video') loadVideo()
    else loadSequence()
  }
  if (poster && !poster.complete) {
    poster.addEventListener('load', begin, { once: true })
    poster.addEventListener('error', begin, { once: true })
  } else begin()
  const safety = setTimeout(begin, 3500)

  wake()

  return {
    destroy() {
      S.destroyed = true
      if (S.raf !== null) cancelAnimationFrame(S.raf)
      clearTimeout(safety)
      st.kill()
      document.removeEventListener('visibilitychange', onVis)
      if (video) {
        video.removeEventListener('seeked', onSeeked)
        video.removeEventListener('error', onVideoError)
        video.removeAttribute('src')
        video.load()
      }
      cleanups.forEach((fn) => fn())
      stage.classList.remove('hero-ready', 'hero-failed')
      frames.length = 0
    },
  }
}
