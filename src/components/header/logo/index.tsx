type Props = {
  className?: string
  width: number
  height: number
}

export default function LogoIcon({ className, width, height }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="-10 10 50 40"
      data-testid="logo-icon"
    >
      <path
        fill="transparent"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        transform="rotate(45 15 25)"
        d="M 5 45 H 25 V 5"
      />
    </svg>
  )
}
