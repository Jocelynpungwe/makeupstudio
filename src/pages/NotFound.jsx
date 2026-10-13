import Seo from '../components/seo/Seo'
import Footer from '../components/layout/Footer'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" path="/404" noindex />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="grid min-h-[100svh] place-items-center bg-ivory px-[var(--gutter)] py-32 text-center">
          <div>
            <p className="eyebrow mb-6 text-gold-ink">Error 404</p>
            <h1 className="display-xl text-burgundy">
              This page has <em className="italic-accent text-rose-ink">slipped away.</em>
            </h1>
            <p className="lede mx-auto mt-8">The page you were looking for is not here. Let us take you back to the atelier.</p>
            <div className="mt-10">
              <Button to="/#top">Back to home</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
