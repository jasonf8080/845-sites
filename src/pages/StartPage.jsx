import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createSubmissionRecord } from '../lib/submissionsStore'
const BUSINESS_HOUR_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const BUSINESS_HOUR_TIMES = [
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '6:00 PM',
  '7:00 PM',
  '8:00 PM',
]

export const StartPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const steps = [
    'Business Info',
    'Services & Details',
    'Design & Style',
    'Content & Media',
    'Contact & Location',
    'Review & Submit',
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    businessTagline: '',
    aboutBusiness: '',
    services: '',
    highlight: '',
    whyChooseYou: '',
    serviceAreas: '',
    phone: '',
    address: '',
    website: '',
    designStyle: 'Bold',
    websiteColors: '',
    uploadedPhotos: [],
    hasLogo: false,
    logo: null,
    businessHours: BUSINESS_HOUR_DAYS.map((day) => ({
      day,
      open: '8:00 AM',
      close: day === 'Sunday' ? 'Closed' : '5:00 PM',
      closed: true,
    })),
  })

  const updateFormData = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const updateBusinessHours = (day, field, value) => {
    setFormData((current) => ({
      ...current,
      businessHours: current.businessHours.map((entry) => {
        if (entry.day !== day) {
          return entry
        }

        if (field === 'closed') {
          return {
            ...entry,
            closed: value,
          }
        }

        return {
          ...entry,
          [field]: value,
        }
      }),
    }))
  }

  const isFilled = (value) => String(value ?? '').trim().length > 0

  const requiredReviewFields = [
    { label: 'Business name', value: formData.businessName },
    { label: 'Business type', value: formData.businessType },
    { label: 'About your business', value: formData.aboutBusiness },
    { label: 'Services', value: formData.services },
    { label: 'Website look', value: formData.designStyle },
    { label: 'Color theme', value: formData.websiteColors },
    { label: 'Logo choice', value: formData.hasLogo },
    { label: 'Phone number', value: formData.phone },
    { label: 'Business email', value: formData.email },
  ]

  const missingRequiredFields = requiredReviewFields.filter(({ value }) => !isFilled(value))
  const canSubmit = missingRequiredFields.length === 0

  const handlePhotoUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) {
      return
    }

    try {
      const convertedFiles = await Promise.all(
        files.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader()
              reader.onload = () => {
                resolve({
                  name: file.name,
                  type: file.type,
                  dataUrl: typeof reader.result === 'string' ? reader.result : '',
                })
              }
              reader.onerror = () => reject(new Error('Unable to read file'))
              reader.readAsDataURL(file)
            })
        )
      )

      setFormData((current) => ({
        ...current,
        uploadedPhotos: [...(current.uploadedPhotos || []), ...convertedFiles.filter((photo) => photo.dataUrl)],
      }))
    } catch (error) {
      console.error('Photo upload failed', error)
    } finally {
      event.target.value = ''
    }
  }

  const handleLogoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      const reader = new FileReader()
      reader.onload = () => {
        setFormData((current) => ({
          ...current,
          hasLogo: true,
          logo: {
            name: file.name,
            type: file.type,
            dataUrl: typeof reader.result === 'string' ? reader.result : '',
          },
        }))
      }
      reader.onerror = () => {
        console.error('Logo upload failed')
      }
      reader.readAsDataURL(file)
    } finally {
      event.target.value = ''
    }
  }

  const handleSubmitProject = async () => {
    setSubmitError('')

    const nodes = Array.from(document.querySelectorAll('input, textarea, select'))
    const values = nodes.reduce((acc, element) => {
      if (!(element instanceof HTMLInputElement) && !(element instanceof HTMLTextAreaElement) && !(element instanceof HTMLSelectElement)) {
        return acc
      }
      const value = element.value?.trim?.() || ''
      if (!value) {
        return acc
      }
      if (element instanceof HTMLInputElement && element.type === 'checkbox') {
        return acc
      }
      const key = (element.placeholder || element.name || element.id || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '_')
      acc[key || `field_${Object.keys(acc).length}`] = value
      return acc
    }, {})

    const today = new Date()
    const businessName = formData.businessName || values.business_name || values.business_name_ || 'New Submission'
    const businessType = formData.businessType || values.business_type || values.industry || values.business_type_industry || 'General Business'
    const serviceArea = formData.serviceAreas || values.service_areas || values.location || values.business_address || 'Location pending'
    const phone = formData.phone || values.phone_number || values.phone || '(845) 555-1234'
    const email = formData.email || values.business_email || 'no-email-provided@example.com'
    const address = formData.address || values.business_address || 'Address pending'
    const aboutBusiness = formData.aboutBusiness || values.about_your_business || 'N/A'
    const services = formData.services || values.services || 'N/A'
    const designStyle = formData.designStyle || 'Professional'
    const websiteColors = formData.websiteColors || 'Not selected'
    const hasLogo = formData.hasLogo ? 'Yes, I have a logo' : 'No, I don\'t have a logo'
    const businessHoursSummary = Array.isArray(formData.businessHours)
      ? formData.businessHours
          .map((entry) => (entry.closed ? `${entry.day}: Closed` : `${entry.day}: ${entry.open} - ${entry.close}`))
          .join(' | ')
      : ''

    const payload = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      business: businessName,
      name: businessName,
      city: serviceArea,
      location: serviceArea,
      type: businessType,
      aboutBusiness,
      services,
      designStyle,
      websiteColors,
      hasLogo,
      logo: formData.logo || null,
      businessHours: Array.isArray(formData.businessHours) ? formData.businessHours : [],
      hours: businessHoursSummary || 'Hours not added',
      photos: Array.isArray(formData.uploadedPhotos) ? formData.uploadedPhotos : [],
      submitted: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      status: 'New',
      statusTone: 'bg-[#dfeaf8] text-[#1d5e8b]',
      dot: 'bg-[#1f79d8]',
      unread: true,
      selected: true,
      avatar: businessName
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || '')
        .join('')
        .slice(0, 2) || 'NS',
      avatarBg: 'bg-[#f1e2d7]',
      phone,
      email,
      address,
      source: 'Website Form',
      ownerEmail: user?.email || email,
      userEmail: user?.email || email,
      accountEmail: user?.email || email,
    }

    try {
      setIsSubmitting(true)
      await createSubmissionRecord(payload)
      navigate('/dashboard')
    } catch (error) {
      console.error('Unable to save submission', error)
      setSubmitError('We could not save your submission right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const goToNextStep = () => {
    setActiveStep((current) => Math.min(current + 1, steps.length - 1))
  }

  const goToPreviousStep = () => {
    setActiveStep((current) => Math.max(current - 1, 0))
  }

  const renderBusinessInfo = () => (
    <>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Business name <span className="text-[#e9a272]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">
              ▣
            </span>
            <input
              name="businessName"
              value={formData.businessName}
              onChange={(event) => updateFormData('businessName', event.target.value)}
              className="warm-field py-4 pl-11 pr-4 text-[1.03rem]"
              placeholder="e.g. Acme Studio"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Business type / Industry <span className="text-[#e9a272]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">
              ▣
            </span>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={(event) => updateFormData('businessType', event.target.value)}
              className="warm-field appearance-none py-4 pl-11 pr-10 text-[1.03rem] text-[#f4efe9]"
              defaultValue=""
            >
              <option value="" disabled className="bg-[#201d1b] text-[#f4efe9]">
                Select an industry
              </option>
              <option value="restaurant" className="bg-[#201d1b] text-[#f4efe9]">Restaurant</option>
              <option value="retail" className="bg-[#201d1b] text-[#f4efe9]">Retail</option>
              <option value="service" className="bg-[#201d1b] text-[#f4efe9]">Service</option>
              <option value="healthcare" className="bg-[#201d1b] text-[#f4efe9]">Healthcare</option>
              <option value="professional" className="bg-[#201d1b] text-[#f4efe9]">Professional</option>
            </select>
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg text-[#d7d0c9]">
              ▾
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Tagline / Slogan
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">
              ✦
            </span>
            <input
              name="businessTagline"
              value={formData.businessTagline}
              onChange={(event) => updateFormData('businessTagline', event.target.value)}
              className="warm-field py-4 pl-11 pr-4 text-[1.03rem]"
              placeholder="If you don't have one, we can create one for you."
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Current website (if any)
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">
              🔗
            </span>
            <input
              className="warm-field py-4 pl-11 pr-4 text-[1.03rem]"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
          About your business <span className="text-[#e9a272]">*</span>
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-4 text-[1.12rem] text-[#d7d0c9]">
            ▣
          </span>
          <textarea
            name="aboutBusiness"
            value={formData.aboutBusiness}
            onChange={(event) => updateFormData('aboutBusiness', event.target.value)}
            className="warm-field min-h-[120px] resize-none pl-11 pr-4 pt-4 pb-3 text-[1.03rem]"
            placeholder="Tell us about your company — who you are, when you started, what you do, and your mission."
          />
        </div>
        <div className="mt-2 text-right text-[0.78rem] text-[#d7d0c9]">0/500</div>
      </div>
    </>
  )

  const renderServicesDetails = () => (
    <>
      <div className="mt-8 space-y-8">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            What services or products do you offer? <span className="text-[#e9a272]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-4 text-[1.2rem] text-[#d7d0c9]">
              ✎
            </span>
            <textarea
              name="services"
              value={formData.services}
              onChange={(event) => updateFormData('services', event.target.value)}
              className="warm-field min-h-[94px] resize-none pl-11 pr-4 pt-4 pb-3 text-[1.03rem]"
              placeholder="List your main services or products. Example: interior painting, roofing, counters, catering, coffee & pastries, etc."
            />
          </div>
          <div className="mt-2 text-right text-[0.78rem] text-[#d7d0c9]">0/500</div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
              Is there anything specific you want featured prominently on the website?
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-4 text-[1.2rem] text-[#d7d0c9]">
                ✦
              </span>
              <textarea
                name="highlight"
                value={formData.highlight}
                onChange={(event) => updateFormData('highlight', event.target.value)}
                className="warm-field min-h-[94px] resize-none pl-11 pr-4 pt-4 pb-3 text-[1.03rem]"
                placeholder="Example: a particular service, special offer, online ordering, free estimates, reservations, your phone number, etc."
              />
            </div>
            <div className="mt-2 text-right text-[0.78rem] text-[#d7d0c9]">0/500</div>
          </div>

          <div>
            <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
              Why should customers choose you?
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-4 text-[1.2rem] text-[#d7d0c9]">
                ❤
              </span>
              <textarea
                name="whyChooseYou"
                value={formData.whyChooseYou}
                onChange={(event) => updateFormData('whyChooseYou', event.target.value)}
                className="warm-field min-h-[94px] resize-none pl-11 pr-4 pt-4 pb-3 text-[1.03rem]"
                placeholder="Share what makes you unique..."
              />
            </div>
            <div className="mt-2 text-right text-[0.78rem] text-[#d7d0c9]">0/500</div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2" />
      </div>
    </>
  )

  const designOptions = [
    {
      label: 'Professional',
      description: 'Authoritative. Credible. Polished.',
      style: 'professional',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Playful',
      description: 'Fun. Light-hearted. Engaging.',
      style: 'playful',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Friendly',
      description: 'Warm. Approachable. Helpful.',
      style: 'friendly',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Sophisticated',
      description: 'Refined. Cultured. Elegant.',
      style: 'sophisticated',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Bold',
      description: 'Confident. Direct. Fearless.',
      style: 'bold',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Quirky',
      description: 'Unconventional. Witty. Memorable.',
      style: 'quirky',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: 'Innovative',
      description: 'Forward-thinking. Visionary. Pioneering.',
      style: 'innovative',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
    {
      label: "I'm not sure",
      description: 'You decide the best style for my business.',
      style: 'unsure',
      previews: [
        { name: 'Bold 1', blurb: 'Strong typography with a modern, high-contrast layout.' },
        { name: 'Bold 2', blurb: 'Clean and powerful design with bold messaging.' },
        { name: 'Bold 3', blurb: 'Bold, modern layout with immersive imagery.' },
        { name: 'Bold 4', blurb: 'Modern and energetic with a clean, structured design.' },
      ],
    },
  ]

  const selectedDesignOption = designOptions.find((option) => option.label === formData.designStyle) || designOptions[4]

  const colorPalettes = [
    { label: 'Neutral', swatches: ['#000000', '#3d3d3d', '#767676', '#e9ddd0'] },
    { label: 'Earthy', swatches: ['#203528', '#7f5d42', '#b28955', '#d9c4a7'] },
    { label: 'Coastal', swatches: ['#0b3f5c', '#1e5e7c', '#8ab6c2', '#e7ecea'] },
    { label: 'Natural', swatches: ['#29523c', '#6a7d53', '#a8b88d', '#d7d6c7'] },
    { label: 'Warm', swatches: ['#b76043', '#d8a35d', '#f0d5a6', '#f2e8db'] },
    { label: 'Playful', swatches: ['#db4c42', '#f2a021', '#f7d34a', '#7cc4c5'] },
    { label: 'Modern', swatches: ['#111111', '#5c5c5c', '#d0d0d0', '#f6f1eb'] },
    { label: 'Minimal', swatches: ['#111111', '#8a8a8a', '#dfe0df', '#f4efe9'] },
    { label: 'Bold', swatches: ['#111111', '#ff5c2b', '#ffb000', '#f9efe3'] },
    { label: 'Sophisticated', swatches: ['#2f2a2b', '#4f4a49', '#d2caca', '#efeadf'] },
    { label: 'Luxury', swatches: ['#2d2a24', '#5b4a3b', '#c6a57a', '#f5efe8'] },
    { label: 'Organic', swatches: ['#6e8a6b', '#b0c09a', '#d7d8c6', '#f3efe5'] },
    { label: 'Creative', swatches: ['#5c1e7d', '#ef7f8f', '#efb73d', '#d8e7ea'] },
    { label: 'Tech', swatches: ['#0b2759', '#0e5ea2', '#8fc8fd', '#edf1f6'] },
    { label: 'Rustic', swatches: ['#4e3e2e', '#8b5a2e', '#c19f74', '#eee2d5'] },
    { label: 'Monochrome', swatches: ['#111111', '#363636', '#8c8c8c', '#e4e4e4'] },
  ]

  const selectedColorPalette = colorPalettes.find((palette) => palette.label === formData.websiteColors) || null

  const renderDesignStyle = () => (
    <div className="mt-8 space-y-8 text-[#f4efe9]">
      <div>
        <h3 className="mb-2 text-[1.05rem] font-medium text-[#f4efe9]">
          WHAT KIND OF LOOK DO YOU WANT FOR YOUR WEBSITE? <span className="text-[#e9a272]">*</span>
        </h3>
        <p className="mb-4 text-[0.98rem] text-[#d7d0c9]">
          Select the style that feels closest to your brand.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {designOptions.map((option, index) => {
            const isSelected = formData.designStyle === option.label

            return (
              <button
                key={`${option.label}-${index}`}
                type="button"
                onClick={() => updateFormData('designStyle', option.label)}
                className={`warm-option flex min-h-[112px] w-full items-start justify-between p-4 text-left transition ${isSelected ? 'is-selected' : ''}`}
              >
                <div className="flex-1 pr-4">
                  <div className="text-[1.1rem] font-bold leading-tight tracking-[-0.04em] text-[#f7f4f1]">{option.label}</div>
                  <div className="mt-2 text-[0.92rem] leading-relaxed text-[#d7d0c9]">{option.description}</div>
                </div>
                <span className="warm-radio mt-1 shrink-0" aria-hidden="true" />
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#d7d0c9]">Selected style</p>
            <h4 className="mt-1 text-[2.4rem] font-black leading-none tracking-[-0.07em] text-[#f7f4f1]">{selectedDesignOption.label.toUpperCase()}</h4>
          </div>
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-[0.78rem] font-medium text-[#f7f4f1]">
            4 options
          </span>
        </div>

        <p className="mb-5 text-[1.02rem] leading-relaxed text-[#d7d0c9]">
          Here are a few variations of the {selectedDesignOption.label.toLowerCase()} style. You can choose one, and we&apos;ll customize it for your business.
        </p>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {selectedDesignOption.previews.map((preview, index) => (
            <div key={`${selectedDesignOption.label}-${preview.name}-${index}`} className="overflow-hidden rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)]">
              <div className="relative overflow-hidden rounded-t-[14px] bg-[linear-gradient(135deg,#1e1d1c_0%,#3a3a3d_28%,#a3633a_100%)] p-3">
                <div className="mb-4 flex items-center justify-between text-[0.55rem] uppercase tracking-[0.18em] text-white/80">
                  <span>{selectedDesignOption.label.toUpperCase().slice(0, 3)}</span>
                  <span>HOME</span>
                </div>

                <div className="space-y-2 pb-10 pt-4">
                  <div className="h-4 w-2/3 rounded-full bg-white/80" />
                  <div className="h-3 w-1/2 rounded-full bg-white/50" />
                </div>

                <div className="absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.18))]" />
              </div>

              <div className="p-3">
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border border-white/25 bg-transparent" />
                  <span className="text-[0.98rem] font-semibold text-[#f7f4f1]">{preview.name}</span>
                </div>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-[#d7d0c9]">{preview.blurb}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Are there any websites you like the look of?
          </label>
          <p className="mb-3 text-[0.98rem] text-[#d7d0c9]">
            Paste links to any websites you like. They don&apos;t have to be businesses similar to yours.
          </p>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.12rem] text-[#d7d0c9]">🔗</span>
            <input className="warm-field py-4 pl-11 pr-4 text-[1.03rem]" placeholder="https://..." />
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-2 text-[1rem] font-medium text-[#f4efe9]">
            <span className="text-xl">＋</span> Add another link
          </button>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            What colors would you like on your website?
          </label>
          <p className="mb-3 text-[0.98rem] text-[#d7d0c9]">
            Choose a palette that feels close to your brand. We&apos;ll customize the exact colors for you.
          </p>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {colorPalettes.map((palette) => {
              const isSelected = formData.websiteColors === palette.label

              return (
                <button
                  key={palette.label}
                  type="button"
                  onClick={() => updateFormData('websiteColors', palette.label)}
                  className={`rounded-[16px] border p-3 text-left transition ${
                    isSelected
                      ? 'border-[#d97a49] bg-[rgba(255,255,255,0.06)] shadow-[0_0_0_1px_rgba(217,122,73,0.18)]'
                      : 'border-white/10 bg-[rgba(255,255,255,0.03)] hover:border-white/20'
                  }`}
                >
                  <div className="flex gap-2">
                    {palette.swatches.map((swatch) => (
                      <span
                        key={`${palette.label}-${swatch}`}
                        className="h-10 flex-1 rounded-[6px] border border-white/5"
                        style={{ backgroundColor: swatch }}
                      />
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[1.1rem] font-semibold text-[#f7f4f1]">{palette.label}</span>
                    <span className={`warm-radio ${isSelected ? 'is-selected' : ''}`} aria-hidden="true" />
                  </div>
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => updateFormData('websiteColors', '')}
            className={`mt-4 inline-flex items-center gap-3 rounded-[14px] border px-4 py-3 text-left text-[1rem] font-medium text-[#f4efe9] transition ${
              !selectedColorPalette ? 'border-[#d97a49] bg-[rgba(255,255,255,0.06)]' : 'border-white/10 bg-transparent'
            }`}
          >
            <span className={`warm-radio ${!selectedColorPalette ? 'is-selected' : ''}`} aria-hidden="true" />
            I&apos;m not sure — choose for me
          </button>
        </div>
      </div>
    </div>
  )

  const renderContentMedia = () => (
    <div className="mt-8 space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-2 text-[1.05rem] font-medium text-[#f4efe9]">
            Upload Photos for Your Website
          </h3>
          <p className="mb-4 text-[0.98rem] text-[#d7d0c9]">
            Upload photos of your work, products, team, storefront, restaurant completed projects, or anything else you&apos;d like us to use. Don&apos;t worry about choosing where each photo should go — we&apos;ll handle that.
          </p>

          <input
            id="project-photo-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoUpload}
            className="hidden"
          />

          <label
            htmlFor="project-photo-upload"
            className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-[18px] border-2 border-dashed border-white/15 bg-[rgba(255,255,255,0.03)] px-4 py-6 text-center transition hover:border-[#d97a49] hover:bg-[rgba(255,255,255,0.05)]"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[rgba(255,255,255,0.04)] text-[1.75rem] text-[#f4efe9]">
              ⤴
            </div>
            <p className="text-[1.1rem] font-medium text-[#f4efe9]">Drag and drop photos here</p>
            <p className="mt-1 text-[0.95rem] text-[#d7d0c9]">or click to upload</p>
          </label>

          {formData.uploadedPhotos?.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {formData.uploadedPhotos.slice(0, 6).map((photo, index) => (
                <div key={`${photo.name}-${index}`} className="overflow-hidden rounded-[12px] border border-white/10 bg-[#201d1b]">
                  <img src={photo.dataUrl} alt={`Uploaded project preview ${index + 1}`} className="h-24 w-full object-cover" />
                </div>
              ))}
              {formData.uploadedPhotos.length > 6 && (
                <div className="flex h-24 items-center justify-center rounded-[12px] border border-dashed border-white/15 bg-[rgba(255,255,255,0.03)] text-[0.8rem] font-medium text-[#d7d0c9]">
                  +{formData.uploadedPhotos.length - 6} more
                </div>
              )}
            </div>
          )}

          <p className="mt-3 text-[0.94rem] text-[#d7d0c9]">
            You can upload multiple photos (JPG, PNG, WebP).
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-[1.05rem] font-medium text-[#f4efe9]">
            Do you already have a logo? <span className="text-[#e9a272]">*</span>
          </h3>
          <p className="mb-4 text-[0.98rem] text-[#d7d0c9]">
            If yes, please upload it. If no, we can use text or create a simple logo for you.
          </p>

          <div className="space-y-3">
            {[
              { label: 'Yes, I have a logo', value: true },
              { label: 'No, I don\'t have a logo', value: false },
            ].map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => updateFormData('hasLogo', option.value)}
                className={`warm-option flex w-full items-start gap-3 p-3 text-left ${formData.hasLogo === option.value ? 'is-selected' : ''}`}
              >
                <span className="warm-radio mt-0.5" aria-hidden="true" />
                <span className="flex-1 text-[1rem] text-[#f4efe9]">{option.label}</span>
              </button>
            ))}
          </div>

          {formData.hasLogo && (
            <div className="mt-4 space-y-3 rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-3">
              <input id="brand-logo-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
              <label htmlFor="brand-logo-upload" className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-dashed border-white/15 bg-[rgba(255,255,255,0.03)] p-3">
                <span className="text-[1.15rem] text-[#f4efe9]">⇪</span>
                <span className="text-[1rem] text-[#f4efe9]">Upload logo</span>
              </label>
              <p className="text-[0.9rem] text-[#d7d0c9]">PNG, JPG, or SVG</p>

              {formData.logo?.dataUrl && (
                <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#201d1b] p-3">
                  <img src={formData.logo.dataUrl} alt="Uploaded brand logo" className="mx-auto max-h-28 w-auto object-contain" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-[1.05rem] font-medium text-[#f4efe9]">
          Customer Reviews / Testimonials
        </h3>
        <p className="mb-4 text-[0.98rem] text-[#d7d0c9]">
          Paste any reviews or testimonials you&apos;d like featured on your website. You can also leave this blank.
        </p>

        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.2rem] text-[#d7d0c9]">
            ◌
          </span>
          <input className="warm-field py-4 pl-11 pr-4 text-[1.03rem]" placeholder="Paste reviews or write them here..." />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Are there any websites you like the look of?
          </label>
          <p className="mb-3 text-[0.98rem] text-[#d7d0c9]">
            Paste links to any websites you like. They don&apos;t have to be businesses similar to yours.
          </p>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.12rem] text-[#d7d0c9]">
              🔗
            </span>
            <input className="warm-field py-4 pl-11 pr-4 text-[1.03rem]" placeholder="https://..." />
          </div>
          <button type="button" className="mt-4 inline-flex items-center gap-2 text-[1rem] font-medium text-[#f4efe9]">
            <span className="text-xl">＋</span> Add another link
          </button>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Anything else we should know?
          </label>
          <p className="mb-3 text-[0.98rem] text-[#d7d0c9]">
            Tell us anything else you&apos;d like us to consider while designing your website.
          </p>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-4 text-[1.12rem] text-[#d7d0c9]">
              ✎
            </span>
            <textarea className="warm-field min-h-[110px] resize-none pl-11 pr-4 pt-4 pb-3 text-[1.03rem]" placeholder="Let us know any additional details..." />
          </div>
          <div className="mt-2 text-right text-[0.78rem] text-[#d7d0c9]">0/1000</div>
        </div>
      </div>
    </div>
  )

  const renderContactLocation = () => (
    <div className="mt-8 space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Phone number <span className="text-[#e9a272]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">◔</span>
            <input
              name="phone"
              value={formData.phone}
              onChange={(event) => updateFormData('phone', event.target.value)}
              className="warm-field py-4 pl-11 pr-4 text-[1rem]"
              placeholder="e.g. (845) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Business email <span className="text-[#e9a272]">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">✉</span>
            <input
              name="email"
              value={formData.email}
              onChange={(event) => updateFormData('email', event.target.value)}
              className="warm-field py-4 pl-11 pr-4 text-[1rem]"
              placeholder="e.g. info@yourbusiness.com"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Business address
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.08rem] text-[#d7d0c9]">⌖</span>
            <input
              name="address"
              value={formData.address}
              onChange={(event) => updateFormData('address', event.target.value)}
              className="warm-field py-4 pl-11 pr-4 text-[1rem]"
              placeholder="e.g. 123 Main St, Poughkeepsie, NY 12601"
            />
          </div>
        </div>

        <div />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Business hours
          </label>
          <p className="mb-3 text-[0.9rem] text-[#d7d0c9]">
            Enter your regular business hours. You can add a note if hours vary.
          </p>

          <div className="space-y-3">
            {formData.businessHours.map((entry) => (
              <div key={entry.day} className="flex flex-col gap-3 rounded-[14px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-3 sm:flex-row sm:items-center sm:gap-3 sm:bg-transparent sm:border-0 sm:p-0">
                <div className="flex items-center gap-2 text-[0.98rem] text-[#f4efe9] sm:min-w-[110px]">
                  <span className="text-[1.08rem] text-[#d7d0c9]">◔</span>
                  {entry.day}
                </div>

                <div className="flex flex-col gap-2 sm:flex-1 sm:flex-row sm:items-center">
                  <select
                    value={entry.open}
                    onChange={(event) => updateBusinessHours(entry.day, 'open', event.target.value)}
                    disabled={entry.closed}
                    className="warm-field px-3 py-2.5 text-[0.96rem] sm:min-w-[110px]"
                  >
                    {BUSINESS_HOUR_TIMES.map((time) => (
                      <option key={time} value={time} className="bg-[#201d1b] text-[#f4efe9]">
                        {time}
                      </option>
                    ))}
                  </select>
                  <span className="hidden text-[0.96rem] text-[#d7d0c9] sm:block">–</span>
                  <select
                    value={entry.closed ? 'Closed' : entry.close}
                    onChange={(event) => updateBusinessHours(entry.day, 'close', event.target.value)}
                    disabled={entry.closed}
                    className="warm-field px-3 py-2.5 text-[0.96rem] sm:min-w-[110px]"
                  >
                    {BUSINESS_HOUR_TIMES.filter((time) => BUSINESS_HOUR_TIMES.indexOf(time) >= BUSINESS_HOUR_TIMES.indexOf(entry.open)).map((time) => (
                      <option key={time} value={time} className="bg-[#201d1b] text-[#f4efe9]">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => updateBusinessHours(entry.day, 'closed', !entry.closed)}
                  className={`relative h-6 w-11 self-start rounded-full border transition sm:self-auto ${
                    entry.closed ? 'border-white/20 bg-[rgba(255,255,255,0.06)]' : 'border-[#d97a49] bg-[#d97a49]'
                  }`}
                  aria-label={`Toggle ${entry.day}`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-[#f7f4f1] transition ${
                      entry.closed ? 'left-1' : 'right-1'
                    }`}
                  />
                </button>

                <button type="button" className="self-end text-[1.25rem] leading-none text-[#d7d0c9] sm:self-auto">
                  +
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[1.04rem] font-medium text-[#f4efe9]">
            Social media (optional)
          </label>
          <p className="mb-3 text-[0.9rem] text-[#d7d0c9]">
            Share your social media profiles so we can link them on your site.
          </p>

          <div className="space-y-3">
            {[
              'Instagram username or link',
              'Facebook profile or page link',
              'LinkedIn profile or page link',
              'TikTok username or link',
              'YouTube channel link',
            ].map((label, index) => (
              <div key={label} className="flex flex-col gap-3 rounded-[12px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-3 py-3 sm:flex-row sm:items-center sm:gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-white/10 bg-[rgba(255,255,255,0.03)] text-[0.9rem] text-[#f4efe9] sm:flex-none">
                  {['◎', 'f', 'in', '♪', '▶'][index]}
                </span>
                <input
                  className="w-full min-w-0 bg-transparent text-[0.98rem] text-[#f4efe9] placeholder:text-[#d7d0c9]/60 outline-none"
                  placeholder={label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderReviewSubmit = () => (
    <div className="mt-8">
      <div
        className={`mb-4 rounded-[16px] border px-4 py-3 text-[0.92rem] ${
          canSubmit
            ? 'border-[rgba(42,106,67,0.2)] bg-[rgba(42,106,67,0.08)] text-[#2a6a43]'
            : 'border-[rgba(209,74,60,0.2)] bg-[rgba(209,74,60,0.08)] text-[#8f382d]'
        }`}
      >
        <p className="font-medium">
          {missingRequiredFields.length > 0
            ? `${missingRequiredFields.length} required field${missingRequiredFields.length === 1 ? '' : 's'} still need attention`
            : 'All required fields are filled out'}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <div className="rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.98rem] font-medium text-[#f4efe9]">
              <span className="text-[1.1rem]">▣</span>
              Business Info
            </div>
          </div>
          <div className="space-y-2 text-[0.9rem] text-[#d7d0c9]">
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Business name
                {!isFilled(formData.businessName) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.businessName || 'Not provided yet'}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Business type
                {!isFilled(formData.businessType) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.businessType || 'Not selected yet'}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Tagline
                {!isFilled(formData.businessTagline) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Optional</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.businessTagline || 'No tagline provided'}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                About your business
                {!isFilled(formData.aboutBusiness) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.aboutBusiness || 'Not provided yet'}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.98rem] font-medium text-[#f4efe9]">
              <span className="text-[1.1rem]">≡</span>
              Services &amp; Details
            </div>
          </div>
          <div className="space-y-3 text-[0.9rem] text-[#d7d0c9]">
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Main services
                {!isFilled(formData.services) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.services || 'Not provided yet'}</p>
            </div>
            <div>
              <p className="text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">Featured on website</p>
              <p className="mt-1 text-[#f4efe9]">{formData.highlight || 'No featured item provided'}</p>
            </div>
            <div>
              <p className="text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">Why choose you</p>
              <p className="mt-1 text-[#f4efe9]">{formData.whyChooseYou || 'Not provided yet'}</p>
            </div>
          </div>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.98rem] font-medium text-[#f4efe9]">
              <span className="text-[1.1rem]">◌</span>
              Design &amp; Style
            </div>
          </div>
          <div className="space-y-3 text-[0.9rem] text-[#d7d0c9]">
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Look and feel
                {!isFilled(formData.designStyle) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-[8px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-2 py-1 text-[#f4efe9]">
                  {formData.designStyle || 'Professional'}
                </span>
              </div>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Color theme
                {!isFilled(formData.websiteColors) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 rounded-[12px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-2.5">
                {selectedColorPalette ? (
                  <>
                    <div className="flex gap-1.5">
                      {selectedColorPalette.swatches.map((swatch) => (
                        <span
                          key={`${selectedColorPalette.label}-${swatch}`}
                          className="h-7 w-7 rounded-[6px] border border-white/10"
                          style={{ backgroundColor: swatch }}
                        />
                      ))}
                    </div>
                    <span className="text-[#f4efe9]">{selectedColorPalette.label}</span>
                  </>
                ) : (
                  <span className="text-[#f4efe9]">Not selected yet</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[16px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-3">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[0.98rem] font-medium text-[#f4efe9]">
              <span className="text-[1.1rem]">⌖</span>
              Contact &amp; Location
            </div>
          </div>
          <div className="space-y-2 text-[0.9rem] text-[#d7d0c9]">
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Phone number
                {!isFilled(formData.phone) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.phone || '(845) 000-0000'}</p>
            </div>
            <div>
              <p className="flex items-center gap-2 text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">
                Email
                {!isFilled(formData.email) && <span className="rounded-full bg-[rgba(209,74,60,0.12)] px-2 py-0.5 text-[0.66rem] font-semibold text-[#f3b198]">Required</span>}
              </p>
              <p className="mt-1 text-[#f4efe9]">{formData.email || 'No email provided'}</p>
            </div>
            <div>
              <p className="text-[0.76rem] uppercase tracking-[0.12em] text-[#d7d0c9]">Address</p>
              <p className="mt-1 text-[#f4efe9]">{formData.address || 'No address provided'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderFullForm = () => (
    <div className="space-y-6">
      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            1
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Business Information</h3>
        </div>
        {renderBusinessInfo()}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            2
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Services &amp; Details</h3>
        </div>
        {renderServicesDetails()}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            3
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Design &amp; Style</h3>
        </div>
        {renderDesignStyle()}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            4
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Content &amp; Media</h3>
        </div>
        {renderContentMedia()}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            5
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Contact &amp; Location</h3>
        </div>
        {renderContactLocation()}
      </div>

      <div className="rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-4 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d97a49] text-[0.75rem] font-semibold text-[#fffaf7]">
            6
          </div>
          <h3 className="text-[1.5rem] font-black tracking-[-0.06em] text-[#f7f4f1]">Review &amp; Submit</h3>
        </div>
        {renderReviewSubmit()}
      </div>
    </div>
  )

  return (
    <section className="min-h-screen bg-transparent px-4 py-8 text-[#f4efe9] md:px-8 md:py-10">
      <Helmet>
        <title>Start a project | 845 Sites</title>
        <meta
          name="description"
          content="Start a new website project with 845 Sites."
        />
      </Helmet>

      <div className="mx-auto max-w-[1280px] text-center">
        <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[#d7d0c9]">
          Let&apos;s get started
        </p>
        <h1 className="font-display text-[3.2rem] leading-[0.9] tracking-[-0.08em] text-[#f7f4f1] md:text-[6.1rem]">
          Start your next
          <span className="block">website project</span>
        </h1>
        <p className="mx-auto mt-6 max-w-[760px] text-[1.08rem] leading-relaxed text-[#d7d0c9] md:text-[1.35rem]">
          Tell us about your business and goals, and we&apos;ll help build the right site for you.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-[1260px] rounded-[28px] border border-white/10 bg-[rgba(77,71,68,0.28)] p-4 shadow-[0_24px_60px_rgba(15,17,21,0.12)] backdrop-blur-sm md:p-5">
        <div className="flex-1 px-3 py-4 md:px-8 md:py-7">
          <div className="mb-5 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-[#d7d0c9]">
            Full project form
          </div>

          <h2 className="font-display text-[2.3rem] leading-[0.92] tracking-[-0.07em] text-[#f7f4f1] md:text-[3rem]">
            Tell us about your business
          </h2>

          <p className="mt-3 text-[1.08rem] text-[#d7d0c9]">
            Fill out the details below and we&apos;ll use this information to design your website.
          </p>

          {renderFullForm()}

          {submitError && (
            <div className="mt-6 rounded-[14px] border border-red-400/25 bg-red-500/10 px-4 py-3 text-[0.92rem] text-red-200">
              {submitError}
            </div>
          )}

          <div className="mt-10 flex items-center justify-end border-t border-white/10 pt-6">
            <button
              type="button"
              onClick={handleSubmitProject}
              disabled={!canSubmit || isSubmitting}
              className={`rounded-[16px] px-6 py-3 text-[1.08rem] font-semibold shadow-[0_12px_24px_rgba(17,17,17,0.14)] transition ${
                canSubmit && !isSubmitting
                  ? 'bg-[#d97a49] text-[#fffaf7] hover:bg-[#e18c5f]'
                  : 'cursor-not-allowed bg-[rgba(255,255,255,0.08)] text-[rgba(247,244,241,0.72)] opacity-70'
              }`}
            >
              {isSubmitting ? 'Submitting...' : <>Submit My Information <span aria-hidden="true">→</span></>}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
