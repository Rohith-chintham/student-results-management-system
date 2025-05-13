
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Classes = () => {
  const classes = [
    { name: "Class 10-A", students: 32, subjects: 6 },
    { name: "Class 10-B", students: 30, subjects: 6 },
    { name: "Class 11-A", students: 28, subjects: 8 },
    { name: "Class 12-A", students: 25, subjects: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Classes</h2>
          <p className="text-muted-foreground">Manage school classes and sections</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Class
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((classItem) => (
          <Card key={classItem.name}>
            <CardHeader className="pb-2">
              <CardTitle>{classItem.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Students:</span>
                <span>{classItem.students}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subjects:</span>
                <span>{classItem.subjects}</span>
              </div>
              <Button variant="outline" className="w-full mt-4" size="sm">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="border rounded-lg p-12 text-center">
        <h3 className="text-xl font-medium mb-2">Class Schedule</h3>
        <p className="text-muted-foreground">
          Class schedule management coming soon
        </p>
      </div>
    </div>
  );
};

export default Classes;
