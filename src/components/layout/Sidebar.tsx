
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Book, 
  ChartBar, 
  Graduation, 
  List, 
  Settings, 
  Users 
} from "lucide-react";

const navItems = [
  { 
    name: "Dashboard", 
    path: "/", 
    icon: ChartBar 
  },
  { 
    name: "Students", 
    path: "/students", 
    icon: Users 
  },
  { 
    name: "Results", 
    path: "/results", 
    icon: Book 
  },
  { 
    name: "Classes", 
    path: "/classes", 
    icon: Graduation 
  },
  { 
    name: "Reports", 
    path: "/reports", 
    icon: List 
  },
  { 
    name: "Settings", 
    path: "/settings", 
    icon: Settings 
  }
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="h-screen w-64 border-r bg-white dark:bg-gray-950 p-4 hidden md:block">
      <div className="space-y-4">
        <div className="py-2">
          <h2 className="text-lg font-semibold">Student Results</h2>
          <p className="text-sm text-muted-foreground">Management System</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-muted",
                currentPath === item.path 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
