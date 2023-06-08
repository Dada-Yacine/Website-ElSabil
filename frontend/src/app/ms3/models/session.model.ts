export interface ISession{
    _id?: string,
    group_id: string,
    group_name: string,
    course_id: string,
    course_name: string,
    classroom_id:string,
    classroom_name?:string,
    teacher_id: string,
    teacher_full_name: string,
    type: string,
    day: number,
    start_time: string,
    end_time: string
}
export class Session implements ISession{
    _id?: string
    group_id!: string
    group_name!: string
    course_id!: string
    course_name!: string
    classroom_id!:string
    classroom_name?:string
    teacher_id!: string
    teacher_full_name!: string
    type!: string
    day!: number
    start_time!: string
    end_time!: string
}
