
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ChartBar,
  Edit, 
  File, 
  List, 
  Plus, 
  Search, 
  Settings 
} from "lucide-react";
import { useData } from "@/context/DataContext";
import { Student } from "@/types";

const StudentsList = () => {
  const { students } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState<string>("");
  const [sectionFilter, setSectionFilter] = useState<string>("");

  const filteredStudents = students.filter((student) => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesClass = classFilter ? student.class === classFilter : true;
    const matchesSection = sectionFilter ? student.section === sectionFilter : true;
    
    return matchesSearch && matchesClass && matchesSection;
  });

  const classes = Array.from(new Set(students.map((student) => student.class)));
  const sections = Array.from(new Set(students.map((student) => student.section)));

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Students</h2>
          <p className="text-muted-foreground">Manage and view student information</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Student
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search students..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
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
          
          <select
            className="border rounded px-3 py-2 text-sm"
            value={sectionFilter}
            onChange={(e) => setSectionFilter(e.target.value)}
          >
            <option value="">All Sections</option>
            {sections.map((section) => (
              <option key={section} value={section}>
                Section {section}
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
                <TableHead>Name</TableHead>
                <TableHead>Class-Section</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
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
                    <TableCell>{student.class}-{student.section}</TableCell>
                    <TableCell className="capitalize">{student.gender}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Link 
                              to={`/students/${student.id}`}
                              className="flex items-center"
                            >
                              <File className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link 
                              to={`/students/${student.id}/results`}
                              className="flex items-center"
                            >
                              <ChartBar className="mr-2 h-4 w-4" />
                              View Results
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Link 
                              to={`/students/${student.id}/edit`}
                              className="flex items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No students found.
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

export default StudentsList;
