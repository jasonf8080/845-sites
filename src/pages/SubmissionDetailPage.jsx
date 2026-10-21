import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  FiArrowLeft,
  FiDownload,
  FiEdit3,
  FiMapPin,
  FiPhone,
  FiClock,
  FiCheck,
  FiGlobe,
  FiInstagram,
  FiFacebook,
  FiLink,
  FiImage,
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { fetchSubmissionById } from '../lib/submissionsStore'

export const SubmissionDetailPage = () => {
  const { isAdmin, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()
  const [submissionData, setSubmissionData] = useState(location.state || null)
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(!location.state && Boolean(id))

  useEffect(() => {
    if (location.state) {
      setSubmissionData(location.state)
      setIsLoadingSubmission(false)
      return undefined
    }

    if (!id) {
      setIsLoadingSubmission(false)
      return undefined
    }

    let isMounted = true

    const loadSubmission = async () => {
      try {
        const record = await fetchSubmissionById(id)
        if (isMounted) {
          setSubmissionData(record)
        }
      } catch (error) {
        if (isMounted) {
          setSubmissionData(null)
        }
      } finally {
        if (isMounted) {
          setIsLoadingSubmission(false)
        }
      }
    }

    loadSubmission()

    return () => {
      isMounted = false
    }
  }, [id, location.state])

  if (loading || isLoadingSubmission) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-16 text-sm font-medium text-[var(--text-soft)]">
        Loading submission...
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />
  }

  const submission = submissionData || {
    business: '',
    city: '',
    type: '',
    submitted: '',
    time: '',
    status: 'New',
    phone: '',
    email: '',
    address: '',
    hours: '',
    aboutBusiness: '',
    services: '',
    highlight: '',
    whyChooseYou: '',
    designStyle: '',
    tagline: '',
  }

  const formatValue = (value, fallback = 'Not added') => {
    if (value === null || value === undefined) return fallback
    const normalized = String(value).trim()
    return normalized ? normalized : fallback
  }

  const statusTone =
    submission.status === 'New'
      ? 'bg-[rgba(130,173,250,0.15)] text-[var(--accent)]'
      : submission.status === 'In Progress'
        ? 'bg-[rgba(130,173,250,0.1)] text-[var(--text)]'
        : 'bg-[rgba(136,196,160,0.16)] text-[#9fd8b7]'

  const statusDot =
    submission.status === 'New'
      ? 'bg-[var(--accent)]'
      : submission.status === 'In Progress'
        ? 'bg-[var(--accent-soft)]'
        : 'bg-[#9fd8b7]'

  return (
    <div className="min-h-screen bg-[var(--app-bg)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-[var(--text)]"
          >
            <FiArrowLeft size={14} />
            Back to submissions
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-[var(--surface-raise)] px-4 py-2.5 text-[0.82rem] font-semibold text-white"
          >
            <FiDownload size={14} />
            Export
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-[2.5rem] font-black leading-none tracking-[-0.08em] text-[var(--text-strong)]">
              {formatValue(submission.business, 'Business not added')}
            </div>
            <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold ${statusTone}`}>
              <span className={`h-2.5 w-2.5 rounded-full ${statusDot}`} />
              {submission.status}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-[10px] border border-white/15 bg-[var(--surface-2)] px-3 py-2 text-[0.82rem] font-medium text-[var(--text)]"
            >
              Mark as In Progress
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-[0.8rem] text-[var(--text-soft)]">
          Submitted on {formatValue(submission.submitted, 'Date not added')} at {formatValue(submission.time, 'Time not added')}
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          {['Form Data', 'Photos (8)', 'Notes (0)', 'History'].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-full px-3 py-2 text-[0.8rem] font-medium ${
                index === 0 ? 'bg-[var(--surface-raise)] text-white' : 'bg-[var(--surface-1)] text-[var(--text-soft)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Business Information</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[var(--surface-2)] px-2 py-1 text-[0.76rem] font-medium text-[var(--text)]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Business name</div>
                  <div className="text-[0.96rem] font-medium text-[var(--text)]">{formatValue(submission.business, 'Business not added')}</div>
                </div>
                <div>
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Business type</div>
                  <div className="text-[0.96rem] font-medium text-[var(--text)]">{formatValue(submission.type, 'Business type not added')}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Tagline / Slogan</div>
                  <div className="text-[0.96rem] font-medium text-[var(--text)]">{formatValue(submission.tagline, 'Tagline not added')}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">About your business</div>
                  <p className="text-[0.9rem] leading-relaxed text-[var(--text-soft)]">
                    {formatValue(submission.aboutBusiness, 'About business not added')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Services &amp; Details</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[var(--surface-2)] px-2 py-1 text-[0.76rem] font-medium text-[var(--text)]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Main services / products</div>
                  <p className="text-[0.9rem] text-[var(--text-soft)]">{formatValue(submission.services, 'Services not added')}</p>
                </div>
                <div>
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Service area</div>
                  <p className="text-[0.9rem] text-[var(--text-soft)]">{formatValue(submission.city || submission.location, 'Service area not added')}</p>
                  <div className="mt-3 flex items-center gap-2 text-[0.9rem] text-[var(--text-soft)]">
                    <FiMapPin size={13} />
                    {formatValue(submission.city || submission.location, 'Location not added')}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Featured on website</div>
                  <p className="text-[0.9rem] text-[var(--text-soft)]">{formatValue(submission.highlight, 'Featured details not added')}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Why should customers choose you?</div>
                  <p className="text-[0.9rem] text-[var(--text-soft)]">{formatValue(submission.whyChooseYou, 'Reason not added')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Content &amp; Media</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[var(--surface-2)] px-2 py-1 text-[0.76rem] font-medium text-[var(--text)]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              {submission.logo?.dataUrl && (
                <div className="mb-4 rounded-[12px] border border-white/12 bg-[var(--surface-2)] p-3">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[var(--text-muted)]">Uploaded logo</div>
                  <img src={submission.logo.dataUrl} alt="Business logo preview" className="mx-auto max-h-24 w-auto object-contain" />
                </div>
              )}

              {Array.isArray(submission.photos) && submission.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {submission.photos.slice(0, 10).map((photo, index) => (
                    <div key={`${photo.name || 'photo'}-${index}`} className="overflow-hidden rounded-[10px] border border-white/12 bg-[var(--surface-0)]">
                      <img src={photo.dataUrl || photo.url || photo} alt={`Project upload ${index + 1}`} className="h-20 w-full object-cover" />
                    </div>
                  ))}
                  {submission.photos.length > 10 && (
                    <div className="flex h-20 items-center justify-center rounded-[10px] border border-dashed border-white/20 bg-[var(--surface-2)] text-[0.8rem] font-medium text-[var(--text-soft)]">
                      +{submission.photos.length - 10} photos
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-3">
                  {[1,2,3,4,5].map((item) => (
                    <div key={item} className="flex h-20 items-center justify-center overflow-hidden rounded-[10px] border border-white/12 bg-[var(--surface-2)] text-[0.7rem] font-semibold text-[var(--text-soft)]">
                      <FiImage size={22} />
                    </div>
                  ))}
                  <div className="flex h-20 items-center justify-center rounded-[10px] border border-dashed border-white/20 bg-[var(--surface-2)] text-[0.8rem] font-medium text-[var(--text-soft)]">
                    + 8 photos
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Contact &amp; Location</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[var(--surface-2)] px-2 py-1 text-[0.76rem] font-medium text-[var(--text)]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-[0.88rem] text-[var(--text-soft)]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[var(--text-muted)]">Phone number</span>
                  <span className="font-medium text-[var(--text)]">{formatValue(submission.phone, 'Phone not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[var(--text-muted)]">Business email</span>
                  <span className="font-medium text-[var(--text)]">{formatValue(submission.email, 'Email not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[var(--text-muted)]">Address</span>
                  <span className="font-medium text-[var(--text)] text-right">{formatValue(submission.address, 'Address not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[var(--text-muted)]">Business hours</span>
                  <span className="font-medium text-[var(--text)] text-right">{formatValue(submission.hours, 'Hours not added')}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Social media</div>
              </div>

              <div className="space-y-2 text-[0.82rem] text-[var(--text-soft)]">
                <div className="flex items-center gap-2"><FiGlobe size={14} /> https://instagram.com/mandysnails</div>
                <div className="flex items-center gap-2"><FiFacebook size={14} /> https://facebook.com/mandysnails</div>
                <div className="flex items-center gap-2"><FiLink size={14} /> https://tiktok.com/@mandysnails</div>
                <div className="flex items-center gap-2"><FiLink size={14} /> https://maps.app.goo.gl/abc123xyz</div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Design &amp; Style</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-[var(--surface-2)] px-2 py-1 text-[0.76rem] font-medium text-[var(--text)]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-[0.9rem] text-[var(--text-soft)]">
                <div className="flex flex-wrap gap-2">
                  {submission.designStyle ? (
                    <span className="rounded-full border border-white/15 bg-[var(--surface-2)] px-2.5 py-1 text-[0.72rem]">
                      {submission.designStyle}
                    </span>
                  ) : (
                    <span className="rounded-full border border-white/15 bg-[var(--surface-2)] px-2.5 py-1 text-[0.72rem] text-[var(--text-soft)]">
                      No style selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-white/12 bg-[var(--surface-1)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[var(--text)]">Additional notes</div>
              </div>
              <p className="text-[0.9rem] text-[var(--text-soft)]">{formatValue(submission.notes || submission.additionalNotes, 'No additional notes added')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
