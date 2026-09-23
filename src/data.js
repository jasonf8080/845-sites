export const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Pages', href: '/#pages' },
  { label: 'Blog', href: '/#blog' },
]

export const SERVICES = [
  {
    id: 'new-site',
    name: 'Custom Website Build',
    price: '$350',
    priceNote: 'one-time, flat rate',
    description:
      'A fully custom, high-speed, mobile-first website designed and built from scratch for your business — no recycled templates, no bloated page builders.',
    icon: 'FiCode',
  },
  {
    id: 'maintenance',
    name: 'Ongoing Site Maintenance',
    price: '$25',
    priceNote: 'per month',
    description:
      'Hosting coordination, uptime monitoring, security updates, and small content changes so your site stays fast, current, and online.',
    icon: 'FiShield',
  },
]

export const WHY_CHOOSE_US = [
  {
    id: 1,
    title: 'Built for Speed',
    description:
      'Every site is hand-coded and optimized to load fast on any device — performance is built in from the first line of code, not bolted on afterward.',
    icon: 'FiZap',
  },
  {
    id: 2,
    title: 'Local, Hudson Valley Focused',
    description:
      'Based in the 845 area and focused on Hudson Valley small businesses — you work directly with the person building your site, not a call center.',
    icon: 'FiMapPin',
  },
  {
    id: 3,
    title: 'SEO Built In From Day One',
    description:
      'Clean semantic code, fast load times, structured data, and proper metadata so search engines can find and rank your business from launch.',
    icon: 'FiTrendingUp',
  },
  {
    id: 4,
    title: 'Simple, Honest Pricing',
    description:
      'One flat rate to build your site and one low monthly rate to keep it running — no hidden fees and no long-term contracts.',
    icon: 'FiDollarSign',
  },
]

export const SERVICE_AREAS = [
  'Poughkeepsie, NY',
  'Newburgh, NY',
  'Middletown, NY',
  'Kingston, NY',
  'Beacon, NY',
  'The Hudson Valley & 845 area',
]

export const PROCESS_STEPS = [
  {
    id: 1,
    title: 'Tell Us',
    description: 'Share your business and project details.',
  },
  {
    id: 2,
    title: 'Secure Your Domain',
    description: 'Use yours, or register one through our trusted domain partner.',
  },
  {
    id: 3,
    title: 'Pay $500',
    description: 'Secure your custom design and launch project.',
  },
  {
    id: 4,
    title: 'We Design',
    description: 'We create your website around the agreed direction.',
  },
  {
    id: 5,
    title: 'You Review',
    description: 'Review the completed website before it goes live.',
  },
  {
    id: 6,
    title: 'We Refine',
    description: 'Request reasonable initial feedback and revisions.',
  },
  {
    id: 7,
    title: 'You Approve',
    description: 'Nothing launches until you approve the website.',
  },
  {
    id: 8,
    title: 'Activate Hosting',
    description: 'Begin the $25/month plan when the site is ready.',
  },
  {
    id: 9,
    title: 'We Launch',
    description: 'We connect your domain and take the website live.',
  },
]

export const STATUS_CONFIG = {
  not_received: { label: 'Not Received', color: 'bg-gray-200 text-gray-700' },
  received: { label: 'Received', color: 'bg-blue-100 text-blue-700' },
  in_progress: { label: 'In Progress', color: 'bg-orange-100 text-accent' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700' },
}

export const DESIGN_DIRECTION_OPTIONS = [
  { value: 'specific_vision', label: 'I have a specific vision' },
  { value: 'guidance', label: 'I have some ideas but would like guidance' },
  { value: 'agency_decides', label: "I'd like 845 Sites to create the direction for me" },
]

export const STYLE_OPTIONS = [
  { value: 'refined_editorial', label: 'Refined & Editorial' },
  { value: 'bold_distinctive', label: 'Bold & Distinctive' },
  { value: 'clean_minimal', label: 'Clean & Minimal' },
]

export const SERVICE_TYPE_OPTIONS = [
  { value: 'new_site', label: 'New Website Build — $350 one-time' },
  { value: 'maintenance', label: 'Ongoing Maintenance — $25/month' },
]
