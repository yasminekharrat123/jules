import type Student from "@/types/student"
import clsx from "clsx"

interface StudentTableProps {
  students: Student[]
  className?: string
}

const StudentTable = (props: StudentTableProps) => {
  const { students, className } = props

  return (
    <table
      className={clsx("border-collapse border border-gray-300", className)}
    >
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 p-2 text-left">First Name</th>
          <th className="border border-gray-300 p-2 text-left">Last Name</th>
          <th className="border border-gray-300 p-2 text-left">Age</th>
          <th className="border border-gray-300 p-2"></th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="border border-gray-300">
            <td className="border border-gray-300 p-2 text-lg">
              {student.firstName}
            </td>
            <td className="border border-gray-300 p-2 text-lg">
              {student.lastName}
            </td>
            <td className="border border-gray-300 p-2 text-lg">
              {student.age}
            </td>
            <td className="border border-gray-300 p-2">
              <button className="rounded-md bg-red-600 p-2 text-white">
                See profile
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StudentTable
