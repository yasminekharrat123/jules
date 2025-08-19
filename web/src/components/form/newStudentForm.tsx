import Form from "./form"

const fields = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "age", label: "Age", type: "number" },
]
const initialValues = {
  firstName: "",
  lastName: "",
  age: "",
}

interface NewStudentFormProps {
  onSubmit: (values: Record<string, string | number>) => Promise<void>
}

const NewStudentForm = (props: NewStudentFormProps) => {
  const { onSubmit } = props

  return (
    <Form
      initialValues={initialValues}
      fields={fields}
      title="New Student"
      onSubmit={onSubmit}
    />
  )
}

export default NewStudentForm
