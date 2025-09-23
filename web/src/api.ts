import Student from "@/types/student"
import axios from "axios"
import webConfig from "./config/config"

const api = axios.create({
  baseURL: webConfig.api.url,
})

console.log("Axios baseURL:", webConfig.api.url);

export const getStudents = (page: number) =>
  api.get<Student[]>(`/students?page=${page}`)

export const addStudent = (student: Record<string, string | number>) =>
  api.post("/students", student)

export const getStudentById = (studentId: string) =>
  api.get<Student>(`/students/${studentId}`)

export const addGrade = (
  studentId: string,
  grade: Record<string, string | number>,
) => api.post(`/grades/student/${studentId}`, grade)
