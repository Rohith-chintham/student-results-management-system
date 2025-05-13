
import { Result } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface StudentResultListProps {
  results: Result[];
}

const StudentResultList = ({ results }: StudentResultListProps) => {
  // Sort by exam date, most recent first
  const sortedResults = [...results].sort(
    (a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedResults.length > 0 ? (
        sortedResults.map((result) => (
          <Card key={result.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{result.examType} Examination</CardTitle>
                  <CardDescription>
                    Exam Date: {new Date(result.examDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Percentage: {result.percentage}%
                  </div>
                  <div>
                    <span
                      className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${
                        result.grade === "F"
                          ? "bg-red-100 text-red-700"
                          : result.grade.startsWith("A")
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      Grade: {result.grade}
                    </span>
                    {result.rank && (
                      <span className="ml-2 inline-block rounded bg-purple-100 text-purple-700 px-2 py-0.5 text-xs font-medium">
                        Rank: {result.rank}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <Progress
                  value={result.percentage}
                  className="h-2"
                />
              </div>

              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="subjects">
                  <AccordionTrigger>Subject-wise Results</AccordionTrigger>
                  <AccordionContent>
                    <div className="results-table-container mt-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Subject</TableHead>
                            <TableHead className="text-right">Marks</TableHead>
                            <TableHead className="text-right">Grade</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {result.subjects.map((subject) => (
                            <TableRow key={subject.subjectId}>
                              <TableCell>{subject.subjectName}</TableCell>
                              <TableCell className="text-right">
                                {subject.marksObtained} / {subject.fullMarks}
                              </TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={`inline-block rounded px-2 py-0.5 text-xs ${
                                    subject.grade === "F"
                                      ? "bg-red-100 text-red-700"
                                      : subject.grade.startsWith("A")
                                      ? "bg-green-100 text-green-700"
                                      : "bg-blue-100 text-blue-700"
                                  }`}
                                >
                                  {subject.grade}
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                          <TableRow>
                            <TableCell className="font-medium">Total</TableCell>
                            <TableCell className="text-right font-medium">
                              {result.totalMarks} /{" "}
                              {result.subjects.reduce(
                                (sum, subject) => sum + subject.fullMarks,
                                0
                              )}
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              <span
                                className={`inline-block rounded px-2 py-1 text-xs ${
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
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {result.remarks && (
                <div className="mt-4 text-sm">
                  <span className="font-medium">Remarks:</span>{" "}
                  <span
                    className={
                      result.remarks === "Pass"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {result.remarks}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-muted-foreground">
              No results available for this student.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StudentResultList;
