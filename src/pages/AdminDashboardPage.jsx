import { Helmet } from 'react-helmet-async'
import { AdminDashboard } from '../components/Admin'

export const AdminDashboardPage = () => (
  <>
    <Helmet>
      <title>Admin Dashboard | 845 Sites</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <AdminDashboard />
  </>
)
