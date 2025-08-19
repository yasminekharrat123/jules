import Button from "@/components/ui/button"
import clsx from "clsx"
import Link from "next/link"

interface PaginationProps {
  page: number
  baseUrl: string
  className?: string
}

const Pagination = (props: PaginationProps) => {
  const { page, baseUrl, className } = props

  return (
    <div className={clsx("flex gap-5", className)}>
      {page === 1 ? (
        <Button disabled>Previous</Button>
      ) : (
        <Button as={Link} href={`${baseUrl}?page=${page - 1}`}>
          Previous Page
        </Button>
      )}
      <Button as={Link} href={`${baseUrl}?page=${page + 1}`}>
        Next Page
      </Button>
    </div>
  )
}

export default Pagination
