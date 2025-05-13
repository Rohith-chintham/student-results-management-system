
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, File, List } from "lucide-react";

const Reports = () => {
  const availableReports = [
    {
      title: "Student Performance Report",
      description: "Detailed performance analysis of all students",
      icon: <File className="h-5 w-5" />,
    },
    {
      title: "Class-wise Result Summary",
      description: "Summary of results grouped by classes and sections",
      icon: <List className="h-5 w-5" />,
    },
    {
      title: "Subject-wise Analysis",
      description: "In-depth analysis of performance in each subject",
      icon: <File className="h-5 w-5" />,
    },
    {
      title: "Comparative Report",
      description: "Compare results between different exams and academic years",
      icon: <List className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Reports</h2>
        <p className="text-muted-foreground">Generate and download academic reports</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableReports.map((report, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <CardTitle>{report.title}</CardTitle>
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {report.icon}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {report.description}
              </p>
              <Button variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Generate Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border rounded-lg p-8 text-center">
        <h3 className="text-xl font-medium mb-2">Custom Reports</h3>
        <p className="text-muted-foreground mb-4">
          Need a specialized report? Create a custom report with specific parameters
        </p>
        <Button>Create Custom Report</Button>
      </div>
    </div>
  );
};

export default Reports;
