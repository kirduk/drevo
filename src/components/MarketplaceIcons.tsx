interface IconProps {
  className?: string
}

export function AvitoIcon({ className }: IconProps) {
  return (
    <img
      className={className}
      src="/sources/icons/avito.png"
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  )
}

export function OzonIcon({ className }: IconProps) {
  return (
    <img
      className={className}
      src="/sources/icons/ozon.png"
      alt=""
      aria-hidden="true"
      loading="lazy"
    />
  )
}
