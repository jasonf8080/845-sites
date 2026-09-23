import { useState } from 'react'
import { FiX } from 'react-icons/fi'
import { StepBusinessDetails } from './StepBusinessDetails'
import { StepPreferences } from './StepPreferences'
import { StepReview } from './StepReview'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

const STEPS = ['Business Details', 'Website Preferences', 'Review & Submit']

const initialFormData = {
  business_name: '',
  contact_name: '',
  contact_phone: '',
  industry: '',
  service_type: 'new_site',
  website_goal: '',
  design_direction: '',
  vision_description: '',
  inspiration_links: '',
  style_preference: '',
  special_features: '',
  inspiration_image_urls: [],
}

export const ProjectFormModal = ({ onClose, onSubmitted }) => {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const updateFields = (fields) => setFormData((prev) => ({ ...prev, ...fields }))

  const goNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length - 1))
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')

    const { error: insertError } = await supabase.from('project_submissions').insert({
      user_id: user.id,
      contact_email: user.email,
      status: 'not_received',
      ...formData,
    })

    setSubmitting(false)

    if (insertError) {
      setError(insertError.message)
      return
    }

    onSubmitted()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8 backdrop-blur-[2px]">
      <div className="relative flex max-h-full w-full max-w-3xl flex-col overflow-y-auto rounded-[1.75rem] border border-[rgba(31,45,61,0.12)] bg-[#f9f7f3] p-6 shadow-[0_30px_80px_rgba(17,24,39,0.12)] md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project form"
          className="absolute right-4 top-4 rounded-full border border-primary/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary transition-colors hover:border-primary"
        >
          Close
        </button>

        <span className="mt-7 text-[11px] font-semibold uppercase tracking-[0.26em] text-primary/60">
          Start a Project &middot; {STEPS[step]} &middot; {step + 1} of {STEPS.length}
        </span>

        {step === 0 && <StepBusinessDetails formData={formData} updateFields={updateFields} onNext={goNext} />}
        {step === 1 && (
          <StepPreferences formData={formData} updateFields={updateFields} onNext={goNext} onBack={goBack} />
        )}
        {step === 2 && (
          <StepReview
            formData={formData}
            contactEmail={user?.email}
            onBack={goBack}
            onSubmit={handleSubmit}
            submitting={submitting}
            error={error}
          />
        )}
      </div>
    </div>
  )
}
