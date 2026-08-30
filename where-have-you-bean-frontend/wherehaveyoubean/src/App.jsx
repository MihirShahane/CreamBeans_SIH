import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { RequireAdmin } from './components/ProtectedRoute.jsx'

import Home from './pages/Home.jsx'
import HowItWorks from './pages/HowItWorks.jsx'
import LostItems from './pages/LostItems.jsx'
import FoundItems from './pages/FoundItems.jsx'
import FoundItemDetail from './pages/FoundItemDetail.jsx'
import ReportItem from './pages/ReportItem.jsx'
import MatchResults from './pages/MatchResults.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminOverview from './pages/admin/AdminOverview.jsx'
import AdminClaims from './pages/admin/AdminClaims.jsx'
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />

          <Route path="/lost" element={<LostItems />} />
          <Route path="/found" element={<FoundItems />} />
          <Route path="/found/:id" element={<FoundItemDetail />} />

          <Route path="/report" element={<ReportItem />} />
          <Route path="/report/matches" element={<MatchResults />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          >
            <Route index element={<AdminOverview />} />
            <Route path="claims" element={<AdminClaims />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Reserved for future wiring — claim flow currently requires RequireAuth inline via FoundItemDetail's login redirect */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
