export interface IAbsence{
    _id?: string,
    session_id: string,
    course_name: string,
    student_id: string,
    student_full_name: string,
    status: number,
    date: Date,
}
export class Absence implements IAbsence{
    _id?: string
    session_id!: string
    course_name!: string
    student_id!: string
    student_full_name!: string
    status!: number
    date!: Date
}
