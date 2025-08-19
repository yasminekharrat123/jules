import Button from "@/components/ui/button"
import Link from "next/link"

const StudentNotFoundPage = () => (
  <div className="mt-10 flex flex-col items-center justify-center">
    <h1 className="text-2xl font-bold text-red-600">Student not found</h1>
    <p className="text-lg">The student you are looking for does not exist.</p>
    <Button as={Link} href="/" className="mt-4">
      Go back to the home page
    </Button>
  </div>
)

export default StudentNotFoundPage
