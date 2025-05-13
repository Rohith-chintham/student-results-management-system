
import StatCard from "@/components/dashboard/StatCard";
import ResultsChart from "@/components/dashboard/ResultsChart";
import TopPerformers from "@/components/dashboard/TopPerformers";
import RecentResults from "@/components/dashboard/RecentResults";
import { useData } from "@/context/DataContext";
import { Award, Book, GraduationCap, Users } from "lucide-react";

const Dashboard = () => {
  const { students, results, getPassFailStats } = useData();
  const { totalStudents, passStudents, failStudents, passPercentage } = getPassFailStats();

  const finalResults = results.filter((result) => result.examType === "Final");
  const averagePercentage = 
    finalResults.reduce((sum, result) => sum + result.percentage, 0) / 
    (finalResults.length || 1);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Student Results Management System overview
        </p>
      </div>

      <div className="student-stats-grid">
        <StatCard
          title="Total Students"
          value={students.length}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Average Score"
          value={`${averagePercentage.toFixed(1)}%`}
          description="Based on final exams"
          icon={<Book className="h-4 w-4" />}
        />
        <StatCard
          title="Pass Rate"
          value={`${passPercentage.toFixed(1)}%`}
          description={`${passStudents} of ${totalStudents} students passed`}
          icon={<Award className="h-4 w-4" />}
        />
        <StatCard
          title="Total Exams"
          value={results.length}
          description="Across all classes"
          icon={<GraduationCap className="h-4 w-4" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ResultsChart />
        <div className="space-y-6">
          <TopPerformers />
          <RecentResults />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
