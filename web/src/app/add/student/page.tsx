"use client"
import { addStudent } from "@/api"
import NewStudentForm from "@/components/form/newStudentForm"
import ErrorMessage from "@/components/ui/errorMessage"
import webConfig from "@/config/config"
import { MILLISECONDS_IN_SECONDS } from "@/constants"
import { useRouter } from "next/navigation"
import { useState } from "react"

const AddStudentPage = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter()
  const handleSubmit = async (values: Record<string, string | number>) => {
    try {
      await addStudent(values)
      router.push("/")
      router.refresh()
    } catch (error) {
      setTimeout(() => {
        setErrorMessage(
          "Failed to add student. Maybe the student already exists?",
        )
      }, webConfig.time.errorMessageDurationInSeconds * MILLISECONDS_IN_SECONDS)
    }
  }

  return (
    <div className="mx-auto mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-8 px-4">
      {errorMessage && <ErrorMessage message={errorMessage} className="mb-4" />}
      <NewStudentForm onSubmit={handleSubmit} />
    </div>
  )
}

export default AddStudentPage
