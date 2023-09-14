import styles from '../icons.module.scss'

type Props = {
  width: number
  height: number
  handleClick: () => void
}

export default function CircleIcon({ width, height, handleClick }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styles.icon}
      width={width}
      height={height}
      viewBox="0 0 50 50"
      onClick={handleClick}
      data-testid="circle-icon"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="transparent"
        strokeWidth="3"
        stroke="currentColor"
      />
    </svg>
  )
}
