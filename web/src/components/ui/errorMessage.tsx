import clsx from "clsx"

interface ErrorMessageProps {
  message: string
  className?: string
}

const ErrorMessage = (props: ErrorMessageProps) => {
  const { message, className } = props

  return (
    <div
      className={clsx("text-center text-2xl font-bold text-red-600", className)}
    >
      {message}
    </div>
  )
}

export default ErrorMessage
