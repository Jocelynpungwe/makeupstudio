import { site } from '../../data/site'

/** Brand lockup. Name and descriptor come from src/data/site.js. */
export default function Wordmark({ className = '', size = 'md' }) {
  const big = size === 'lg'
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display tracking-[-0.01em] ${big ? 'text-[clamp(1.9rem,3.4vw,2.6rem)]' : 'text-[1.55rem]'}`} style={{ fontVariationSettings: '"opsz" 60' }}>
        {site.name}
      </span>
      <span className={`eyebrow mt-1.5 opacity-70 ${big ? '!text-[0.72rem]' : '!text-[0.56rem] !tracking-[0.42em]'}`}>{site.descriptor}</span>
    </span>
  )
}
