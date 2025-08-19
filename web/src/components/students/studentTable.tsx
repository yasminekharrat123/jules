import Button from "@/components/ui/button"
import Table from "@/components/ui/table"
import type Student from "@/types/student"
import Link from "next/link"

interface StudentTableProps {
  students: Student[]
  className?: string
}

const StudentTable = (props: StudentTableProps) => {
  const { students, className } = props
  const renderAction = (student: Student) => (
    <Button as={Link} href={`/student/${student.id}`} color="red">
      See profile
    </Button>
  )

  return (
    <Table<Student>
      headers={["First Name", "Last Name", "Age", ""]}
      rows={students}
      displayedProperties={["firstName", "lastName", "age"]}
      className={className}
      action={renderAction}
      variant="large"
    />
  )
}

export default StudentTable
