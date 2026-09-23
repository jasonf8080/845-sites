import { Helmet } from 'react-helmet-async'
import { ClientDashboard } from '../components/Dashboard'

export const DashboardPage = () => (
  <>
    <Helmet>
      <title>Your Projects | 845 Sites</title>
      <meta name="description" content="Track the status of your website project with 845 Sites." />
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <ClientDashboard />
  </>
)
