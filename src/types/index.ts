
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  gender: "male" | "female" | "other";
  email: string;
  contact: string;
  address: string;
  dateOfBirth: string;
  profilePicture?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  fullMarks: number;
  passMarks: number;
}

export interface Result {
  id: string;
  studentId: string;
  examType: string;
  examDate: string;
  subjects: {
    subjectId: string;
    subjectName: string;
    marksObtained: number;
    fullMarks: number;
    passMarks: number;
    grade: string;
  }[];
  totalMarks: number;
  percentage: number;
  grade: string;
  rank?: number;
  remarks?: string;
}
