import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpDown, Calendar, Filter, Pencil, PlusCircle, Search, Trash, UserCog } from "lucide-react"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

// Mock data - replace with actual data fetching
const invigilators = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Computer Science",
    assignedExams: 2,
    phone: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Mathematics",
    assignedExams: 3,
    phone: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    department: "Physics",
    assignedExams: 1,
    phone: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    department: "Chemistry",
    assignedExams: 0,
    phone: "+1 (555) 456-7890",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    department: "Biology",
    assignedExams: 4,
    phone: "+1 (555) 567-8901",
  },
]

function InvigilatorsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvigilators = invigilators.filter(
    (invigilator) =>
      invigilator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invigilator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invigilator.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pb-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
          <UserCog className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invigilator Management</h1>
          <p className="text-muted-foreground">Assign and manage exam invigilators</p>
        </div>
      </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <UserCog className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Invigilators</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Assigned</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invigilators Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserCog className="h-5 w-5 text-purple-600" />
          <h2 className="text-xl font-bold">Invigilators</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <UserCog className="h-4 w-4" />
              All Invigilators
              <Badge variant="secondary" className="ml-1">
                5
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Assigned
              <Badge variant="secondary" className="ml-1">
                4
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Available
              <Badge variant="secondary" className="ml-1">
                1
              </Badge>
            </Button>
          </div>

          <Button className="text-white bg-purple-600 hover:bg-purple-700">
            <Link to="/invigilators/assign" className="flex items-center">
              <PlusCircle className="text-white mr-2 h-4 w-4" />
              Assign to Exam
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search invigilators..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1 ">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">
                  <div className="flex items-center gap-1">
                    NAME
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    EMAIL
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    DEPARTMENT
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    PHONE
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    ASSIGNED EXAMS
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvigilators.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No invigilators found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvigilators.map((invigilator) => (
                  <TableRow key={invigilator.id}>
                    <TableCell className="font-medium">{invigilator.name}</TableCell>
                    <TableCell>{invigilator.email}</TableCell>
                    <TableCell>{invigilator.department}</TableCell>
                    <TableCell>{invigilator.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={invigilator.assignedExams > 0 ? "outline" : "secondary"}
                        className={
                          invigilator.assignedExams > 0
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : ""
                        }
                      >
                        {invigilator.assignedExams}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link to={`/invigilators/assign?id=${invigilator.id}`}>
                            <Calendar className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="text-sm text-muted-foreground mt-4">
          Showing {filteredInvigilators.length} of {invigilators.length} invigilators
        </div>
      </div>
    </div>
    </div>
  )
}

export default InvigilatorsPage
