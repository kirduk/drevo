interface IconProps {
  className?: string
}

export function AvitoIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="7" cy="7" r="5.5" fill="#97CF26" />
      <circle cx="17" cy="7" r="5.5" fill="#00AAFF" />
      <circle cx="7" cy="17" r="5.5" fill="#FF6163" />
      <circle cx="17" cy="17" r="5.5" fill="#A169F7" />
    </svg>
  )
}

export function OzonIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#005BFF" />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fill="#fff"
        fontSize="7.5"
        fontWeight="700"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        OZON
      </text>
    </svg>
  )
}
