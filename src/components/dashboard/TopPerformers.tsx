
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/context/DataContext";
import { Link } from "react-router-dom";

const TopPerformers = () => {
  const { results, getStudentById } = useData();

  const topPerformers = results
    .filter(result => result.examType === "Final" && result.rank !== undefined && result.rank <= 5)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0))
    .map(result => {
      const student = getStudentById(result.studentId);
      return {
        id: student?.id,
        name: student?.name,
        class: student?.class,
        section: student?.section,
        percentage: result.percentage,
        grade: result.grade,
        rank: result.rank,
      };
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topPerformers.map((student, index) => (
            <div
              key={student.id}
              className="flex items-center justify-between border-b pb-2 last:border-0"
            >
              <div className="flex items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  index === 0 
                    ? "bg-yellow-100 text-yellow-600" 
                    : index === 1 
                    ? "bg-gray-100 text-gray-600" 
                    : index === 2 
                    ? "bg-amber-100 text-amber-600" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {student.rank}
                </div>
                <div>
                  <Link 
                    to={`/students/${student.id}`} 
                    className="font-medium hover:underline"
                  >
                    {student.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    Class {student.class}-{student.section}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">{student.percentage}%</div>
                <div className="text-sm text-muted-foreground">Grade {student.grade}</div>
              </div>
            </div>
          ))}
          {topPerformers.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              No data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopPerformers;
