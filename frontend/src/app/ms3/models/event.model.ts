export interface IEvent{
    _id?: string,
    title: string, 
    description: string, 
    image_name: string, 
    level: string, 
    years: string[],
    yearsNames: string[],
    date: Date, 
    start_time:string,
    end_time: string
}
export class Event implements IEvent{
    _id?: string
    title!: string 
    description!: string 
    image_name!: string
    level!: string
    years!: string[]
    yearsNames!: string[]
    date!: Date
    start_time!:string
    end_time!: string
}

