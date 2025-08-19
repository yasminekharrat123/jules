"use client"
import Field from "@/components/form/field"
import Button from "@/components/ui/button"
import { Formik, Form as FormikForm } from "formik"

interface FormProps {
  title: string
  initialValues: Record<string, string | number>
  fields: Array<{
    name: string
    label: string
    type?: string
  }>
  onSubmit: (data: Record<string, string | number>) => Promise<void>
}

const Form = (props: FormProps) => {
  const { initialValues, fields, title, onSubmit } = props

  return (
    <div className="flex w-full flex-col gap-7 rounded-lg border-2 border-gray-300 bg-red-600 p-4 text-white">
      <h1 className="text-center text-3xl font-bold">{title}</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <FormikForm className="flex flex-col gap-4">
          {fields.map((field) => (
            <Field key={field.name} {...field} />
          ))}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="mt-3 w-48 border-2 border-gray-300"
            >
              Submit
            </Button>
          </div>
        </FormikForm>
      </Formik>
    </div>
  )
}

export default Form
