import { getStudentById } from "@/api"
import StudentNotFoundPage from "@/components/students/studentNotFoundPage"
import Button from "@/components/ui/button"
import Table from "@/components/ui/table"
import type Grade from "@/types/grade"
import Link from "next/link"

interface UserProfilePageProps {
  params: { studentId: string }
}

const UserProfilePage = async ({ params }: UserProfilePageProps) => {
  const { studentId } = params

  try {
    const { data: user } = await getStudentById(studentId)

    return (
      <div className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-8 px-4">
        <h2 className="text-center text-3xl font-bold">
          {user.firstName} {user.lastName}
        </h2>
        <Table<Grade>
          headers={["Subject", "Grade"]}
          rows={user.grades}
          displayedProperties={["subject", "grade"]}
          variant="small"
          className="w-full"
        />
        <div className="flex w-full justify-end px-4">
          <Button as={Link} href={`/add/grade/${studentId}`}>
            Add Grade
          </Button>
        </div>
      </div>
    )
  } catch (error) {
    return <StudentNotFoundPage />
  }
}

export default UserProfilePage
