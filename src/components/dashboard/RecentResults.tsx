
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";

const RecentResults = () => {
  const { results, getStudentById } = useData();

  const recentResults = results
    .slice()
    .sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime())
    .slice(0, 5)
    .map(result => {
      const student = getStudentById(result.studentId);
      return {
        id: student?.id,
        name: student?.name,
        class: student?.class,
        section: student?.section,
        examType: result.examType,
        examDate: result.examDate,
        percentage: result.percentage,
        grade: result.grade,
      };
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentResults.map((result) => (
            <div
              key={`${result.id}-${result.examType}`}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div>
                <Link 
                  to={`/students/${result.id}`} 
                  className="font-medium hover:underline"
                >
                  {result.name}
                </Link>
                <div className="text-sm text-muted-foreground">
                  Class {result.class}-{result.section}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs ${
                    result.grade === "F" ? "bg-red-100 text-red-700" :
                    result.grade.startsWith("A") ? "bg-green-100 text-green-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {result.examType} - Grade {result.grade}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(result.examDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
          {recentResults.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No recent results
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentResults;
