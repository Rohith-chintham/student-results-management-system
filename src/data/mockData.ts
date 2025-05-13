
import { Student, Result, Subject } from "@/types";

export const subjects: Subject[] = [
  {
    id: "sub1",
    name: "Mathematics",
    code: "MAT101",
    fullMarks: 100,
    passMarks: 40,
  },
  {
    id: "sub2",
    name: "Science",
    code: "SCI101",
    fullMarks: 100,
    passMarks: 40,
  },
  {
    id: "sub3",
    name: "English",
    code: "ENG101",
    fullMarks: 100,
    passMarks: 40,
  },
  {
    id: "sub4",
    name: "Social Studies",
    code: "SOC101",
    fullMarks: 100,
    passMarks: 40,
  },
  {
    id: "sub5",
    name: "Computer Science",
    code: "CS101",
    fullMarks: 100,
    passMarks: 40,
  },
];

export const students: Student[] = [
  {
    id: "st1",
    name: "John Smith",
    rollNumber: "2023001",
    class: "10",
    section: "A",
    gender: "male",
    email: "john.smith@example.com",
    contact: "123-456-7890",
    address: "123 School St, Cityville",
    dateOfBirth: "2006-05-12",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "st2",
    name: "Emily Johnson",
    rollNumber: "2023002",
    class: "10",
    section: "A",
    gender: "female",
    email: "emily.johnson@example.com",
    contact: "123-456-7891",
    address: "456 College Rd, Townsburg",
    dateOfBirth: "2006-03-22",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "st3",
    name: "Michael Chen",
    rollNumber: "2023003",
    class: "10",
    section: "B",
    gender: "male",
    email: "michael.chen@example.com",
    contact: "123-456-7892",
    address: "789 University Ave, Academyville",
    dateOfBirth: "2006-08-15",
    profilePicture: "https://randomuser.me/api/portraits/men/62.jpg",
  },
  {
    id: "st4",
    name: "Sophia Rodriguez",
    rollNumber: "2023004",
    class: "10",
    section: "B",
    gender: "female",
    email: "sophia.rodriguez@example.com",
    contact: "123-456-7893",
    address: "101 Learning Lane, Schooltown",
    dateOfBirth: "2006-11-30",
    profilePicture: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: "st5",
    name: "David Wilson",
    rollNumber: "2023005",
    class: "11",
    section: "A",
    gender: "male",
    email: "david.wilson@example.com",
    contact: "123-456-7894",
    address: "202 Education Blvd, Learnington",
    dateOfBirth: "2005-02-18",
    profilePicture: "https://randomuser.me/api/portraits/men/91.jpg",
  },
  {
    id: "st6",
    name: "Olivia Brown",
    rollNumber: "2023006",
    class: "11",
    section: "A",
    gender: "female",
    email: "olivia.brown@example.com",
    contact: "123-456-7895",
    address: "303 Knowledge Dr, Wisdomville",
    dateOfBirth: "2005-06-07",
    profilePicture: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

export const calculateGrade = (percentage: number): string => {
  if (percentage >= 90) return "A+";
  if (percentage >= 80) return "A";
  if (percentage >= 70) return "B+";
  if (percentage >= 60) return "B";
  if (percentage >= 50) return "C+";
  if (percentage >= 40) return "C";
  return "F";
};

export const generateResults = (): Result[] => {
  const results: Result[] = [];

  students.forEach((student) => {
    // Generate Midterm results
    const midtermSubjects = subjects.map((subject) => {
      const marksObtained = Math.floor(Math.random() * (subject.fullMarks - subject.passMarks + 1)) + subject.passMarks;
      const percentage = (marksObtained / subject.fullMarks) * 100;
      
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        marksObtained,
        fullMarks: subject.fullMarks,
        passMarks: subject.passMarks,
        grade: calculateGrade(percentage),
      };
    });

    const midtermTotalMarks = midtermSubjects.reduce((total, subject) => total + subject.marksObtained, 0);
    const midtermTotalPossible = midtermSubjects.reduce((total, subject) => total + subject.fullMarks, 0);
    const midtermPercentage = (midtermTotalMarks / midtermTotalPossible) * 100;

    results.push({
      id: `mid-${student.id}`,
      studentId: student.id,
      examType: "Midterm",
      examDate: "2023-06-15",
      subjects: midtermSubjects,
      totalMarks: midtermTotalMarks,
      percentage: parseFloat(midtermPercentage.toFixed(2)),
      grade: calculateGrade(midtermPercentage),
      remarks: midtermPercentage >= 40 ? "Pass" : "Fail",
    });

    // Generate Final results
    const finalSubjects = subjects.map((subject) => {
      const marksObtained = Math.floor(Math.random() * (subject.fullMarks - subject.passMarks + 1)) + subject.passMarks;
      const percentage = (marksObtained / subject.fullMarks) * 100;
      
      return {
        subjectId: subject.id,
        subjectName: subject.name,
        marksObtained,
        fullMarks: subject.fullMarks,
        passMarks: subject.passMarks,
        grade: calculateGrade(percentage),
      };
    });

    const finalTotalMarks = finalSubjects.reduce((total, subject) => total + subject.marksObtained, 0);
    const finalTotalPossible = finalSubjects.reduce((total, subject) => total + subject.fullMarks, 0);
    const finalPercentage = (finalTotalMarks / finalTotalPossible) * 100;

    results.push({
      id: `final-${student.id}`,
      studentId: student.id,
      examType: "Final",
      examDate: "2023-12-10",
      subjects: finalSubjects,
      totalMarks: finalTotalMarks,
      percentage: parseFloat(finalPercentage.toFixed(2)),
      grade: calculateGrade(finalPercentage),
      remarks: finalPercentage >= 40 ? "Pass" : "Fail",
    });
  });

  return results;
};

export const results = generateResults();

// Add ranking to final results by class and section
const rankStudentsByClass = () => {
  const classes = [...new Set(students.map((student) => student.class))];
  const sections = [...new Set(students.map((student) => student.section))];
  
  classes.forEach((className) => {
    sections.forEach((section) => {
      const classStudents = students.filter(
        (student) => student.class === className && student.section === section
      );
      
      const classStudentIds = classStudents.map((student) => student.id);
      const classResults = results.filter(
        (result) => 
          classStudentIds.includes(result.studentId) && 
          result.examType === "Final"
      );
      
      // Sort by percentage
      const sortedResults = [...classResults].sort(
        (a, b) => b.percentage - a.percentage
      );
      
      // Assign ranks
      sortedResults.forEach((result, index) => {
        const resultToUpdate = results.find((r) => r.id === result.id);
        if (resultToUpdate) {
          resultToUpdate.rank = index + 1;
        }
      });
    });
  });
};

rankStudentsByClass();

export const getStudentById = (id: string): Student | undefined => {
  return students.find((student) => student.id === id);
};

export const getStudentResults = (studentId: string): Result[] => {
  return results.filter((result) => result.studentId === studentId);
};

export const getPassFailStats = () => {
  const finalResults = results.filter((result) => result.examType === "Final");
  const totalStudents = finalResults.length;
  const passStudents = finalResults.filter((result) => result.percentage >= 40).length;
  const failStudents = totalStudents - passStudents;
  
  return {
    totalStudents,
    passStudents,
    failStudents,
    passPercentage: (passStudents / totalStudents) * 100,
    failPercentage: (failStudents / totalStudents) * 100,
  };
};

export const getGradeDistribution = () => {
  const finalResults = results.filter((result) => result.examType === "Final");
  const gradeCount: Record<string, number> = {
    "A+": 0,
    "A": 0,
    "B+": 0,
    "B": 0, 
    "C+": 0,
    "C": 0,
    "F": 0,
  };
  
  finalResults.forEach((result) => {
    gradeCount[result.grade] += 1;
  });
  
  return Object.entries(gradeCount).map(([grade, count]) => ({
    grade,
    count,
    percentage: (count / finalResults.length) * 100,
  }));
};
