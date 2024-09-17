export interface ExamTakerList {
  id: number;
  userDetailId: number;
  examId: number;
  name: string;
  section: string;
  department: string;
  score: string;
  hasRecording: boolean;
  recUrl: string;
}
