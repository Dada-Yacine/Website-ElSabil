export interface IClassroom{
    _id?: string,
    name: string
}
export class Classroom implements IClassroom{
    _id?: string
    name!: string
}

