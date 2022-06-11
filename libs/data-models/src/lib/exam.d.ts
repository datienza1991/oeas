import { QuestionList } from "./question-list";

export interface Exam{
    id : number,
    name: string,
    subject: string,
    startOn: string,
    duration: number,
    passers: string,
    department: string,
    facultyName: string,
    isActive: boolean,
    instructions : string,
    sectionId: number,
    questions: QuestionList[]
}