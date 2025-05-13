
import { useParams } from "react-router-dom";
import { useData } from "@/context/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, List } from "lucide-react";
import StudentResultList from "./StudentResultList";
import { Link } from "react-router-dom";

const StudentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getStudentById, getStudentResults } = useData();
  
  const student = getStudentById(id || "");
  const results = getStudentResults(id || "");

  if (!student) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">Student not found</h2>
        <p className="text-muted-foreground mt-2">
          The requested student profile could not be found.
        </p>
        <Link to="/students">
          <Button className="mt-4">Back to Students</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Student Profile</h2>
          <p className="text-muted-foreground">View student information and results</p>
        </div>
        <Button>
          <Edit className="mr-2 h-4 w-4" /> Edit Profile
        </Button>
      </div>

      <div className="student-profile-grid">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 overflow-hidden rounded-full mb-4">
                  {student.profilePicture ? (
                    <img
                      src={student.profilePicture}
                      alt={student.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-muted flex items-center justify-center">
                      <span className="text-4xl font-bold text-muted-foreground">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold">{student.name}</h3>
                <p className="text-muted-foreground">
                  Roll Number: {student.rollNumber}
                </p>
                <p className="text-muted-foreground">
                  Class {student.class}-{student.section}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Gender</dt>
                  <dd className="font-medium capitalize">{student.gender}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Date of Birth</dt>
                  <dd className="font-medium">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd className="font-medium">{student.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Contact</dt>
                  <dd className="font-medium">{student.contact}</dd>
                </div>
                <div className="pt-2">
                  <dt className="text-muted-foreground mb-1">Address</dt>
                  <dd className="font-medium text-right">{student.address}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div>
          <Tabs defaultValue="results" className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
              <TabsTrigger value="results">Exam Results</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <StudentResultList results={results} />
            </TabsContent>
            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Attendance records will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
