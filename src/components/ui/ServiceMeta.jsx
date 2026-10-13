/** Price and duration. Empty values render as an honest placeholder, never an invented number. */
export default function ServiceMeta({ price, duration, className = '' }) {
  return (
    <dl className={`grid grid-cols-2 gap-6 ${className}`}>
      <div>
        <dt className="eyebrow mb-1.5 !text-[0.62rem] opacity-80">Price</dt>
        <dd className="font-display text-[1.15rem] leading-snug">{price || <span className="italic opacity-85">To be confirmed</span>}</dd>
      </div>
      <div>
        <dt className="eyebrow mb-1.5 !text-[0.62rem] opacity-80">Duration</dt>
        <dd className="font-display text-[1.15rem] leading-snug">{duration || <span className="italic opacity-85">To be confirmed</span>}</dd>
      </div>
    </dl>
  )
}
