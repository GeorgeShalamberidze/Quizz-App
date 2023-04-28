export interface Question {
  id: number;
  title: string;
  correctOptionId: number;
  options: Option[];
}

interface Option {
  id: number;
  questionId: number;
  name: string;
}
