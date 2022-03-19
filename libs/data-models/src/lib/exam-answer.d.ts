export interface ExamAnswer{
    userDetailId: number;
    questionId: number;
    examId: number;
    answer: string;
    points: number | null;
}