
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Plus, File } from "lucide-react";
import { useData } from "@/context/DataContext";

const ResultsList = () => {
  const { results, getStudentById } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [examTypeFilter, setExamTypeFilter] = useState<string>("");
  const [classFilter, setClassFilter] = useState<string>("");

  const filteredResults = results.filter((result) => {
    const student = getStudentById(result.studentId);
    
    if (!student) return false;
    
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesExamType = examTypeFilter ? result.examType === examTypeFilter : true;
    const matchesClass = classFilter ? student.class === classFilter : true;
    
    return matchesSearch && matchesExamType && matchesClass;
  });

  const examTypes = Array.from(new Set(results.map((result) => result.examType)));
  const classes = Array.from(
    new Set(
      results
        .map((result) => getStudentById(result.studentId)?.class)
        .filter(Boolean)
    )
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Exam Results</h2>
          <p className="text-muted-foreground">Manage and view student results</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Result
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Result Summary</CardTitle>
          <CardDescription>Overview of exam results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="student-stats-grid">
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground">Total Results</div>
              <div className="text-2xl font-bold">{results.length}</div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground">Midterm Results</div>
              <div className="text-2xl font-bold">
                {results.filter((r) => r.examType === "Midterm").length}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground">Final Results</div>
              <div className="text-2xl font-bold">
                {results.filter((r) => r.examType === "Final").length}
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <div className="text-muted-foreground">Pass Rate</div>
              <div className="text-2xl font-bold">
                {Math.round(
                  (results.filter((r) => r.percentage >= 40).length /
                    results.length) *
                    100
                )}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search student name..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={examTypeFilter}
            onChange={(e) => setExamTypeFilter(e.target.value)}
          >
            <option value="">All Exam Types</option>
            {examTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          
          <select
            className="border rounded px-3 py-2 text-sm"
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
          >
            <option value="">All Classes</option>
            {classes.map((className) => (
              <option key={className} value={className}>
                Class {className}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="border rounded-md">
        <div className="results-table-container">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Roll Number</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Exam Type</TableHead>
                <TableHead>Exam Date</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => {
                  const student = getStudentById(result.studentId);
                  if (!student) return null;

                  return (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">
                        {student.rollNumber}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {student.profilePicture && (
                            <img
                              src={student.profilePicture}
                              alt={student.name}
                              className="h-6 w-6 rounded-full"
                            />
                          )}
                          <span>{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {student.class}-{student.section}
                      </TableCell>
                      <TableCell>{result.examType}</TableCell>
                      <TableCell>
                        {new Date(result.examDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{result.percentage}%</TableCell>
                      <TableCell>
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs ${
                            result.grade === "F"
                              ? "bg-red-100 text-red-700"
                              : result.grade.startsWith("A")
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {result.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Link to={`/students/${student.id}`}>
                          <Button variant="ghost" size="sm">
                            <File className="h-4 w-4 mr-1" /> View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ResultsList;
