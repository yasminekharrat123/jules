import TableDiv from "@/components/ui/tableDiv"

interface TableProps<T extends object> {
  headers: string[]
  rows: T[]
  displayedProperties: Array<keyof T>
  className?: string
  action?: React.ReactNode | ((row: T) => React.ReactNode)
  variant?: "small" | "large"
}

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    headers,
    rows,
    displayedProperties,
    className,
    action,
    variant = "large",
  } = props

  return (
    <table className={className}>
      <thead className="bg-red-200">
        <tr>
          {headers.map((header) => (
            <TableDiv
              as="th"
              key={header}
              className={variant === "large" ? "px-8 py-4" : "px-4 py-4"}
            >
              {header}
            </TableDiv>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {displayedProperties.map((property) => (
              <TableDiv
                as="td"
                key={`${rowIndex}-${String(property)}`}
                className={variant === "large" ? "px-8 py-4" : "px-4 py-2"}
              >
                {String(row[property])}
              </TableDiv>
            ))}
            {action && (
              <TableDiv
                as="td"
                key={`${rowIndex}-action`}
                className={variant === "large" ? "px-8 py-4" : "px-4 py-2"}
              >
                {typeof action === "function" ? action(row) : action}
              </TableDiv>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
