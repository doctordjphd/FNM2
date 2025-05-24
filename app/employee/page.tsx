"use client"

import { useState } from "react"
import { Calendar, Users, RefreshCw, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function EmployeeDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [loading, setLoading] = useState(false)

  // Generate Friday dates starting June 14th, 2024
  const generateFridayDates = () => {
    const dates = []
    const startDate = new Date("2024-06-14")

    for (let i = 0; i < 12; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i * 7)
      dates.push({
        date: date.toISOString().split("T")[0],
        formatted: date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      })
    }
    return dates
  }

  const fridayDates = generateFridayDates()

  const openGoogleSheet = () => {
    if (!selectedDate) {
      alert("Please select a date first!")
      return
    }

    setLoading(true)

    // Format date for sheet name (e.g., "2024-06-14" becomes "June_14_2024")
    const date = new Date(selectedDate)
    const sheetName = date
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .replace(/,?\s/g, "_")

    // Replace with your actual Google Sheets URL
    // Each Friday should have its own sheet/tab
    const googleSheetUrl = `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit#gid=0&range=A1:E21`

    setTimeout(() => {
      window.open(googleSheetUrl, "_blank")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="NJComicStop Logo" width={60} height={60} className="filter contrast-200" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">EMPLOYEE DASHBOARD</h1>
                <p className="text-lg font-medium">Friday Night Magic</p>
              </div>
            </div>
            <Badge variant="outline" className="border-2 border-black text-black">
              Staff Only
            </Badge>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">VIEW RESERVATIONS</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Date Selection */}
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Select Event Date
                  </CardTitle>
                  <CardDescription>Choose which Friday's reservations to view</CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedDate} onValueChange={setSelectedDate}>
                    <SelectTrigger className="border-2 border-black">
                      <SelectValue placeholder="Select a Friday..." />
                    </SelectTrigger>
                    <SelectContent>
                      {fridayDates.map((friday) => (
                        <SelectItem key={friday.date} value={friday.date}>
                          {friday.formatted}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Table Info */}
              <Card className="border-2 border-black">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Table Information
                  </CardTitle>
                  <CardDescription>Seating arrangement details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Seats per table:</span>
                      <span className="font-bold">20</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Event time:</span>
                      <span className="font-bold">8:30 PM - 10:30 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Entry fee:</span>
                      <span className="font-bold">$15.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Button */}
            <div className="mt-8 text-center">
              <Button
                onClick={openGoogleSheet}
                disabled={!selectedDate || loading}
                className="bg-black text-white hover:bg-gray-800 text-lg py-6 px-12 font-bold border-2 border-black"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="w-5 h-5 mr-2" />
                    VIEW GOOGLE SHEET
                  </>
                )}
              </Button>

              {selectedDate && (
                <p className="text-sm text-gray-600 mt-4">
                  This will open the Google Sheet for {fridayDates.find((d) => d.date === selectedDate)?.formatted}
                </p>
              )}
            </div>

            {/* Instructions */}
            <Card className="mt-8 border-2 border-gray-300">
              <CardHeader>
                <CardTitle>Setup Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Google Sheets Setup:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Create a Google Sheet with tabs for each Friday date</li>
                    <li>Each tab should have columns: Name, Email, Payment Status, Seat Number, Timestamp</li>
                    <li>Set up 20 rows for the maximum capacity</li>
                    <li>Replace "YOUR_SHEET_ID" in the code with your actual Google Sheets ID</li>
                  </ol>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">PayPal Integration:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Replace "YOUR_PAYPAL_EMAIL" with your PayPal business email</li>
                    <li>Set up PayPal IPN (Instant Payment Notification) to update the Google Sheet</li>
                    <li>Configure success and cancel return URLs</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
