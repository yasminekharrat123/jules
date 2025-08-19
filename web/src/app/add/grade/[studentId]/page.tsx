"use client"

import { addGrade, getStudentById } from "@/api"
import NewGradeForm from "@/components/form/newGrad"
import StudentNotFoundPage from "@/components/students/studentNotFoundPage"
import ErrorMessage from "@/components/ui/errorMessage"
import Loader from "@/components/ui/Loader"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AddGradePageProps {
  params: { studentId: string }
}

const AddGradePage = ({ params }: AddGradePageProps) => {
  const { studentId } = params
  const [studentFound, setStudentFound] = useState<boolean | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const handleSubmit = async (values: Record<string, string | number>) => {
    try {
      await addGrade(studentId, values)
      router.push(`/student/${studentId}`)
      router.refresh()
    } catch (_error: unknown) {
      setError("Failed to add grade")
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        await getStudentById(studentId)
        setStudentFound(true)
        setLoading(false)
      } catch (_error: unknown) {
        setStudentFound(false)
        setLoading(false)
      }
    })().catch((_error: unknown) => {
      setStudentFound(false)
      setLoading(false)
    })
  }, [studentId])

  return (
    <div className="mx-auto mt-10 max-w-xl justify-center">
      {error && <ErrorMessage message={error} className="mb-10" />}
      {loading && (
        <div className="flex min-h-[200px] items-center justify-center">
          <Loader />
        </div>
      )}
      {studentFound && <NewGradeForm onSubmit={handleSubmit} />}
      {studentFound === false && !loading && <StudentNotFoundPage />}
    </div>
  )
}

export default AddGradePage
