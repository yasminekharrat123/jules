import { getStudents } from "@/api"
import StudentTable from "@/components/students/studentTable"
import Button from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import Link from "next/link"

interface HomeProps {
  searchParams: Record<string, string | string[] | undefined>
}

const Home = async ({ searchParams }: HomeProps) => {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { data: students } = await getStudents(page)

  // eslint-disable-next-line no-console
  console.log("hello from home page to test loki logs")
  // The console log is just for the monitoring demo

  return (
    <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-8 px-4">
      <StudentTable students={students} />
      <Button as={Link} href="/add/student">
        Add Student
      </Button>
      <Pagination page={page} baseUrl="/" />
    </div>
  )
}

export default Home
