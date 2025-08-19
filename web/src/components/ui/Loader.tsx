import React from "react"

interface LoaderProps {
  size?: number
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
  size = 40,
  className = "",
}) => (
  <div className={`inline-flex items-center justify-center ${className}`}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      className="animate-spin"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#dc2626"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="31.416"
        strokeDashoffset="31.416"
        className="animate-pulse"
      >
        <animate
          attributeName="stroke-dasharray"
          dur="2s"
          values="0 31.416;15.708 15.708;0 31.416"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke-dashoffset"
          dur="2s"
          values="0;-15.708;-31.416"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
)

export default Loader
