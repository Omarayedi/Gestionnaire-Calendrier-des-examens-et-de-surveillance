import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowUpDown, Building, Calendar, Filter, Pencil, PlusCircle, Search, Trash } from "lucide-react"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

// Mock data - replace with actual data fetching
const rooms = [
  {
    id: "1",
    name: "Room 101",
    building: "Science Building",
    capacity: 50,
    facilities: ["Projector", "Whiteboard"],
    status: "Available",
  },
  {
    id: "2",
    name: "Room 202",
    building: "Engineering Building",
    capacity: 75,
    facilities: ["Projector", "Whiteboard", "Computer Lab"],
    status: "In Use",
  },
  {
    id: "3",
    name: "Lecture Hall A",
    building: "Main Building",
    capacity: 200,
    facilities: ["Projector", "Sound System", "Whiteboard"],
    status: "Available",
  },
  {
    id: "4",
    name: "Room 305",
    building: "Arts Building",
    capacity: 40,
    facilities: ["Whiteboard"],
    status: "Maintenance",
  },
  {
    id: "5",
    name: "Conference Room B",
    building: "Administration Building",
    capacity: 30,
    facilities: ["Projector", "Video Conference", "Whiteboard"],
    status: "Available",
  },
]

function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRooms = rooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 pb-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-12 w-12 rounded-lg bg-cyan-100 flex items-center justify-center">
          <Building className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">Manage exam rooms and facilities</p>
        </div>
      </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-cyan-500">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
              <Building className="h-6 w-6 text-cyan-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Rooms</p>
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
              <p className="text-sm font-medium text-muted-foreground">Available</p>
              <p className="text-2xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">In Use</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building className="h-5 w-5 text-cyan-600" />
          <h2 className="text-xl font-bold">Rooms</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              All Rooms
              <Badge variant="secondary" className="ml-1">
                5
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Available
              <Badge variant="secondary" className="ml-1">
                3
              </Badge>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              In Use
              <Badge variant="secondary" className="ml-1">
                2
              </Badge>
            </Button>
          </div>

          <Button className="bg-cyan-600 hover:bg-cyan-700">
            <Link to="/rooms/add" className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Room
            </Link>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search rooms..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-1">
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
                    ROOM NAME
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    BUILDING
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    CAPACITY
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">FACILITIES</div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center gap-1">
                    STATUS
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No rooms found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredRooms.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>{room.building}</TableCell>
                    <TableCell>{room.capacity}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {room.facilities.map((facility) => (
                          <Badge key={facility} variant="outline" className="bg-slate-100">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          room.status === "Available"
                            ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
                            : room.status === "In Use"
                              ? "bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200"
                              : "bg-red-100 text-red-800 hover:bg-red-100 border-red-200"
                        }
                      >
                        {room.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Link to={`/rooms/edit/${room.id}`}>
                            <Pencil className="h-4 w-4" />
                          </Link>
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
          Showing {filteredRooms.length} of {rooms.length} rooms
        </div>
      </div>
    </div>
    </div>  
  )
}

export default RoomsPage