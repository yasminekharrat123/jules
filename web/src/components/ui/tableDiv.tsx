import clsx from "clsx"

interface TableDivProps {
  children?: React.ReactNode
  className?: string
  as?: React.ElementType
}

const TableDiv = (props: TableDivProps) => {
  const { children, className, as: As = "td" } = props

  return (
    <As
      className={clsx(
        "border border-gray-300 px-4 py-2 text-center",
        className,
      )}
    >
      {children}
    </As>
  )
}

export default TableDiv
