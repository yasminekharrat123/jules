import clsx from "clsx"
import { Field as FormikField } from "formik"

interface FieldProps {
  name: string
  label: string
  type?: string
  className?: string
}

const Field = (props: FieldProps) => {
  const { name, label, type = "text", className } = props

  return (
    <div className={clsx("flex flex-col items-center gap-2", className)}>
      <label htmlFor={name} className="text-xl font-semibold">
        {label}
      </label>
      <FormikField
        type={type}
        name={name}
        className="border-2 border-gray-300 py-1 text-center text-slate-800"
      />
    </div>
  )
}

export default Field
