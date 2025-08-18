import Student from "@/types/student"
import axios from "axios"

const Home = async () => {
  const { data: students } = await axios.get<Student[]>(
    "http://localhost:3001/students?page=1",
  )

  return (
    <div className="">
      <h1 className="text-center text-2xl font-bold text-red-500">Home</h1>
      <p>{students.map(({ firstName }) => firstName).join(", ")}</p>
    </div>
  )
}

export default Home
