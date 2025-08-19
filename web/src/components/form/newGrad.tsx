"use client"
import Form from "./form"

const fields = [
  { name: "subject", label: "Subject" },
  { name: "grade", label: "Grade", type: "number" },
]
const initialValues = {
  subject: "",
  grade: "",
}

interface NewGradeFormProps {
  onSubmit: (values: Record<string, string | number>) => Promise<void>
}

const NewGradeForm = (props: NewGradeFormProps) => {
  const { onSubmit } = props

  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      title="New Grade"
      onSubmit={onSubmit}
    />
  )
}

export default NewGradeForm
