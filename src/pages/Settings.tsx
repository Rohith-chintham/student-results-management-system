
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Configure system preferences and options</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="grading">Grading System</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Institution Settings</CardTitle>
              <CardDescription>
                Configure your institution information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Institution Name
                </label>
                <Input id="name" placeholder="Enter institution name" defaultValue="National School" />
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Input id="address" placeholder="Enter institution address" defaultValue="123 Education Street, Knowledge City" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input id="phone" placeholder="Enter phone number" defaultValue="+1 234-567-8900" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input id="email" type="email" placeholder="Enter email address" defaultValue="info@nationalschool.edu" />
              </div>
              <div className="space-y-2">
                <label htmlFor="website" className="text-sm font-medium">
                  Website
                </label>
                <Input id="website" placeholder="Enter website URL" defaultValue="www.nationalschool.edu" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <Card>
            <CardHeader>
              <CardTitle>Grading System</CardTitle>
              <CardDescription>
                Configure how grades are calculated and displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Grade Scale</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>A+ (Excellent)</span>
                    <span>90% - 100%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>A (Very Good)</span>
                    <span>80% - 89%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>B+ (Good)</span>
                    <span>70% - 79%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>B (Above Average)</span>
                    <span>60% - 69%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>C+ (Average)</span>
                    <span>50% - 59%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>C (Satisfactory)</span>
                    <span>40% - 49%</span>
                  </div>
                  <div className="flex justify-between text-sm p-1 border-b">
                    <span>F (Fail)</span>
                    <span>0% - 39%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="pass-percentage" className="text-sm font-medium">
                  Pass Percentage
                </label>
                <Input id="pass-percentage" type="number" min="0" max="100" defaultValue="40" />
              </div>
              <div className="space-y-2">
                <label htmlFor="rounding" className="text-sm font-medium">
                  Score Rounding
                </label>
                <select id="rounding" className="w-full border rounded px-3 py-2">
                  <option value="nearest">Nearest Integer</option>
                  <option value="ceiling">Round Up</option>
                  <option value="floor">Round Down</option>
                </select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                User management features coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
