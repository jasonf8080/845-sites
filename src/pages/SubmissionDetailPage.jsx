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
      <div className="flex min-h-[50vh] items-center justify-center px-6 py-16 text-sm font-medium text-[#5d5c57]">
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
      ? 'bg-[#dfeaf8] text-[#1d5e8b]'
      : submission.status === 'In Progress'
        ? 'bg-[#f4e4c9] text-[#986d2d]'
        : 'bg-[#dceee0] text-[#2a6a43]'

  const statusDot =
    submission.status === 'New'
      ? 'bg-[#1f79d8]'
      : submission.status === 'In Progress'
        ? 'bg-[#cf8f14]'
        : 'bg-[#4ea66a]'

  return (
    <div className="min-h-screen bg-[#f2f0ee] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-[#1a1b1d]"
          >
            <FiArrowLeft size={14} />
            Back to submissions
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-[10px] border border-[#171717] bg-[#171717] px-4 py-2.5 text-[0.82rem] font-semibold text-white"
          >
            <FiDownload size={14} />
            Export
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-[2.5rem] font-black leading-none tracking-[-0.08em] text-[#171717]">
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
              className="rounded-[10px] border border-[#d7d4ce] bg-[#f8f6f3] px-3 py-2 text-[0.82rem] font-medium text-[#1d1d1b]"
            >
              Mark as In Progress
            </button>
          </div>
        </div>

        <div className="mb-4 flex items-center gap-2 text-[0.8rem] text-[#676661]">
          Submitted on {formatValue(submission.submitted, 'Date not added')} at {formatValue(submission.time, 'Time not added')}
        </div>

        <div className="mb-5 flex flex-wrap items-center gap-2">
          {['Form Data', 'Photos (8)', 'Notes (0)', 'History'].map((tab, index) => (
            <button
              key={tab}
              type="button"
              className={`rounded-full px-3 py-2 text-[0.8rem] font-medium ${
                index === 0 ? 'bg-[#171717] text-white' : 'bg-[#f3f1ee] text-[#5d5c57]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
          <div className="space-y-5">
            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Business Information</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#d8d4ce] bg-[#f8f6f2] px-2 py-1 text-[0.76rem] font-medium text-[#171717]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Business name</div>
                  <div className="text-[0.96rem] font-medium text-[#171717]">{formatValue(submission.business, 'Business not added')}</div>
                </div>
                <div>
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Business type</div>
                  <div className="text-[0.96rem] font-medium text-[#171717]">{formatValue(submission.type, 'Business type not added')}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Tagline / Slogan</div>
                  <div className="text-[0.96rem] font-medium text-[#171717]">{formatValue(submission.tagline, 'Tagline not added')}</div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-1 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">About your business</div>
                  <p className="text-[0.9rem] leading-relaxed text-[#3f3d39]">
                    {formatValue(submission.aboutBusiness, 'About business not added')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Services &amp; Details</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#d8d4ce] bg-[#f8f6f2] px-2 py-1 text-[0.76rem] font-medium text-[#171717]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Main services / products</div>
                  <p className="text-[0.9rem] text-[#36352f]">{formatValue(submission.services, 'Services not added')}</p>
                </div>
                <div>
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Service area</div>
                  <p className="text-[0.9rem] text-[#36352f]">{formatValue(submission.city || submission.location, 'Service area not added')}</p>
                  <div className="mt-3 flex items-center gap-2 text-[0.9rem] text-[#4a4944]">
                    <FiMapPin size={13} />
                    {formatValue(submission.city || submission.location, 'Location not added')}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Featured on website</div>
                  <p className="text-[0.9rem] text-[#36352f]">{formatValue(submission.highlight, 'Featured details not added')}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Why should customers choose you?</div>
                  <p className="text-[0.9rem] text-[#36352f]">{formatValue(submission.whyChooseYou, 'Reason not added')}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Content &amp; Media</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#d8d4ce] bg-[#f8f6f2] px-2 py-1 text-[0.76rem] font-medium text-[#171717]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              {submission.logo?.dataUrl && (
                <div className="mb-4 rounded-[12px] border border-[#e1ddd6] bg-white p-3">
                  <div className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-[#6c6a65]">Uploaded logo</div>
                  <img src={submission.logo.dataUrl} alt="Business logo preview" className="mx-auto max-h-24 w-auto object-contain" />
                </div>
              )}

              {Array.isArray(submission.photos) && submission.photos.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
                  {submission.photos.slice(0, 10).map((photo, index) => (
                    <div key={`${photo.name || 'photo'}-${index}`} className="overflow-hidden rounded-[10px] border border-[#e1ddd6] bg-[#f2f0ee]">
                      <img src={photo.dataUrl || photo.url || photo} alt={`Project upload ${index + 1}`} className="h-20 w-full object-cover" />
                    </div>
                  ))}
                  {submission.photos.length > 10 && (
                    <div className="flex h-20 items-center justify-center rounded-[10px] border border-dashed border-[#d0c9c3] bg-[#f3f1ee] text-[0.8rem] font-medium text-[#5d5c57]">
                      +{submission.photos.length - 10} photos
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-5 gap-3">
                  {[1,2,3,4,5].map((item) => (
                    <div key={item} className="flex h-20 items-center justify-center overflow-hidden rounded-[10px] border border-[#e1ddd6] bg-[linear-gradient(135deg,#f7dfe6,#e4d7cf)] text-[0.7rem] font-semibold text-[#3d3c39]">
                      <FiImage size={22} />
                    </div>
                  ))}
                  <div className="flex h-20 items-center justify-center rounded-[10px] border border-dashed border-[#d0c9c3] bg-[#f3f1ee] text-[0.8rem] font-medium text-[#5d5c57]">
                    + 8 photos
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Contact &amp; Location</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#d8d4ce] bg-[#f8f6f2] px-2 py-1 text-[0.76rem] font-medium text-[#171717]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-[0.88rem] text-[#474540]">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#676661]">Phone number</span>
                  <span className="font-medium text-[#171717]">{formatValue(submission.phone, 'Phone not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#676661]">Business email</span>
                  <span className="font-medium text-[#171717]">{formatValue(submission.email, 'Email not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#676661]">Address</span>
                  <span className="font-medium text-[#171717] text-right">{formatValue(submission.address, 'Address not added')}</span>
                </div>
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[#676661]">Business hours</span>
                  <span className="font-medium text-[#171717] text-right">{formatValue(submission.hours, 'Hours not added')}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Social media</div>
              </div>

              <div className="space-y-2 text-[0.82rem] text-[#4a4944]">
                <div className="flex items-center gap-2"><FiGlobe size={14} /> https://instagram.com/mandysnails</div>
                <div className="flex items-center gap-2"><FiFacebook size={14} /> https://facebook.com/mandysnails</div>
                <div className="flex items-center gap-2"><FiLink size={14} /> https://tiktok.com/@mandysnails</div>
                <div className="flex items-center gap-2"><FiLink size={14} /> https://maps.app.goo.gl/abc123xyz</div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Design &amp; Style</div>
                <button type="button" className="inline-flex items-center gap-1 rounded-full border border-[#d8d4ce] bg-[#f8f6f2] px-2 py-1 text-[0.76rem] font-medium text-[#171717]">
                  <FiEdit3 size={12} />
                  Edit
                </button>
              </div>

              <div className="space-y-3 text-[0.9rem] text-[#2e2d2a]">
                <div className="flex flex-wrap gap-2">
                  {submission.designStyle ? (
                    <span className="rounded-full border border-[#d6d2cc] bg-white px-2.5 py-1 text-[0.72rem]">
                      {submission.designStyle}
                    </span>
                  ) : (
                    <span className="rounded-full border border-[#d6d2cc] bg-white px-2.5 py-1 text-[0.72rem] text-[#5d5c57]">
                      No style selected
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[14px] border border-[#e4dfd9] bg-[#f6f4f2] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[1.1rem] font-semibold text-[#171717]">Additional notes</div>
              </div>
              <p className="text-[0.9rem] text-[#36352f]">{formatValue(submission.notes || submission.additionalNotes, 'No additional notes added')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
