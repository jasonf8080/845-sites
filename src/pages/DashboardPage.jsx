import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiBell,
  FiFileText,
  FiCreditCard,
  FiLifeBuoy,
  FiUser,
  FiArrowRight,
  FiEdit3,
  FiMessageCircle,
  FiCalendar,
  FiBookOpen,
  FiDownload,
  FiChevronRight,
  FiPlus,
  FiBarChart2,
  FiGlobe,
  FiHome,
  FiLock,
  FiMail,
  FiPhone,
  FiClock,
  FiShield,
  FiTrash2,
  FiZap,
  FiMonitor,
  FiSmartphone,
  FiSearch,
  FiUsers,
  FiFolder,
  FiGrid,
  FiSend,
  FiSettings,
  FiCheckCircle,
  FiUserPlus,
  FiFilter,
  FiMoreVertical,
  FiX,
  FiExternalLink,
  FiPause,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { fetchSubmissions, hasSubmissionForEmail } from '../lib/submissionsStore'

const sidebarItems = [
  { id: 'my-site', label: 'My Site', icon: FiFileText },
  { id: 'billing', label: 'Billing', icon: FiCreditCard },
  { id: 'support', label: 'Support', icon: FiLifeBuoy },
  { id: 'account', label: 'Account', icon: FiUser },
]

const adminSidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiHome },
  { id: 'projects', label: 'Projects', icon: FiFolder },
  { id: 'users', label: 'Users', icon: FiUsers },
  { id: 'templates', label: 'Templates', icon: FiGrid },
  { id: 'submissions', label: 'Submissions', icon: FiSend },
  { id: 'support', label: 'Support', icon: FiLifeBuoy },
  { id: 'billing', label: 'Billing', icon: FiCreditCard },
  { id: 'settings', label: 'Settings', icon: FiSettings },
]

const billingRows = [
  { date: 'Sep 1, 2026', description: 'Website Hosting (Standard)', amount: '$35.00', status: 'Paid', invoice: 'View' },
  { date: 'Aug 1, 2026', description: 'Website Hosting (Standard)', amount: '$35.00', status: 'Paid', invoice: 'View' },
  { date: 'Jul 1, 2026', description: 'Website Hosting (Standard)', amount: '$35.00', status: 'Paid', invoice: 'View' },
]

const adminUsersData = [
  {
    name: 'Maria Costa',
    email: 'maria@gmail.com',
    initials: 'MC',
    business: 'Mandy\'s Nail Salon',
    domain: 'mandysnailsalon.com',
    projects: 2,
    plan: 'Standard',
    status: 'Active',
    joined: 'Sep 28, 2026',
    role: 'Client',
    phone: '(914) 555-0192',
    location: 'Yorktown, NY',
    hours: 'Mon-Sat 9AM - 7PM',
    industry: 'Beauty / Nail Salon',
    lastLogin: 'Oct 1, 2026',
  },
  {
    name: 'John D.',
    email: 'john@hvroofingny.com',
    initials: 'JD',
    business: 'Hudson Valley Roofing',
    domain: 'hvroofingny.com',
    projects: 1,
    plan: 'Standard',
    status: 'Active',
    joined: 'Sep 27, 2026',
    role: 'Client',
    phone: '(845) 555-0142',
    location: 'Poughkeepsie, NY',
    hours: 'Mon-Fri 8AM - 5PM',
    industry: 'Roofing',
    lastLogin: 'Sep 30, 2026',
  },
  {
    name: 'Sarah Kim',
    email: 'sarah@riverstonedental.com',
    initials: 'SK',
    business: 'Riverstone Dental',
    domain: 'riverstonedental.com',
    projects: 1,
    plan: 'Standard',
    status: 'Active',
    joined: 'Sep 25, 2026',
    role: 'Client',
    phone: '(203) 555-0183',
    location: 'Newburgh, NY',
    hours: 'Mon-Fri 9AM - 6PM',
    industry: 'Dental',
    lastLogin: 'Sep 29, 2026',
  },
  {
    name: 'Mike Brown',
    email: 'mike@acmestudio.com',
    initials: 'MB',
    business: 'Acme Studio',
    domain: 'acmestudio.com',
    projects: 1,
    plan: 'Standard',
    status: 'In Progress',
    joined: 'Sep 24, 2026',
    role: 'Client',
    phone: '(646) 555-0166',
    location: 'Brooklyn, NY',
    hours: 'Mon-Fri 10AM - 6PM',
    industry: 'Creative Studio',
    lastLogin: 'Sep 29, 2026',
  },
  {
    name: 'Laura Clark',
    email: 'laura@gossettsnursery.com',
    initials: 'LC',
    business: 'Gossett\'s Nursery',
    domain: 'gossettsnursery.com',
    projects: 1,
    plan: 'Standard',
    status: 'Active',
    joined: 'Sep 23, 2026',
    role: 'Client',
    phone: '(845) 555-0109',
    location: 'Fishkill, NY',
    hours: 'Mon-Sun 8AM - 6PM',
    industry: 'Garden / Nursery',
    lastLogin: 'Sep 28, 2026',
  },
  {
    name: 'Ana Costa',
    email: 'ana@myportuguesemarket.com',
    initials: 'AC',
    business: 'My Portuguese Market',
    domain: 'myportuguesemarket.com',
    projects: 1,
    plan: 'Standard',
    status: 'Inactive',
    joined: 'Sep 21, 2026',
    role: 'Client',
    phone: '(914) 555-0177',
    location: 'Danbury, CT',
    hours: 'Mon-Sat 9AM - 8PM',
    industry: 'Retail Market',
    lastLogin: 'Sep 21, 2026',
  },
]

const adminProjectsData = [
  {
    name: 'Gardenside Kitchen',
    domain: 'gardensidekitchen.com',
    business: 'Gardenside Kitchen',
    client: 'Maria C.',
    clientEmail: 'maria@gmail.com',
    clientInitials: 'MC',
    status: 'Designing',
    updated: '3 hours ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 12, 2026',
    previewTone: 'from-[#274135] to-[#88764f]',
  },
  {
    name: 'South Salem Winery',
    domain: 'southsalemwinery.com',
    business: 'South Salem Winery',
    client: 'John V.',
    clientEmail: 'john@southsalemwinery.com',
    clientInitials: 'JV',
    status: 'Review',
    updated: '5 hours ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 10, 2026',
    previewTone: 'from-[#3d2d20] to-[#8a623e]',
  },
  {
    name: 'Riverstone Dental',
    domain: 'riverstonedental.com',
    business: 'Riverstone Dental',
    client: 'Sarah K.',
    clientEmail: 'sarah@riverstonedental.com',
    clientInitials: 'SK',
    status: 'Completed',
    updated: '1 day ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 8, 2026',
    previewTone: 'from-[#2d3e52] to-[#6c839c]',
  },
  {
    name: 'Hudson Valley Roofing',
    domain: 'hvroofingny.com',
    business: 'Hudson Valley Roofing',
    client: 'John D.',
    clientEmail: 'john@hvroofingny.com',
    clientInitials: 'JD',
    status: 'Designing',
    updated: '1 day ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 5, 2026',
    previewTone: 'from-[#453b2f] to-[#846a4e]',
  },
  {
    name: 'Acme Studio',
    domain: 'acmestudio.com',
    business: 'Acme Studio',
    client: 'Mike B.',
    clientEmail: 'mike@acmestudio.com',
    clientInitials: 'MB',
    status: 'In Progress',
    updated: '2 days ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 3, 2026',
    previewTone: 'from-[#2f2f2f] to-[#777777]',
  },
  {
    name: 'Gossett\'s Nursery',
    domain: 'gossettsnursery.com',
    business: 'Gossett\'s Nursery',
    client: 'Laura C.',
    clientEmail: 'laura@gossettsnursery.com',
    clientInitials: 'LC',
    status: 'Completed',
    updated: '2 days ago',
    plan: 'Standard ($35/mo)',
    started: 'Sep 1, 2026',
    previewTone: 'from-[#294429] to-[#6e9b62]',
  },
]

