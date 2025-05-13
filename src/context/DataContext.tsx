
import { createContext, useContext, ReactNode, useState } from 'react';
import { Student, Result, Subject } from '@/types';
import { 
  students as mockStudents, 
  results as mockResults, 
  subjects as mockSubjects,
  getStudentById as getMockStudentById,
  getStudentResults as getMockStudentResults,
  getPassFailStats as getMockPassFailStats,
  getGradeDistribution as getMockGradeDistribution,
  calculateGrade
} from '@/data/mockData';

interface DataContextType {
  students: Student[];
  results: Result[];
  subjects: Subject[];
  getStudentById: (id: string) => Student | undefined;
  getStudentResults: (studentId: string) => Result[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  addResult: (result: Omit<Result, 'id'>) => void;
  updateResult: (result: Result) => void;
  getPassFailStats: () => {
    totalStudents: number;
    passStudents: number;
    failStudents: number;
    passPercentage: number;
    failPercentage: number;
  };
  getGradeDistribution: () => Array<{
    grade: string;
    count: number;
    percentage: number;
  }>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [results, setResults] = useState<Result[]>(mockResults);
  const [subjects] = useState<Subject[]>(mockSubjects);

  const getStudentById = (id: string) => {
    return getMockStudentById(id);
  };

  const getStudentResults = (studentId: string) => {
    return getMockStudentResults(studentId);
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = {
      ...student,
      id: `st${students.length + 1}`,
    };
    setStudents([...students, newStudent]);
  };

  const updateStudent = (student: Student) => {
    setStudents(students.map(s => s.id === student.id ? student : s));
  };

  const addResult = (result: Omit<Result, 'id'>) => {
    const newResult = {
      ...result,
      id: `result-${results.length + 1}`,
    };
    setResults([...results, newResult]);
  };

  const updateResult = (result: Result) => {
    setResults(results.map(r => r.id === result.id ? result : r));
  };

  const getPassFailStats = () => {
    return getMockPassFailStats();
  };

  const getGradeDistribution = () => {
    return getMockGradeDistribution();
  };

  return (
    <DataContext.Provider
      value={{
        students,
        results,
        subjects,
        getStudentById,
        getStudentResults,
        addStudent,
        updateStudent,
        addResult,
        updateResult,
        getPassFailStats,
        getGradeDistribution,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
