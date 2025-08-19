import clsx from "clsx"

interface ButtonProps {
  children?: React.ReactNode
  className?: string
  color?: "red" | "blue" | "green" | "yellow"
  as?: React.ElementType
  disabled?: boolean
  onClick?: () => unknown
}

const Button = (props: ButtonProps & Record<string, unknown>) => {
  const {
    children,
    className,
    color = "red",
    as: As = "button",
    disabled,
    onClick,
    ...rest
  } = props
  const colorClasses = {
    red: "bg-red-600 hover:bg-red-700 focus:bg-red-700",
    blue: "bg-blue-600 hover:bg-blue-700 focus:bg-blue-700",
    green: "bg-green-600 hover:bg-green-700 focus:bg-green-700",
    yellow: "bg-yellow-600 hover:bg-yellow-700 focus:bg-yellow-700",
  }

  return (
    <As
      className={clsx(
        "rounded-md px-4 py-2 text-white transition-colors duration-200",
        colorClasses[color],
        disabled && "cursor-not-allowed opacity-50 hover:bg-current",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </As>
  )
}

export default Button