export const DashboardPage = () => {
  const { isAdmin, signOut, updateProfile, user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('my-site')
  const [activeAdminTab, setActiveAdminTab] = useState('dashboard')
  const [hasSite, setHasSite] = useState(false)
  const [profileForm, setProfileForm] = useState({
    fullName: '',
    email: '',
    phone: '',
  })
  const [profileStatus, setProfileStatus] = useState({ type: 'idle', message: '' })
  const [isSavingProfile, setIsSavingProfile] = useState(false)
  const [selectedAdminUserEmail, setSelectedAdminUserEmail] = useState(adminUsersData[0].email)
  const [selectedAdminProjectDomain, setSelectedAdminProjectDomain] = useState(adminProjectsData[0].domain)
  const [liveSubmissions, setLiveSubmissions] = useState([])

  const nameFromProfile =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.identities?.[0]?.identity_data?.full_name ||
    ''
  const firstNameFromProfile = nameFromProfile.trim().split(/\s+/)[0] || ''
  const emailStem = (user?.email || '').split('@')[0].replace(/[._-]+/g, ' ').trim()
  const firstNameFromEmail = emailStem.split(/\s+/)[0] || ''
  const resolvedFirstName = firstNameFromProfile || firstNameFromEmail || 'there'
  const greetingFirstName =
    resolvedFirstName.charAt(0).toUpperCase() + resolvedFirstName.slice(1)
  const fallbackFullName = emailStem
    ? emailStem
        .split(/\s+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')
    : 'User'
  const displayName = nameFromProfile.trim() || fallbackFullName
  const displayEmail = user?.email || 'No email on file'
  const displayInitials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'U'
  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'N/A'
  const providerName =
    user?.app_metadata?.providers?.includes('google') ||
    user?.identities?.some((identity) => identity?.provider === 'google')
      ? 'Google Account'
      : 'Email Account'
  const providerBadge = providerName.startsWith('Google') ? 'G' : 'E'
  const displayPhone = user?.phone || user?.user_metadata?.phone || 'Not added'
  const accountDisplayName = profileForm.fullName.trim() || displayName
  const accountDisplayEmail = profileForm.email.trim() || (displayEmail === 'No email on file' ? '' : displayEmail)
  const accountDisplayPhone = profileForm.phone.trim() || 'Not added'
  const accountInitials = accountDisplayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || 'U'
  const selectedAdminUser =
    adminUsersData.find((adminUser) => adminUser.email === selectedAdminUserEmail) || adminUsersData[0]
  const selectedAdminProject =
    adminProjectsData.find((project) => project.domain === selectedAdminProjectDomain) || adminProjectsData[0]

  useEffect(() => {
    setProfileForm({
      fullName: displayName,
      email: user?.email || '',
      phone: user?.phone || user?.user_metadata?.phone || '',
    })
  }, [displayName, user])

  useEffect(() => {
    let isMounted = true

    if (!user?.email) {
      setHasSite(false)
      return () => {
        isMounted = false
      }
    }

    const loadHasSite = async () => {
      try {
        const hasMatchingSubmission = await hasSubmissionForEmail(user.email)
        if (isMounted) {
          setHasSite(hasMatchingSubmission)
        }
      } catch (error) {
        if (isMounted) {
          setHasSite(false)
        }
      }
    }

    loadHasSite()

    return () => {
      isMounted = false
    }
  }, [user?.email])

  useEffect(() => {
    let isMounted = true

    const loadSubmissions = async () => {
      try {
        const records = await fetchSubmissions()
        if (isMounted) {
          setLiveSubmissions(records)
        }
      } catch (error) {
        if (isMounted) {
          setLiveSubmissions([])
        }
      }
    }

    loadSubmissions()

    return () => {
      isMounted = false
    }
  }, [])

  const handleLogout = async () => {
    const result = await signOut()
    if (!result?.error) {
      navigate('/login')
    }
  }

  const handleProfileSave = async (event) => {
    event.preventDefault()

    if (isSavingProfile) {
      return
    }

    const normalizedName = profileForm.fullName.trim()
    const normalizedEmail = profileForm.email.trim().toLowerCase()
    const normalizedPhone = profileForm.phone.trim()

    if (!normalizedName) {
      setProfileStatus({ type: 'error', message: 'Please enter your full name.' })
      return
    }

    if (!normalizedEmail) {
      setProfileStatus({ type: 'error', message: 'Please enter your email address.' })
      return
    }

    try {
      setIsSavingProfile(true)
      setProfileStatus({ type: 'idle', message: '' })

      const result = await updateProfile({
        fullName: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
      })

      if (result?.error) {
        throw result.error
      }

      setProfileStatus({ type: 'success', message: 'Profile updated successfully.' })
      setProfileForm((prev) => ({
        ...prev,
        fullName: normalizedName,
        email: normalizedEmail,
        phone: normalizedPhone,
      }))
    } catch (error) {
      setProfileStatus({
        type: 'error',
        message: error?.message || 'Unable to save profile changes right now.',
      })
    } finally {
      setIsSavingProfile(false)
    }
  }

  const renderInProgressSiteView = () => (
    <div className="space-y-6">
      <div className="rounded-[26px] border border-[#d9d2ca] bg-[#f1eee9] p-5 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="rounded-[22px] border border-[#d8d0c7] bg-[#f5f1ee] px-4 py-5 sm:px-5 sm:py-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8d1c9] bg-[#f1ece7] px-3 py-1.5 text-[0.8rem] font-medium text-[#1b1b1d]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#1a1a1a] text-[0.7rem]">◔</span>
              Website in Progress
            </div>

            <h1 className="text-[3rem] font-black leading-[0.82] tracking-[-0.08em] text-[#111111] sm:text-[4.5rem] lg:text-[5.5rem]">
              YOUR WEBSITE
              <span className="block">IS ON THE WAY</span>
            </h1>

            <p className="mt-4 max-w-[520px] text-[1.02rem] leading-relaxed text-[#4e4b46] sm:text-[1.12rem]">
              Thanks for your submission! We&apos;re building your website and will notify you as soon as it&apos;s ready for your review.
            </p>
          </div>

          <div className="relative min-h-[260px]">
            <div className="absolute left-3 top-6 rounded-full border border-[#d8d2ca] bg-[#f6f2ee] px-3 py-1.5 text-[0.8rem] font-medium text-[#1d1d1d] shadow-sm">
              Custom Design
            </div>
            <div className="absolute right-5 top-20 rounded-full border border-[#d8d2ca] bg-[#f6f2ee] px-3 py-1.5 text-[0.8rem] font-medium text-[#1d1d1d] shadow-sm">
              Your Photos
            </div>

            <div className="absolute right-0 top-[120px] rounded-full border border-[#d8d2ca] bg-[#f6f2ee] px-3 py-1.5 text-[0.8rem] font-medium text-[#1d1d1d] shadow-sm">
              SEO Optimized
            </div>

            <div className="absolute left-8 bottom-0 rounded-full border border-[#d8d2ca] bg-[#f6f2ee] px-3 py-1.5 text-[0.8rem] font-medium text-[#1d1d1d] shadow-sm">
              Mobile Ready
            </div>

            <div className="ml-auto h-[260px] w-full max-w-[500px] rounded-[18px] border border-[#d9d1c7] bg-[#f4efe9] p-3 shadow-[0_10px_22px_rgba(15,17,21,0.04)]">
              <div className="flex h-full flex-col rounded-[14px] border border-[#d7cec3] bg-[#f9f5f1] p-3">
                <div className="flex items-center gap-2 pb-2">
                  <span className="h-3 w-3 rounded-full bg-[#e76f51]" />
                  <span className="h-3 w-3 rounded-full bg-[#e9b66c]" />
                  <span className="h-3 w-3 rounded-full bg-[#8dc87d]" />
                </div>
                <div className="flex flex-1 gap-3">
                  <div className="flex-1 rounded-[10px] border border-[#d8d1c8] bg-[linear-gradient(180deg,#f7f2ee_0%,#f1e5df_100%)] p-3">
                    <div className="h-20 rounded-[8px] bg-[linear-gradient(135deg,#d9d0c7_0%,#f8f2ed_100%)]" />
                    <div className="mt-4 space-y-2">
                      <div className="h-3 w-3/4 rounded-full bg-[#e1d3c9]" />
                      <div className="h-3 w-2/3 rounded-full bg-[#e1d3c9]" />
                      <div className="h-3 w-1/2 rounded-full bg-[#e1d3c9]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[22px] border border-[#d7d0c8] bg-[#f1eee9] p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-5">
          {[
            { label: 'Submission Received', meta: 'Sep 28, 2026\n2:14 PM', active: true, icon: '✓' },
            { label: 'In Progress', meta: 'We\'re building\nyour website', icon: '⚙' },
            { label: 'Review Ready', meta: 'We\'ll notify you\nwhen it\'s ready', icon: '◫' },
            { label: 'Final Revisions', meta: 'Request any changes', icon: '✈' },
            { label: 'Go Live', meta: 'Your website\nis published', icon: '◌' },
          ].map((step, index) => (
            <div key={step.label} className="flex flex-col items-center text-center">
              <div className="mb-3 flex w-full items-center justify-center">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full border text-[1rem] font-semibold ${
                  index === 0
                    ? 'border-[#c96f4a] bg-[#c96f4a] text-white'
                    : index < 2
                      ? 'border-[#d9b39d] bg-[#f0d9ca] text-[#1a1a1a]'
                      : 'border-[#d9d3ce] bg-[#f1efe9] text-[#1a1a1a]'
                }`}>
                  {step.icon}
                </div>
                {index < 4 && <div className={`h-0.5 flex-1 ${index === 0 ? 'bg-[#c96f4a]' : 'bg-[#d8d0c8]'}`} />}
              </div>
              <div className="text-[1.02rem] font-semibold text-[#171717]">{step.label}</div>
              <div className="mt-1 whitespace-pre-line text-[0.8rem] leading-[1.3] text-[#56534f]">{step.meta}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { title: 'View Your Submission', body: 'See the information you provided for your website.', button: 'View Details', icon: '▣' },
          { title: 'Add a Note', body: 'Have anything else to share? Send us a note or additional photos anytime.', button: 'Send a Message', icon: '◌' },
          { title: 'Upload More Photos', body: 'Want to add more images for your site? You can upload them here.', button: 'Upload Photos', icon: '◭' },
          { title: 'Need Help?', body: 'Have a question about your project? We\'re here to help.', button: 'Contact Support', icon: '?' },
        ].map((item) => (
          <div key={item.title} className="rounded-[18px] border border-[#d7d1ca] bg-[#f6f3f0] p-4">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f0d8c7] text-[1.2rem] font-semibold text-[#1c1b1a]">
              {item.icon}
            </div>
            <h3 className="text-[1.15rem] font-semibold text-[#171717]">{item.title}</h3>
            <p className="mt-2 text-[0.96rem] leading-relaxed text-[#5e5c57]">{item.body}</p>
            <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-[12px] border border-[#1a1b1d] bg-white px-4 py-2.5 text-[0.9rem] font-semibold text-[#171717]">
              {item.button}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )

  const renderSiteDashboardView = () => (
    <div className="rounded-[24px] border border-[#d2d2ce] bg-[#f3f1ee] p-4 sm:p-5 lg:p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[2.4rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[3rem] md:text-[3.8rem]">
            Welcome back, {greetingFirstName}
          </h1>
          <p className="mt-3 text-base text-[#5b5b57] sm:text-[1.1rem]">
            Here&apos;s an overview of your website and account.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/start')}
          className="inline-flex items-center justify-center gap-2 rounded-[16px] border border-[#1a1b1d] bg-[#1a1b1d] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(18,18,20,0.18)] transition hover:opacity-95 sm:px-5 sm:py-4 sm:text-[1.02rem]"
        >
          <FiPlus size={18} strokeWidth={2.4} />
          New Website
        </button>
      </div>

      <div className="mb-6 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_260px]">
        <div className="rounded-[24px] border border-[#d0d1cb] bg-[#f3f1ee] p-4 shadow-[0_12px_24px_rgba(20,20,20,0.02)]">
          <div className="flex items-center justify-between rounded-t-[18px] border-b border-[#d5d5d0] bg-[#f7f5f3] px-4 py-3">
            <div className="flex items-center gap-2 text-[0.8rem] font-medium text-[#4a4a45]">
              <span className="rounded-full bg-[#f3efe9] px-2 py-1 text-[#1a1b1d]">Mandy&apos;s</span>
              <span>Home</span>
              <span>Services</span>
              <span>About</span>
              <span>Gallery</span>
              <span>Contact</span>
            </div>
            <button type="button" className="rounded-full border border-[#d0d0ca] bg-[#f2f1ef] px-2 py-1 text-[0.74rem] text-[#4a4a45]">
              Book now
            </button>
          </div>

          <div className="flex flex-col gap-4 p-2 sm:flex-row">
            <div className="relative flex-1 overflow-hidden rounded-[18px] bg-[#f0d9d7]">
              <div className="h-[260px] w-full bg-[linear-gradient(135deg,#f7e7e2_0%,#f0d7d0_30%,#ebd3ca_100%)] px-5 py-5">
                <div className="flex h-full items-end justify-between gap-3">
                  <div className="w-[48%] self-center rounded-[12px] border border-[#e6d0c5] bg-[#f6eee9]/70 p-4 backdrop-blur-sm">
                    <div className="mb-3 h-6 w-16 rounded bg-[#e7d7ce]" />
                    <div className="space-y-2">
                      <div className="h-4 w-24 rounded bg-[#ebdbd4]" />
                      <div className="h-4 w-20 rounded bg-[#ebdbd4]" />
                    </div>
                    <div className="mt-4 h-8 w-24 rounded-full bg-[#1a1b1d] text-[0.6rem] text-white" />
                  </div>

                  <div className="flex h-full w-[40%] items-end justify-center">
                    <div className="h-[70%] w-full rounded-t-[20px] bg-[radial-gradient(circle_at_50%_15%,#f7efe8_0%,#f2d8c9_18%,#ebc9bb_42%,#e1b6a4_100%)] shadow-inner" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-center gap-3 py-2 sm:w-[250px] sm:gap-5">
              <div className="flex items-center gap-2 text-[#1a1a1a]">
                <span className="inline-block h-3.5 w-3.5 rounded-full bg-[#58b778]" />
                <span className="text-[1rem] font-semibold">Live</span>
              </div>

              <div>
                <h2 className="text-[1.9rem] font-black leading-[0.9] tracking-[-0.08em] text-[#1a1b1d] sm:text-[2.4rem]">
                  Mandy&apos;s Nail Salon
                </h2>
                <div className="mt-3 flex items-center gap-2 text-[1.02rem] text-[#40403b]">
                  <span>mandysnailsalon.com</span>
                  <FiArrowRight size={16} />
                </div>
              </div>

              <p className="text-[0.96rem] text-[#5d5c59]">Last updated 3 days ago</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[18px] border border-[#d5d5d0] bg-[#171717] px-5 py-4 text-left text-[1.1rem] font-semibold text-white"
          >
            <span>View Site</span>
            <FiArrowRight size={18} strokeWidth={2.5} />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[18px] border border-[#d5d5d0] bg-[#f3f1ee] px-5 py-4 text-left text-[1.1rem] font-semibold text-[#171717]"
          >
            <span className="flex items-center gap-3">
              <FiEdit3 size={18} strokeWidth={2.1} />
              Edit Site
            </span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[18px] border border-[#d5d5d0] bg-[#f3f1ee] px-5 py-4 text-left text-[1.1rem] font-semibold text-[#171717]"
          >
            <span className="flex items-center gap-3">
              <FiChevronRight size={18} strokeWidth={2.5} />
              More Options
            </span>
          </button>
        </div>
      </div>

      <div className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="flex items-center gap-4 rounded-[18px] border border-[#d0d1cb] bg-[#f3f1ee] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1b1d] text-white">
            <FiBarChart2 size={18} strokeWidth={2.3} />
          </div>
          <div>
            <p className="text-[0.96rem] font-medium text-[#4f4f4a]">Monthly Visits</p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-[2rem] font-black leading-none tracking-[-0.08em]">1,248</p>
              <span className="mb-1 text-[0.95rem] font-medium text-[#4ea86a]">↑ 18%</span>
            </div>
            <p className="mt-2 text-[0.82rem] text-[#656560]">Last 30 days</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[18px] border border-[#d0d1cb] bg-[#f3f1ee] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1b1d] text-white">
            <FiCalendar size={18} strokeWidth={2.3} />
          </div>
          <div>
            <p className="text-[0.96rem] font-medium text-[#4f4f4a]">Next Payment</p>
            <p className="mt-2 text-[2.05rem] font-black leading-none tracking-[-0.08em]">Oct 1, 2026</p>
            <p className="mt-2 text-[0.96rem] text-[#5f5f5a]">$35 / month</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[18px] border border-[#d0d1cb] bg-[#f3f1ee] p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1b1d] text-white">
            <FiBookOpen size={18} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[0.96rem] font-medium text-[#4f4f4a]">Plan</p>
            <p className="mt-2 text-[2.05rem] font-black leading-none tracking-[-0.08em]">Standard</p>
            <p className="mt-2 text-[0.96rem] text-[#5f5f5a]">Website + Hosting</p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-[18px] border border-[#d0d1cb] bg-[#f3f1ee] p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1b1d] text-white">
            <FiGlobe size={18} strokeWidth={2.3} />
          </div>
          <div>
            <p className="text-[0.96rem] font-medium text-[#4f4f4a]">Domain</p>
            <p className="mt-2 text-[1.5rem] font-black leading-none tracking-[-0.06em] text-[#1a1b1d]">
              mandysnailsalon.com
            </p>
            <p className="mt-2 text-[0.96rem] text-[#5f5f5a]">Connected</p>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboardHome = () => (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-[#70706a]">Admin</p>
        <h1 className="mt-1 text-[2.5rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[4rem]">
          Dashboard
        </h1>
        <p className="mt-2 text-[1.02rem] text-[#62625d]">Overview of your users, projects, and recent activity.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Users', value: '24', delta: '+12%' },
          { label: 'Total Projects', value: '18', delta: '+28%' },
          { label: 'In Progress', value: '7', delta: '39%' },
          { label: 'Completed', value: '11', delta: '61%' },
        ].map((item) => (
          <div key={item.label} className="rounded-[16px] border border-[#ddd9d3] bg-white px-4 py-4 sm:px-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.92rem] font-semibold text-[#3c3c39]">{item.label}</p>
              <span className="text-[0.85rem] font-semibold text-[#2f9b5f]">{item.delta}</span>
            </div>
            <p className="mt-2 text-[2rem] font-black leading-none tracking-[-0.06em] text-[#171717]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[1.6rem] font-black tracking-[-0.06em] text-[#171717]">Recent Projects</h2>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d5d2cc] px-3 py-1.5 text-sm font-medium text-[#232321]">
              View all <FiArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {[
              ['Mandy\'s Nail Salon', 'Designing', '3 hours ago'],
              ['Hudson Valley Roofing', 'Review', '5 hours ago'],
              ['Riverstone Dental', 'Completed', '1 day ago'],
              ['Acme Studio', 'Designing', '1 day ago'],
              ['Gossett\'s Nursery', 'Info Received', '2 days ago'],
            ].map(([name, status, updated]) => (
              <div key={name} className="flex items-center justify-between rounded-[12px] bg-[#f7f6f3] px-3 py-2.5">
                <div>
                  <p className="text-[0.94rem] font-semibold text-[#171717]">{name}</p>
                  <p className="text-[0.8rem] text-[#6b6b66]">{status}</p>
                </div>
                <p className="text-[0.8rem] text-[#6b6b66]">{updated}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[1.6rem] font-black tracking-[-0.06em] text-[#171717]">Recent Users</h2>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d5d2cc] px-3 py-1.5 text-sm font-medium text-[#232321]">
              View all <FiArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            {[
              ['Maria Costa', 'maria@gmail.com', 'Sep 28, 2026'],
              ['John D.', 'john@hvroofingny.com', 'Sep 27, 2026'],
              ['Sarah Kim', 'sarah@riverstonedental.com', 'Sep 25, 2026'],
              ['Mike Brown', 'mike@acmestudio.com', 'Sep 24, 2026'],
              ['Ana Costa', 'ana@myportuguesemarket.com', 'Sep 21, 2026'],
            ].map(([name, email, joined]) => (
              <div key={email} className="flex items-center justify-between rounded-[12px] bg-[#f7f6f3] px-3 py-2.5">
                <div>
                  <p className="text-[0.94rem] font-semibold text-[#171717]">{name}</p>
                  <p className="text-[0.8rem] text-[#6b6b66]">{email}</p>
                </div>
                <p className="text-[0.8rem] text-[#6b6b66]">{joined}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <h2 className="text-[1.6rem] font-black tracking-[-0.06em] text-[#171717]">Recent Activity</h2>
          <div className="mt-4 space-y-2">
            {[
              'New project submission from Mandy\'s Nail Salon.',
              'Project marked as completed for South Salem Winery.',
              'New user account created for Ana Costa.',
            ].map((activity) => (
              <div key={activity} className="rounded-[12px] bg-[#f7f6f3] px-3 py-3 text-[0.92rem] text-[#3b3b38]">
                {activity}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <h2 className="text-[1.6rem] font-black tracking-[-0.06em] text-[#171717]">Quick Actions</h2>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {[
              ['View New Submissions', 'submissions', FiSend],
              ['Manage Users', 'users', FiUsers],
              ['Manage Templates', 'templates', FiGrid],
              ['Site Settings', 'settings', FiSettings],
            ].map(([label, tab, Icon]) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveAdminTab(tab)}
                className="flex items-center justify-between rounded-[12px] border border-[#dad7d1] bg-[#f9f8f6] px-3 py-3 text-left text-[0.93rem] font-medium text-[#222220]"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon size={15} />
                  {label}
                </span>
                <FiChevronRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const submissionsRows = [
    {
      business: "Mandy's Nail Salon",
      businessUrl: 'mandysnailsalon.com',
      name: 'Maria Costa',
      email: 'maria@gmail.com',
      submitted: 'Sep 28, 2026',
      time: '10:24 AM',
      status: 'Pending',
      source: 'Website Form',
      avatar: 'MN',
      accent: 'bg-[#f1e1d7]',
      selected: true,
    },
    {
      business: 'Hudson Valley Roofing',
      businessUrl: 'hvroofingny.com',
      name: 'John D.',
      email: 'john@hvroofingny.com',
      submitted: 'Sep 27, 2026',
      time: '3:12 PM',
      status: 'Converted',
      source: 'Website Form',
      avatar: 'HV',
      accent: 'bg-[#e8e6e2]',
      selected: false,
    },
    {
      business: 'Riverstone Dental',
      businessUrl: 'riverstonedental.com',
      name: 'Sarah Kim',
      email: 'sarah@riverstonedental.com',
      submitted: 'Sep 25, 2026',
      time: '11:05 AM',
      status: 'Pending',
      source: 'Website Form',
      avatar: 'RD',
      accent: 'bg-[#e7e7e1]',
      selected: false,
    },
    {
      business: 'Acme Studio',
      businessUrl: 'acmestudio.com',
      name: 'Mike Brown',
      email: 'mike@acmestudio.com',
      submitted: 'Sep 24, 2026',
      time: '2:18 PM',
      status: 'In Review',
      source: 'Referral',
      avatar: 'AS',
      accent: 'bg-[#dfe8e5]',
      selected: false,
    },
    {
      business: "Gossett's Nursery",
      businessUrl: 'gossettsnursery.com',
      name: 'Laura Clark',
      email: 'laura@gossettsnursery.com',
      submitted: 'Sep 23, 2026',
      time: '9:41 AM',
      status: 'Converted',
      source: 'Website Form',
      avatar: 'GN',
      accent: 'bg-[#e0e7df]',
      selected: false,
    },
    {
      business: 'South Salem Winery',
      businessUrl: 'southsalemwinery.com',
      name: 'John Vuolo',
      email: 'john@southsalemwinery.com',
      submitted: 'Sep 22, 2026',
      time: '4:33 PM',
      status: 'Completed',
      source: 'Referral',
      avatar: 'SW',
      accent: 'bg-[#e8e3df]',
      selected: false,
    },
    {
      business: 'My Portuguese Market',
      businessUrl: 'myportuguesemarket.com',
      name: 'Ana Costa',
      email: 'ana@myportuguesemarket.com',
      submitted: 'Sep 21, 2026',
      time: '1:27 PM',
      status: 'Not Proceeding',
      source: 'Website Form',
      avatar: 'MP',
      accent: 'bg-[#f3e9e7]',
      selected: false,
    },
    {
      business: 'NP & Construction',
      businessUrl: 'npcconstructionny.com',
      name: 'Nick Perugini',
      email: 'nick@npcconstructionny.com',
      submitted: 'Sep 20, 2026',
      time: '9:16 AM',
      status: 'Pending',
      source: 'Website Form',
      avatar: 'NP',
      accent: 'bg-[#eceae7]',
      selected: false,
    },
  ]

  const dashboardRows = [
    ...liveSubmissions.map((row) => ({
      name: row.business || row.name || 'New Submission',
      city: row.city || row.location || 'Location pending',
      avatar: (row.avatar || row.business || 'NS').slice(0, 2).toUpperCase(),
      avatarBg: row.avatarBg || 'bg-[#f1e2d7]',
      type: row.type || 'General Business',
      submitted: row.submitted || 'Today',
      time: row.time || 'Now',
      status: row.status || 'New',
      statusTone: row.statusTone || 'bg-[#dfeaf8] text-[#1d5e8b]',
      dot: row.dot || 'bg-[#1f79d8]',
      unread: row.unread ?? true,
      selected: row.selected ?? true,
      source: row.source || 'Website Form',
      email: row.email || 'unknown@example.com',
      phone: row.phone || '(000) 000-0000',
      address: row.address || 'Address pending',
      hours: row.hours || 'Hours pending',
    })),
    ...submissionsRows,
  ]

  const renderAdminSubmissionsView = () => (
    <div className="rounded-[18px] border border-[#d7d4ce] bg-[#f2f0ee] p-4 sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="relative w-full max-w-[420px]">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a84]" size={16} />
          <input
            type="text"
            placeholder="Search submissions..."
            className="h-[40px] w-full rounded-[12px] border border-[#d8d4ce] bg-[#f4f2f0] pl-10 pr-3 text-[0.95rem] text-[#171717] outline-none placeholder:text-[#7b7a75]"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#d7d4ce] bg-[#f4f2f0] px-3 py-2 text-[0.82rem] font-medium text-[#1b1b18]"
          >
            <FiCalendar size={14} />
            Sep 1, 2026 - Sep 28, 2026
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-[3rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[4.1rem]">
            SUBMISSIONS
          </h1>
          <p className="mt-2 text-[1.04rem] text-[#5d5c57]">Review and manage incoming website project requests.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[12px] border border-[#171717] bg-[#171717] px-4 py-3 text-[0.94rem] font-semibold text-white shadow-[0_8px_16px_rgba(17,17,17,0.12)]"
        >
          <FiPlus size={18} strokeWidth={2.5} />
          New Submission
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { label: 'All', count: 12, active: true },
            { label: 'New', count: 3 },
            { label: 'In Progress', count: 5 },
            { label: 'Completed', count: 4 },
            { label: 'Archived', count: 0 },
          ].map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.8rem] font-medium ${
                tab.active
                  ? 'border-[#171717] bg-[#171717] text-white'
                  : 'border-[#d7d4ce] bg-[#f5f3f1] text-[#2a2a28]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-[0.68rem] ${
                    tab.active ? 'bg-white/15 text-white' : 'bg-[#efefe9] text-[#2d2d2a]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-[#d7d4ce] bg-[#f5f3f1] px-3 py-1.5 text-[0.82rem] font-medium text-[#2a2a28]"
        >
          <FiChevronRight className="rotate-90" size={14} />
          Newest First
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-[14px] border border-[#d9d4ce] bg-white">
        <div className="grid grid-cols-[32px_minmax(0,1.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_140px] items-center border-b border-[#e5e1db] bg-[#f8f7f5] px-3 py-3 text-[0.72rem] font-medium uppercase tracking-[0.05em] text-[#7a7a74]">
          <div className="px-1">
            <input type="checkbox" aria-label="Select all" className="h-3.5 w-3.5 rounded border-[#c9c4be] accent-[#171717]" />
          </div>
          <div className="px-2">Business</div>
          <div className="px-2">Type / Industry</div>
          <div className="px-2">Submitted</div>
          <div className="px-2">Status</div>
          <div className="px-2 text-right">Actions</div>
        </div>

        <div>
          {dashboardRows.map((row) => {
            const submissionId = row.id || `${row.name}-${row.submitted}-${row.time}`
            const detailPath = submissionId ? `/submission/${encodeURIComponent(submissionId)}` : '/submission'

            return (
            <div
              key={submissionId || row.name}
              className={`grid grid-cols-[32px_minmax(0,1.8fr)_minmax(0,1.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_140px] items-center border-b border-[#f0ece8] px-3 py-3 ${
                row.selected ? 'bg-[#edf3ff]' : 'bg-white'
              }`}
            >
              <div className="px-1">
                <input type="checkbox" aria-label={`Select ${row.name}`} className="h-3.5 w-3.5 rounded border-[#c9c4be] accent-[#171717]" />
              </div>

              <div className="flex items-center gap-3 px-2">
                {row.unread && <span className="h-2.5 w-2.5 rounded-full bg-[#d74d4f]" />}
                <div className={`flex h-10 w-10 items-center justify-center rounded-[10px] text-[0.8rem] font-semibold text-[#1c1b1a] ${row.avatarBg}`}>
                  {row.avatar}
                </div>
                <div>
                  <div className="text-[0.98rem] font-semibold text-[#171717]">{row.name}</div>
                  <div className="text-[0.76rem] text-[#6a6a64]">{row.city}</div>
                </div>
              </div>

              <div className="px-2 text-[0.92rem] text-[#2a2a26]">{row.type}</div>

              <div className="px-2 text-[0.92rem] text-[#2a2a26]">
                <div>{row.submitted}</div>
                <div className="text-[0.76rem] text-[#6a6a64]">{row.time}</div>
              </div>

              <div className="px-2">
                <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[0.74rem] font-semibold ${row.statusTone}`}>
                  <span className={`h-2.5 w-2.5 rounded-full ${row.dot}`} />
                  {row.status}
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 px-2">
                <button
                  type="button"
                  onClick={() =>
                    navigate(detailPath, {
                      state: {
                        ...row,
                        id: submissionId,
                        business: row.name,
                        city: row.city,
                        type: row.type,
                        submitted: row.submitted,
                        time: row.time,
                        status: row.status,
                        phone: row.phone || '(845) 555-1234',
                        email: row.email || 'mandysnailsalon@gmail.com',
                        address: row.address || '123 Route 9, Fishkill, NY 12524',
                        hours: row.hours || 'Mon-Sat 9:00 AM – 7:00 PM',
                      },
                    })
                  }
                  className="rounded-[10px] border border-[#d7d4ce] bg-[#f8f6f3] px-3 py-1.5 text-[0.82rem] font-medium text-[#1d1d1b]"
                >
                  View Details
                </button>
                <button type="button" className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#1d1d1b] hover:bg-[#f2efe9]" aria-label={`More actions for ${row.name}`}>
                  <FiChevronRight size={16} />
                </button>
                <button type="button" className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#1d1d1b] hover:bg-[#f2efe9]" aria-label={`Menu for ${row.name}`}>
                  <FiMoreVertical size={16} />
                </button>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const renderAdminListView = (title, subtitle) => (
    <div className="rounded-[20px] border border-[#ddd9d3] bg-white p-6 sm:p-8">
      <h1 className="text-[2rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2.8rem]">
        {title}
      </h1>
      <p className="mt-3 text-[1rem] text-[#5f5f5a]">{subtitle}</p>
      <div className="mt-6 rounded-[14px] border border-dashed border-[#d7d3cd] bg-[#f8f7f4] p-5 text-[0.96rem] text-[#656560]">
        This section is ready for your live data and actions.
      </div>
    </div>
  )

  const renderAdminUsersView = () => (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[2.6rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[3.6rem]">
            USERS
          </h1>
          <p className="mt-2 text-[1.04rem] text-[#61615c]">Manage user accounts, roles, and statuses.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[14px] border border-[#171717] bg-[#171717] px-5 py-3 text-[0.95rem] font-semibold text-white"
        >
          <FiUserPlus size={16} />
          Add User
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Users', value: '24', meta: '+12% from last month', icon: FiUsers },
          { label: 'New Users', value: '5', meta: '+25% this month', icon: FiUserPlus },
          { label: 'Active Users', value: '22', meta: '92% of total users', icon: FiMonitor },
          { label: 'Inactive Users', value: '2', meta: '8% of total users', icon: FiClock },
        ].map(({ label, value, meta, icon: Icon }) => (
          <div key={label} className="rounded-[16px] border border-[#ddd9d3] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f1ed] text-[#1f1f1d]">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[0.9rem] font-semibold text-[#2c2c29]">{label}</p>
                <p className="mt-1 text-[2rem] font-black leading-none tracking-[-0.06em] text-[#171717]">{value}</p>
              </div>
            </div>
            <p className="mt-2 text-[0.82rem] text-[#2f9b5f]">{meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.9fr)_360px]">
        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {['All Users (24)', 'Active (22)', 'Inactive (2)', 'Admin (1)'].map((chip, index) => (
              <button
                key={chip}
                type="button"
                className={`rounded-full border px-3 py-1.5 text-[0.84rem] font-medium ${
                  index === 0
                    ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                    : 'border-[#d6d2cc] bg-white text-[#383834]'
                }`}
              >
                {chip}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d6d2cc] px-3 py-1.5 text-[0.84rem] font-medium text-[#2f2f2c]">
                <FiFilter size={14} />
                Filter
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d6d2cc] px-3 py-1.5 text-[0.84rem] font-medium text-[#2f2f2c]">
                Newest First
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[0.78rem] uppercase tracking-[0.08em] text-[#7a7a74]">
                  <th className="pb-3 pr-3 font-medium">User</th>
                  <th className="pb-3 pr-3 font-medium">Business</th>
                  <th className="pb-3 pr-3 font-medium">Projects</th>
                  <th className="pb-3 pr-3 font-medium">Plan</th>
                  <th className="pb-3 pr-3 font-medium">Status</th>
                  <th className="pb-3 pr-3 font-medium">Joined</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminUsersData.map((adminUser) => {
                  const isSelected = adminUser.email === selectedAdminUser.email
                  return (
                    <tr
                      key={adminUser.email}
                      className={`cursor-pointer border-t border-[#ece8e2] ${
                        isSelected ? 'bg-[#f8f7f4]' : 'hover:bg-[#fbfaf8]'
                      }`}
                      onClick={() => setSelectedAdminUserEmail(adminUser.email)}
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efece8] text-[0.78rem] font-semibold text-[#30302d]">
                            {adminUser.initials}
                          </div>
                          <div>
                            <div className="text-[0.95rem] font-semibold text-[#181816]">{adminUser.name}</div>
                            <div className="text-[0.8rem] text-[#6f6f69]">{adminUser.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3 align-middle">
                        <div className="text-[0.92rem] font-medium text-[#20201e]">{adminUser.business}</div>
                        <div className="text-[0.79rem] text-[#6f6f69]">{adminUser.domain}</div>
                      </td>
                      <td className="py-3 pr-3 text-[0.9rem] text-[#2b2b28]">{adminUser.projects}</td>
                      <td className="py-3 pr-3 text-[0.9rem] text-[#2b2b28]">{adminUser.plan}</td>
                      <td className="py-3 pr-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.76rem] font-semibold ${
                            adminUser.status === 'Active'
                              ? 'bg-[#dcf4e3] text-[#236f3f]'
                              : adminUser.status === 'In Progress'
                                ? 'bg-[#deedf9] text-[#1f5a83]'
                                : 'bg-[#ebebea] text-[#5b5b56]'
                          }`}
                        >
                          {adminUser.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-[0.9rem] text-[#2b2b28]">{adminUser.joined}</td>
                      <td className="py-3 text-[#575751]">
                        <button type="button" className="rounded-full p-1.5 hover:bg-[#ece9e4]">
                          <FiMoreVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f3e7de] text-[1.4rem] font-semibold text-[#2d2d2a]">
                {selectedAdminUser.initials}
              </div>
              <div>
                <h3 className="text-[1.6rem] font-black leading-none tracking-[-0.06em] text-[#171717]">{selectedAdminUser.name}</h3>
                <p className="mt-1 text-[0.92rem] text-[#686862]">{selectedAdminUser.email}</p>
                <span className="mt-2 inline-flex rounded-full bg-[#dcf4e3] px-2.5 py-1 text-[0.75rem] font-semibold text-[#236f3f]">
                  {selectedAdminUser.status}
                </span>
              </div>
            </div>

            <button type="button" className="rounded-full p-2 text-[#5d5d58] hover:bg-[#f3f1ed]">
              <FiX size={17} />
            </button>
          </div>

          <div className="mb-4 flex items-center gap-4 border-b border-[#ece8e2] pb-3 text-[0.86rem] font-medium text-[#585853]">
            <button type="button" className="text-[#171717]">Overview</button>
            <button type="button">Projects</button>
            <button type="button">Billing</button>
            <button type="button">Activity</button>
          </div>

          <div className="space-y-4">
            <div className="rounded-[12px] border border-[#e2ddd7] bg-[#fbfaf8] p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-[1.1rem] font-semibold text-[#1b1b19]">Business Information</h4>
                <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d9d4ce] px-3 py-1 text-[0.8rem] font-medium text-[#2b2b28]">
                  <FiEdit3 size={13} /> Edit
                </button>
              </div>
              <div className="space-y-2 text-[0.9rem] text-[#4c4c47]">
                <p className="font-semibold text-[#1f1f1d]">{selectedAdminUser.business}</p>
                <p className="inline-flex items-center gap-1">
                  {selectedAdminUser.domain}
                  <FiExternalLink size={13} />
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-[0.86rem]">
                  <p className="text-[#6a6a65]">Industry</p>
                  <p>{selectedAdminUser.industry}</p>
                  <p className="text-[#6a6a65]">Phone</p>
                  <p>{selectedAdminUser.phone}</p>
                  <p className="text-[#6a6a65]">Location</p>
                  <p>{selectedAdminUser.location}</p>
                  <p className="text-[#6a6a65]">Business Hours</p>
                  <p>{selectedAdminUser.hours}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[12px] border border-[#e2ddd7] bg-[#fbfaf8] p-4">
              <h4 className="text-[1.1rem] font-semibold text-[#1b1b19]">Account Details</h4>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[0.88rem]">
                <p className="text-[#6a6a65]">Role</p>
                <p>{selectedAdminUser.role}</p>
                <p className="text-[#6a6a65]">Joined</p>
                <p>{selectedAdminUser.joined}</p>
                <p className="text-[#6a6a65]">Last Login</p>
                <p>{selectedAdminUser.lastLogin}</p>
                <p className="text-[#6a6a65]">Plan</p>
                <p>{selectedAdminUser.plan} ($35/mo)</p>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-[1.1rem] font-semibold text-[#1b1b19]">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                  View Website
                </button>
                <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                  Message User
                </button>
                <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                  Edit User
                </button>
                <button type="button" className="rounded-[10px] border border-[#f0c4bf] bg-[#fff5f4] px-3 py-2 text-[0.86rem] font-medium text-[#cf4d45]">
                  Deactivate User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminProjectsView = () => (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[2.6rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[3.6rem]">
            PROJECTS
          </h1>
          <p className="mt-2 text-[1.04rem] text-[#61615c]">View and manage all client website projects.</p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-[14px] border border-[#171717] bg-[#171717] px-5 py-3 text-[0.95rem] font-semibold text-white"
        >
          <FiPlus size={16} />
          New Project
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Projects', value: '18', meta: '+28% from last month', icon: FiFolder },
          { label: 'In Progress', value: '7', meta: '39% of total projects', icon: FiClock },
          { label: 'Completed', value: '11', meta: '61% of total projects', icon: FiCheckCircle },
          { label: 'Awaiting Review', value: '4', meta: '22% of total projects', icon: FiFileText },
        ].map(({ label, value, meta, icon: Icon }) => (
          <div key={label} className="rounded-[16px] border border-[#ddd9d3] bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f1ed] text-[#1f1f1d]">
                <Icon size={18} />
              </div>
              <div>
                <p className="text-[0.9rem] font-semibold text-[#2c2c29]">{label}</p>
                <p className="mt-1 text-[2rem] font-black leading-none tracking-[-0.06em] text-[#171717]">{value}</p>
              </div>
            </div>
            <p className="mt-2 text-[0.82rem] text-[#2f9b5f]">{meta}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[minmax(0,1.9fr)_360px]">
        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {['All Projects (18)', 'In Progress (7)', 'Completed (11)', 'On Hold (2)', 'Awaiting Review (4)'].map((chip, index) => (
              <button
                key={chip}
                type="button"
                className={`rounded-full border px-3 py-1.5 text-[0.84rem] font-medium ${
                  index === 0
                    ? 'border-[#1a1a1a] bg-[#1a1a1a] text-white'
                    : 'border-[#d6d2cc] bg-white text-[#383834]'
                }`}
              >
                {chip}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d6d2cc] px-3 py-1.5 text-[0.84rem] font-medium text-[#2f2f2c]">
                <FiFilter size={14} />
                Filter
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-[#d6d2cc] px-3 py-1.5 text-[0.84rem] font-medium text-[#2f2f2c]">
                Newest First
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-[0.78rem] uppercase tracking-[0.08em] text-[#7a7a74]">
                  <th className="pb-3 pr-3 font-medium">Project</th>
                  <th className="pb-3 pr-3 font-medium">Business</th>
                  <th className="pb-3 pr-3 font-medium">Client</th>
                  <th className="pb-3 pr-3 font-medium">Status</th>
                  <th className="pb-3 pr-3 font-medium">Updated</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminProjectsData.map((project) => {
                  const isSelected = project.domain === selectedAdminProject.domain
                  return (
                    <tr
                      key={project.domain}
                      className={`cursor-pointer border-t border-[#ece8e2] ${
                        isSelected ? 'bg-[#f8f7f4]' : 'hover:bg-[#fbfaf8]'
                      }`}
                      onClick={() => setSelectedAdminProjectDomain(project.domain)}
                    >
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-14 rounded-[6px] bg-gradient-to-br ${project.previewTone}`} />
                          <div>
                            <div className="text-[0.95rem] font-semibold text-[#181816]">{project.name}</div>
                            <div className="text-[0.8rem] text-[#6f6f69]">{project.domain}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 pr-3 text-[0.92rem] font-medium text-[#20201e]">{project.business}</td>
                      <td className="py-3 pr-3">
                        <div className="inline-flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#efece8] text-[0.72rem] font-semibold text-[#30302d]">
                            {project.clientInitials}
                          </span>
                          <span className="text-[0.9rem] text-[#2b2b28]">{project.client}</span>
                        </div>
                      </td>
                      <td className="py-3 pr-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[0.76rem] font-semibold ${
                            project.status === 'Completed'
                              ? 'bg-[#dcf4e3] text-[#236f3f]'
                              : project.status === 'In Progress'
                                ? 'bg-[#deedf9] text-[#1f5a83]'
                                : project.status === 'Review'
                                  ? 'bg-[#deedf9] text-[#1f5a83]'
                                  : 'bg-[#ffe9d9] text-[#ba6225]'
                          }`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 pr-3 text-[0.9rem] text-[#2b2b28]">{project.updated}</td>
                      <td className="py-3 text-[#575751]">
                        <button type="button" className="rounded-full p-1.5 hover:bg-[#ece9e4]">
                          <FiMoreVertical size={15} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-[18px] border border-[#ddd9d3] bg-white p-4 sm:p-5">
          <div className={`mb-4 h-40 rounded-[12px] bg-gradient-to-br ${selectedAdminProject.previewTone}`} />
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[1.6rem] font-black leading-none tracking-[-0.06em] text-[#171717]">{selectedAdminProject.name}</h3>
              <p className="mt-1 inline-flex items-center gap-1 text-[0.92rem] text-[#686862]">
                {selectedAdminProject.domain}
                <FiExternalLink size={13} />
              </p>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[0.76rem] font-semibold ${
                selectedAdminProject.status === 'Completed'
                  ? 'bg-[#dcf4e3] text-[#236f3f]'
                  : selectedAdminProject.status === 'In Progress' || selectedAdminProject.status === 'Review'
                    ? 'bg-[#deedf9] text-[#1f5a83]'
                    : 'bg-[#ffe9d9] text-[#ba6225]'
              }`}
            >
              {selectedAdminProject.status}
            </span>
          </div>

          <div className="mb-4 grid gap-2 text-[0.88rem]">
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#1a1a1a] bg-[#1a1a1a] px-3 py-2 text-white">
              Open Project <FiArrowRight size={14} />
            </button>
            <button type="button" className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#d9d4ce] bg-white px-3 py-2 text-[#1f1f1d]">
              View Live Site
            </button>
          </div>

          <div className="rounded-[12px] border border-[#e2ddd7] bg-[#fbfaf8] p-4">
            <h4 className="text-[1.1rem] font-semibold text-[#1b1b19]">Project Details</h4>
            <div className="mt-3 grid grid-cols-2 gap-2 text-[0.88rem]">
              <p className="text-[#6a6a65]">Business</p>
              <p>{selectedAdminProject.business}</p>
              <p className="text-[#6a6a65]">Client</p>
              <p>{selectedAdminProject.client} ({selectedAdminProject.clientEmail})</p>
              <p className="text-[#6a6a65]">Plan</p>
              <p>{selectedAdminProject.plan}</p>
              <p className="text-[#6a6a65]">Started</p>
              <p>{selectedAdminProject.started}</p>
              <p className="text-[#6a6a65]">Last Updated</p>
              <p>{selectedAdminProject.updated}</p>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="mb-3 text-[1.1rem] font-semibold text-[#1b1b19]">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                Message Client
              </button>
              <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                Request Changes
              </button>
              <button type="button" className="rounded-[10px] border border-[#dbd7d1] bg-white px-3 py-2 text-[0.86rem] font-medium text-[#1f1f1d]">
                Mark as Complete
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#f0c4bf] bg-[#fff5f4] px-3 py-2 text-[0.86rem] font-medium text-[#cf4d45]">
                <FiPause size={13} />
                Pause Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminView = () => {
    switch (activeAdminTab) {
      case 'projects':
        return renderAdminProjectsView()
      case 'users':
        return renderAdminUsersView()
      case 'templates':
        return renderAdminListView('Templates', 'Create and update reusable website templates.')
      case 'submissions':
        return renderAdminSubmissionsView()
      case 'support':
        return renderAdminListView('Support', 'Track conversations and support requests.')
      case 'billing':
        return renderAdminListView('Billing', 'Monitor subscriptions, invoices, and payment health.')
      case 'settings':
        return renderAdminListView('Settings', 'Configure global admin preferences and site rules.')
      case 'dashboard':
      default:
        return renderAdminDashboardHome()
    }
  }

  const renderMySiteView = () => {
    if (hasSite) {
      return renderInProgressSiteView()
    }

    return (
      <div className="rounded-[28px] border border-[#d7d4ce] bg-[#f4f2ef] p-5 sm:p-6 lg:p-8">
        <h1 className="text-[3.3rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[4.6rem] md:text-[5.2rem]">
          {`WELCOME BACK, ${greetingFirstName.toUpperCase()}`}
        </h1>
        <p className="mt-3 text-[1.1rem] text-[#5d5d57] sm:text-[1.5rem]">
          You&apos;re all set! Let&apos;s create your first website.
        </p>

        <div className="mt-8 rounded-[22px] border border-[#d7d4ce] bg-[#f1efed] p-5 sm:p-6 lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="rounded-[18px] border border-[#d9d4ce] bg-[#f0e9e2] p-4 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 pb-3">
                <span className="h-3 w-3 rounded-full bg-[#d77a57]" />
                <span className="h-3 w-3 rounded-full bg-[#d9c2a6]" />
                <span className="h-3 w-3 rounded-full bg-[#d5d1cc]" />
              </div>

              <div className="rounded-[14px] border border-[#d4c8bd] bg-[#f8f4f1] p-4">
                <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
                  <div className="rounded-[10px] bg-[#efe8e3] p-3">
                    <div className="h-24 w-full rounded-[8px] bg-[#f2e9e0]" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded-full bg-[#e9e2db]" />
                    <div className="h-4 w-4/5 rounded-full bg-[#e9e2db]" />
                    <div className="h-4 w-2/3 rounded-full bg-[#e9e2db]" />
                    <div className="h-10 w-full rounded-[8px] bg-[#f1e7df]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#e7d6c7] bg-[#f4e7dd] px-3 py-1.5 text-[0.9rem] font-medium text-[#2a2a2a]">
                <span className="h-2 w-2 rounded-full bg-[#d88e63]" />
                No Website Yet
              </div>

              <h2 className="text-[2.4rem] font-black leading-[0.95] tracking-[-0.07em] text-[#171717] sm:text-[3.3rem]">
                Create Your First Website
              </h2>
              <p className="mt-4 max-w-[27rem] text-[1.05rem] leading-relaxed text-[#5b5b57] sm:text-[1.2rem]">
                Turn your business information into a professional, modern website in just a few minutes.
              </p>

              <button
                type="button"
                onClick={() => navigate('/start')}
                className="mt-6 inline-flex w-fit items-center justify-center gap-3 rounded-[18px] border border-[#171717] bg-[#171717] px-5 py-4 text-[1.05rem] font-semibold text-white shadow-[0_12px_24px_rgba(18,18,20,0.18)]"
              >
                <FiPlus size={20} strokeWidth={2.5} />
                New Website
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[18px] border border-[#d7d4ce] bg-[#f5f3f1] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e2d8] text-[#171717]">
              <FiZap size={22} strokeWidth={2.2} />
            </div>
            <h3 className="text-[2rem] font-black leading-none tracking-[-0.07em] text-[#171717]">Fast &amp; Simple</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#5d5d57]">
              Fill out a quick form and we&apos;ll handle the rest.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#d7d4ce] bg-[#f5f3f1] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e2d8] text-[#171717]">
              <FiMonitor size={22} strokeWidth={2.2} />
            </div>
            <h3 className="text-[2rem] font-black leading-none tracking-[-0.07em] text-[#171717]">Custom Design</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#5d5d57]">
              Professionally designed for your business.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#d7d4ce] bg-[#f5f3f1] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e2d8] text-[#171717]">
              <FiSmartphone size={22} strokeWidth={2.2} />
            </div>
            <h3 className="text-[2rem] font-black leading-none tracking-[-0.07em] text-[#171717]">Mobile Ready</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#5d5d57]">
              Looks great on all devices.
            </p>
          </div>

          <div className="rounded-[18px] border border-[#d7d4ce] bg-[#f5f3f1] p-5">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e2d8] text-[#171717]">
              <FiSearch size={22} strokeWidth={2.2} />
            </div>
            <h3 className="text-[2rem] font-black leading-none tracking-[-0.07em] text-[#171717]">SEO Optimized</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#5d5d57]">
              Built to help you get found online.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderBillingView = () => (
    <div className="rounded-[24px] border border-[#d2d2ce] bg-[#f3f1ee] p-4 sm:p-5 lg:p-6">
      <div className="mb-7">
        <h1 className="text-[2.5rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[3.2rem] md:text-[4rem]">
          Billing
        </h1>
        <p className="mt-3 text-[1.1rem] leading-relaxed text-[#5d5d57]">
          Manage your subscription, view invoices, and update payment details.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_360px]">
        <div className="space-y-5">
          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <h2 className="mb-4 text-[1.4rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2rem]">
              Current Plan
            </h2>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d5d3cf] bg-[#f0efec] text-[#171717]">
                  <FiBookOpen size={18} strokeWidth={2.1} />
                </div>

                <div>
                  <div className="text-[1.1rem] font-semibold text-[#171717] sm:text-[1.7rem]">Standard</div>
                  <div className="text-[1rem] text-[#5d5d57]">Website + Hosting</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-[1.1rem] font-semibold text-[#171717] sm:text-[1.8rem]">$35 <span className="text-[0.95rem] font-medium text-[#5d5d57]">/ month</span></div>
                <div className="inline-flex items-center rounded-full border border-[#a8d9b0] bg-[#dff2e3] px-3 py-1 text-[0.8rem] font-semibold text-[#1e6a34]">
                  Active
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <h2 className="mb-4 text-[1.4rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2rem]">
              Payment Method
            </h2>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ffb45d_0%,#eb5c3a_45%,#d63232_100%)] text-lg font-bold text-white">
                  •
                </div>

                <div>
                  <div className="text-[1.05rem] font-semibold text-[#171717] sm:text-[1.6rem]">Mastercard •••• 4242</div>
                  <div className="text-[0.95rem] text-[#5d5d57]">Expires 10/2028</div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#d2d2ce] bg-[#f3f1ee] px-4 py-2.5 text-[0.95rem] font-medium text-[#171717]"
              >
                <FiEdit3 size={16} strokeWidth={2.1} />
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[1.4rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2rem]">
                Billing History
              </h2>
              <button type="button" className="text-[0.95rem] font-medium text-[#171717]">
                View All →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 text-left text-[1rem]">
                <thead>
                  <tr className="text-[#5b5b57]">
                    <th className="pb-2 pr-4 font-medium">Date</th>
                    <th className="pb-2 pr-4 font-medium">Description</th>
                    <th className="pb-2 pr-4 font-medium">Amount</th>
                    <th className="pb-2 pr-4 font-medium">Status</th>
                    <th className="pb-2 pr-4 font-medium">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRows.map(({ date, description, amount, status, invoice }) => (
                    <tr key={date} className="bg-[#f4f2f0] text-[#171717]">
                      <td className="rounded-l-[12px] px-3 py-3 align-middle">{date}</td>
                      <td className="px-3 py-3 align-middle">{description}</td>
                      <td className="px-3 py-3 align-middle">{amount}</td>
                      <td className="px-3 py-3 align-middle">
                        <span className="inline-flex items-center rounded-full border border-[#afd7af] bg-[#dff2e3] px-2.5 py-1 text-[0.8rem] font-semibold text-[#1d6f38]">
                          {status}
                        </span>
                      </td>
                      <td className="rounded-r-[12px] px-3 py-3 align-middle">
                        <button type="button" className="inline-flex items-center gap-2 text-[#171717]">
                          <FiDownload size={14} />
                          {invoice}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <div className="mb-4 flex items-center justify-between gap-4">
              <h2 className="text-[1.4rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2rem]">
                Next Payment
              </h2>
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2ce] bg-[#f1f0ee] text-[#171717]">
                <FiCalendar size={18} strokeWidth={2.1} />
              </div>
            </div>

            <div className="text-[1.05rem] font-semibold text-[#171717] sm:text-[1.7rem]">Oct 1, 2026</div>
            <div className="mt-2 text-[1.05rem] text-[#171717] sm:text-[1.2rem]">$35.00</div>

            <button
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#d2d2ce] bg-[#f3f1ee] px-4 py-3 text-[0.98rem] font-medium text-[#171717]"
            >
              <FiEdit3 size={16} strokeWidth={2.1} />
              Update Payment Method
            </button>
          </div>

          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <h2 className="mb-4 text-[1.4rem] font-black leading-none tracking-[-0.07em] text-[#171717] sm:text-[2rem]">
              Billing Information
            </h2>

            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2ce] bg-[#f1f0ee] text-[#171717]">
                  <FiBookOpen size={17} strokeWidth={2.1} />
                </div>
                <div>
                  <div className="text-[1.05rem] font-semibold text-[#171717]">Mandy&apos;s Nail Salon</div>
                  <div className="mt-2 text-[0.96rem] text-[#5d5d57]">123 Main St</div>
                  <div className="text-[0.96rem] text-[#5d5d57]">Hopewell Junction, NY 12533</div>
                  <div className="text-[0.96rem] text-[#5d5d57]">United States</div>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-[#d2d2ce] bg-[#f3f1ee] px-3 py-2 text-[0.95rem] font-medium text-[#171717]"
              >
                <FiEdit3 size={15} strokeWidth={2.1} />
                Edit
              </button>
            </div>
          </div>

          <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
            <h3 className="text-[1.9rem] font-black leading-none tracking-[-0.07em] text-[#171717]">
              Need something?
            </h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-[#585852]">
              Have a question about your billing or plan? We&apos;re here to help.
            </p>

            <button
              type="button"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-[16px] border border-[#171717] bg-[#171717] px-4 py-4 text-[1.05rem] font-semibold text-white"
            >
              <FiMessageCircle size={18} strokeWidth={2.2} />
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSupportView = () => (
    <div className="rounded-[24px] border border-[#d2d2ce] bg-[#f3f1ee] p-6 sm:p-8">
      <div className="mb-6">
        <h1 className="text-[2.4rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[3rem]">
          Support
        </h1>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-[#5d5d57]">
          We&apos;re here to help with edits, troubleshooting, and questions about your site.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white">
            <FiMessageCircle size={18} strokeWidth={2.2} />
          </div>
          <h2 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#171717]">Chat with us</h2>
          <p className="mt-3 text-[1rem] text-[#5d5d57]">Get a quick answer from our team during business hours.</p>
        </div>

        <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white">
            <FiEdit3 size={18} strokeWidth={2.1} />
          </div>
          <h2 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#171717]">Design updates</h2>
          <p className="mt-3 text-[1rem] text-[#5d5d57]">Request edits to pages, sections, content, or branding.</p>
        </div>

        <div className="rounded-[18px] border border-[#d2d2ce] bg-[#f7f5f2] p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white">
            <FiBookOpen size={18} strokeWidth={2.2} />
          </div>
          <h2 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#171717]">Guides</h2>
          <p className="mt-3 text-[1rem] text-[#5d5d57]">Browse walkthroughs for managing your site and billing.</p>
        </div>
      </div>
    </div>
  )

  const renderAccountView = () => (
    <div className="rounded-[28px] border border-[#d7d4ce] bg-[#f4f2ef] p-4 sm:p-6 lg:p-8">
      <div className="mb-7">
        <h1 className="text-[3.1rem] font-black leading-[0.9] tracking-[-0.08em] text-[#171717] sm:text-[4.1rem]">
          Account
        </h1>
        <p className="mt-3 text-[1.08rem] leading-relaxed text-[#5d5d57]">
          Manage your personal information, security, and account details.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <div className="space-y-6">
          <form onSubmit={handleProfileSave} className="rounded-[20px] border border-[#d7d4ce] bg-[#f4f2ef] p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-[2.1rem] font-black leading-none tracking-[-0.07em] text-[#171717]">
                  Profile Information
                </h2>
                <p className="mt-2 text-[1rem] text-[#5d5d57]">
                  Update your name, email, and other account details.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="rounded-[14px] border border-[#171717] bg-[#171717] px-5 py-3 text-[1rem] font-semibold text-white"
              >
                {isSavingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {profileStatus.message && (
              <p
                className={`mb-4 text-[0.95rem] ${
                  profileStatus.type === 'error' ? 'text-[#b13834]' : 'text-[#1d6f38]'
                }`}
              >
                {profileStatus.message}
              </p>
            )}

            <div className="grid gap-5 md:grid-cols-[112px_minmax(0,1fr)] md:items-center">
              <div className="mx-auto md:mx-0">
                <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#171717] text-[2.1rem] font-semibold text-white">
                  {accountInitials}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-[1.02rem] font-medium text-[#171717]">Full Name</label>
                  <input
                    value={profileForm.fullName}
                    onChange={(event) => {
                      setProfileForm((prev) => ({ ...prev, fullName: event.target.value }))
                    }}
                    className="w-full rounded-[12px] border border-[#d0d0ca] bg-white px-4 py-3 text-[1.05rem] text-[#171717] outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[1.02rem] font-medium text-[#171717]">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(event) => {
                      setProfileForm((prev) => ({ ...prev, email: event.target.value }))
                    }}
                    className="w-full rounded-[12px] border border-[#d0d0ca] bg-white px-4 py-3 text-[1.05rem] text-[#171717] outline-none focus:border-[#171717]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[1.02rem] font-medium text-[#171717]">Phone Number (optional)</label>
                  <input
                    value={profileForm.phone}
                    onChange={(event) => {
                      setProfileForm((prev) => ({ ...prev, phone: event.target.value }))
                    }}
                    placeholder="Enter phone number"
                    className="w-full rounded-[12px] border border-[#d0d0ca] bg-white px-4 py-3 text-[1.05rem] text-[#171717] outline-none focus:border-[#171717]"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="rounded-[20px] border border-[#d7d4ce] bg-[#f4f2ef] p-5 sm:p-6">
            <div className="mb-4">
              <h2 className="text-[2.1rem] font-black leading-none tracking-[-0.07em] text-[#171717]">
                Security
              </h2>
              <p className="mt-2 text-[1rem] text-[#5d5d57]">
                Manage your password and connected accounts.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-[14px] border border-[#d7d4ce] bg-[#f4f2ef] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d2d2ce] bg-[#efefee] text-[#171717]">
                    <FiLock size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="text-[1.15rem] font-semibold text-[#171717]">Password</div>
                    <div className="text-[0.96rem] text-[#5d5d57]">Update your password.</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-full border border-[#d2d2ce] bg-[#f3f1ee] px-4 py-2.5 text-[0.94rem] font-medium text-[#171717]"
                >
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-[14px] border border-[#d7d4ce] bg-[#f4f2ef] p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fff] text-[1.2rem] font-bold text-[#e06d63]">
                    {providerBadge}
                  </div>
                  <div>
                    <div className="text-[1.15rem] font-semibold text-[#171717]">{providerName}</div>
                    <div className="text-[0.96rem] text-[#5d5d57]">Connected as {accountDisplayEmail || 'No email on file'}.</div>
                  </div>
                </div>

                <button
                  type="button"
                  className="rounded-full border border-[#d2d2ce] bg-[#f3f1ee] px-4 py-2.5 text-[0.94rem] font-medium text-[#171717]"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-[20px] border border-[#d7d4ce] bg-[#f4f2ef] p-5 sm:p-6">
            <h2 className="text-[2.1rem] font-black leading-none tracking-[-0.07em] text-[#171717]">
              Account Details
            </h2>
            <p className="mt-2 text-[1rem] text-[#5d5d57]">View your account information.</p>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-[#d9d7d3] pb-3">
                <div className="flex items-center gap-3 text-[#171717]">
                  <FiUser size={18} strokeWidth={2.1} />
                  <span className="text-[1.08rem] font-medium">Account Type</span>
                </div>
                <span className="text-[1.08rem] text-[#171717]">Standard</span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#d9d7d3] pb-3">
                <div className="flex items-center gap-3 text-[#171717]">
                  <FiClock size={18} strokeWidth={2.1} />
                  <span className="text-[1.08rem] font-medium">Member Since</span>
                </div>
                <span className="text-[1.08rem] text-[#171717]">{memberSince}</span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#d9d7d3] pb-3">
                <div className="flex items-center gap-3 text-[#171717]">
                  <FiMail size={18} strokeWidth={2.1} />
                  <span className="text-[1.08rem] font-medium">Email</span>
                </div>
                <span className="text-[1.08rem] text-[#171717]">{accountDisplayEmail || 'No email on file'}</span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-[#d9d7d3] pb-3">
                <div className="flex items-center gap-3 text-[#171717]">
                  <FiPhone size={18} strokeWidth={2.1} />
                  <span className="text-[1.08rem] font-medium">Phone</span>
                </div>
                <span className="text-[1.08rem] text-[#171717]">{accountDisplayPhone}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-[#171717]">
                  <FiGlobe size={18} strokeWidth={2.1} />
                  <span className="text-[1.08rem] font-medium">Language</span>
                </div>
                <span className="text-[1.08rem] text-[#171717]">English (US)</span>
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[#f2c4c0] bg-[#f7d7d4] p-5 sm:p-6">
            <h2 className="text-[2.1rem] font-black leading-none tracking-[-0.07em] text-[#d74d49]">
              Danger Zone
            </h2>
            <p className="mt-2 text-[1rem] text-[#892f2d]">
              These actions are permanent and cannot be undone.
            </p>

            <div className="mt-5">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 rounded-[14px] border border-[#e9b7b4] bg-[#f5d8d7] px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f7e3e1] text-[#d74d49]">
                    <FiTrash2 size={18} strokeWidth={2.1} />
                  </div>
                  <div>
                    <div className="text-[1.1rem] font-semibold text-[#171717]">Delete Account</div>
                    <div className="text-[0.9rem] text-[#6d2a27]">Permanently delete your account and all data.</div>
                  </div>
                </div>
                <span className="text-[0.95rem] font-medium text-[#d74d49]">Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderView = () => {
    switch (activeTab) {
      case 'my-site':
        return renderMySiteView()
      case 'support':
        return renderSupportView()
      case 'account':
        return renderAccountView()
      case 'billing':
      default:
        return renderBillingView()
    }
  }

  return (
    isAdmin ? (
      <section className="min-h-screen bg-[#efeeeb] text-[#171717]">
        <Helmet>
          <title>Admin Dashboard | 845 Sites</title>
        </Helmet>

        <div className="mx-auto flex min-h-screen max-w-[1700px] flex-col xl:flex-row">
          <aside className="w-full border-b border-[#1f1f1f] bg-[#121212] px-4 py-5 text-[#efefec] xl:w-[250px] xl:border-b-0 xl:border-r xl:border-[#1f1f1f] xl:px-5">
            <div className="mb-6 flex items-center gap-3 px-1">
              <div className="h-10 w-10 rounded-[8px] bg-[#1f1f1f]" />
              <div>
                <div className="text-[1.1rem] font-black tracking-[-0.07em] text-white">E8GHT45</div>
                <div className="text-[0.58rem] uppercase tracking-[0.24em] text-[#b7b7b2]">Sites</div>
              </div>
            </div>

            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-1">
              {adminSidebarItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveAdminTab(id)}
                  className={`flex items-center gap-2 rounded-[11px] px-3 py-2.5 text-left text-[0.88rem] font-medium transition xl:text-[0.96rem] ${
                    activeAdminTab === id
                      ? 'bg-[#1f1f1f] text-white'
                      : 'text-[#cbcbc6] hover:bg-[#1b1b1b] hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-6 hidden rounded-[12px] border border-[#2a2a2a] bg-[#181818] p-3 xl:block">
              <button
                type="button"
                onClick={() => setActiveAdminTab('dashboard')}
                className="flex w-full items-center justify-between rounded-[10px] border border-[#2a2a2a] px-3 py-2 text-[0.88rem] text-[#dfdfda]"
              >
                <span>View Site</span>
                <FiArrowRight size={14} />
              </button>
              <div className="mt-3 flex items-center justify-between rounded-[10px] border border-[#2a2a2a] px-3 py-2.5">
                <div>
                  <div className="text-[0.9rem] font-medium text-white">{displayName}</div>
                  <div className="text-[0.75rem] text-[#a9a9a4]">Admin</div>
                </div>
                <button type="button" onClick={handleLogout} className="text-[0.8rem] text-[#d6d6d1] hover:text-white">
                  Log out
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1 px-4 py-4 sm:px-5 sm:py-5 xl:px-6 xl:py-6">
            <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full max-w-xl">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8a8a84]" size={16} />
                <input
                  type="text"
                  placeholder="Search projects, users, or domains..."
                  className="w-full rounded-[12px] border border-[#d9d6d0] bg-white py-2.5 pl-10 pr-3 text-[0.93rem] text-[#21211f] outline-none"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-[10px] border border-[#d7d4cf] bg-white px-3 py-2 text-[0.84rem] font-medium text-[#2a2a28]"
                >
                  <FiCalendar size={14} />
                  Sep 1, 2026 - Sep 28, 2026
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 rounded-full border border-[#d5d6d1] bg-[#1a1b1d] px-2.5 py-1.5 text-[#f2efe9]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f1ef] text-[0.82rem] font-semibold text-[#171717]">
                    {displayInitials}
                  </span>
                  <span className="hidden text-[0.9rem] font-medium sm:inline">{displayName}</span>
                </button>
              </div>
            </header>

            {renderAdminView()}
          </main>
        </div>
      </section>
    ) : (
    <section className="min-h-screen bg-[#dfe0d9] text-[#171717]">
      <Helmet>
        <title>{activeTab === 'billing' ? 'Billing' : activeTab === 'my-site' ? 'My Site' : activeTab === 'support' ? 'Support' : 'Account'} | 845 Sites</title>
      </Helmet>

      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        <aside className="flex w-full flex-col justify-between border-b border-[#cfd0c8] bg-[#f1f0ed]/90 px-4 py-4 backdrop-blur-sm lg:w-[270px] lg:border-b-0 lg:border-r lg:px-5 lg:py-5">
          <div>
            <div className="mb-8 flex items-center gap-3 pl-2 pt-2">
              <div className="h-10 w-10 rounded-[8px] bg-[#1a1b1d]" />
              <div className="leading-none">
                <div className="text-[1.05rem] font-black tracking-[-0.08em]">E8CHT45</div>
                <div className="mt-1 text-[0.56rem] font-medium uppercase tracking-[0.2em] text-[#6b6b66]">
                  Sites
                </div>
              </div>
            </div>

            <nav className="grid grid-cols-4 gap-2 lg:grid-cols-1">
              {sidebarItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`flex w-full items-center justify-center gap-2 rounded-[14px] px-2 py-3 text-left text-[0.8rem] font-medium transition sm:gap-3 sm:px-3 sm:text-[1.03rem] lg:justify-start ${
                    activeTab === id
                      ? 'bg-[#1a1b1d] text-white shadow-[0_10px_18px_rgba(16,16,19,0.15)]'
                      : 'text-[#1a1a1a] hover:bg-[#e6e5e1]'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                  <span className="truncate">{label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="space-y-5 border-t border-[#d3d3ce] pt-5">
            <div className="rounded-[18px] border border-[#d7d7d2] bg-[#f5f4f1] p-4 text-center">
              <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#1a1b1d] text-lg text-[#1a1b1d]">
                ?
              </div>
              <p className="text-[1.05rem] font-semibold leading-tight">Need help?</p>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-[#5e5f5a]">
                We&apos;re here if you have any questions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('support')}
              className="w-full rounded-[14px] border border-[#d7d7d2] bg-[#f5f4f1] px-3 py-3 text-[0.98rem] font-medium text-[#1a1a1a] transition hover:bg-white"
            >
              Contact Support
            </button>
          </div>
        </aside>

        <main className="flex-1 px-4 py-5 sm:px-5 lg:px-7 lg:py-7">
          <header className="mb-6 flex items-center justify-end gap-3 sm:mb-7 lg:gap-4">
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d5d6d1] bg-[#f3f3f0] text-[#1d1d1d]"
            >
              <FiBell size={18} strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full border border-[#d5d6d1] bg-[#1a1b1d] px-2.5 py-2 text-left text-[#f2efe9] shadow-sm sm:gap-3 sm:px-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f1ef] text-[0.9rem] font-semibold text-[#171717]">
                {displayInitials}
              </span>
              <span className="hidden text-[0.98rem] font-medium sm:inline">{displayName}</span>
              <span aria-hidden="true" className="text-xs text-[#d1d1ce]">▾</span>
            </button>
          </header>

          {renderView()}
        </main>
      </div>
    </section>
    )
  )
}
