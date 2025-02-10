import { ComplaintBox } from "../Service/ComplaintBox"
import { ComplaintList } from "../Service/ComplaintList"
import {SmartMobilityDashboard } from "../Service/SmartMobilityDashboard"
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Smart Mobility Dashboard</h1>
      <SmartMobilityDashboard />
      <ComplaintBox />
      <ComplaintList />
    </main>
  )
}

