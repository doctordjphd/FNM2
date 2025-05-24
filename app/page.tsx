"use client"

import { useState } from "react"
import { Calendar, Clock, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState<string>("")

  // Generate Friday dates starting June 14th, 2024
  const generateFridayDates = () => {
    const dates = []
    const startDate = new Date("2024-06-14") // June 14th, 2024

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

  const handleReservation = () => {
    if (!selectedDate) {
      alert("Please select a date first!")
      return
    }

    // PayPal integration would go here
    // For now, redirect to PayPal with event details
    const paypalUrl = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Friday Night Magic - ${selectedDate}&amount=15.00&currency_code=USD&return=https://njcomicstop.github.io/fnm/success&cancel_return=https://njcomicstop.github.io/fnm`

    window.open(paypalUrl, "_blank")
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/logo.png" alt="NJComicStop Logo" width={80} height={80} className="filter contrast-200" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">FRIDAY NIGHT MAGIC</h1>
                <p className="text-lg font-medium">NJComicStop</p>
              </div>
            </div>
            <Badge variant="outline" className="border-2 border-black text-black text-lg px-4 py-2">
              8:30 PM - 10:30 PM
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">JOIN THE MAGIC</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the ultimate Friday night gaming at NJComicStop. Reserve your seat for an evening of competitive
            Magic: The Gathering.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <Card className="border-2 border-black">
              <CardHeader>
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>Every Friday</CardTitle>
              </CardHeader>
              <CardContent>
                <p>8:30 PM - 10:30 PM</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardHeader>
                <Users className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>Limited Seating</CardTitle>
              </CardHeader>
              <CardContent>
                <p>20 seats per table</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardHeader>
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <CardTitle>NJComicStop</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Visit NJcomicstop.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">RESERVE YOUR SEAT</h3>

            <Card className="bg-white text-black border-4 border-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Select Your Date
                </CardTitle>
                <CardDescription>Choose which Friday Night Magic event you'd like to attend</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 max-h-64 overflow-y-auto">
                  {fridayDates.map((friday) => (
                    <label key={friday.date} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="date"
                        value={friday.date}
                        checked={selectedDate === friday.date}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{friday.formatted}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-medium">Entry Fee:</span>
                    <span className="text-2xl font-bold">$15.00</span>
                  </div>

                  <Button
                    onClick={handleReservation}
                    disabled={!selectedDate}
                    className="w-full bg-black text-white hover:bg-gray-800 text-lg py-6 font-bold border-2 border-black"
                  >
                    RESERVE YOUR SEAT NOW
                  </Button>

                  <p className="text-xs text-gray-600 mt-2 text-center">
                    You will be redirected to PayPal to complete your payment
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-2">NJComicStop</p>
          <p className="text-gray-600">Visit us at NJcomicstop.com</p>
          <p className="text-sm text-gray-500 mt-4">Reservations are confirmed only after payment completion</p>
        </div>
      </footer>
    </div>
  )
}
