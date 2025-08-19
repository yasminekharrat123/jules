import Grade from "@/types/grade"

interface Student {
  id: number
  firstName: string
  lastName: string
  age: number
  grades: Grade[]
}

export default Student
