import { useState } from 'react'
import { DESIGN_DIRECTION_OPTIONS, STYLE_OPTIONS } from '../../data'
import { supabase } from '../../lib/supabaseClient'

const MAX_IMAGES = 15

export const StepPreferences = ({ formData, updateFields, onNext, onBack }) => {
  const {
    website_goal,
    design_direction,
    vision_description,
    inspiration_links,
    style_preference,
    special_features,
    inspiration_image_urls,
  } = formData

  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files || [])
    if (!files.length) return

    if (inspiration_image_urls.length + files.length > MAX_IMAGES) {
      setUploadError(`You can upload up to ${MAX_IMAGES} images total.`)
      event.target.value = ''
      return
    }

    setUploading(true)
    setUploadError('')

    const uploadedUrls = []

    for (const file of files) {
      const filePath = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error: uploadErr } = await supabase.storage.from('inspiration-images').upload(filePath, file)

      if (uploadErr) {
        setUploadError(uploadErr.message)
        continue
      }

      const { data } = supabase.storage.from('inspiration-images').getPublicUrl(filePath)
      uploadedUrls.push(data.publicUrl)
    }

    if (uploadedUrls.length) {
      updateFields({ inspiration_image_urls: [...inspiration_image_urls, ...uploadedUrls] })
    }

    setUploading(false)
    event.target.value = ''
  }

  return (
    <div className="mt-6 flex flex-col gap-6">
      <h2 className="text-3xl md:text-4xl font-bold leading-tight text-primary">Shape your website.</h2>
      <p className="text-base md:text-lg leading-relaxed text-gray-600">
        Share your goals and the visual direction that feels right for your business.
      </p>

      <label className="flex flex-col gap-1 text-sm md:text-base text-gray-700">
        What should your website help you accomplish?
        <textarea
          rows={2}
          value={website_goal}
          onChange={(event) => updateFields({ website_goal: event.target.value })}
          placeholder="For example: build trust, showcase services, and bring in more calls."
          className="resize-none border-b border-gray-300 bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </label>

      <div className="flex flex-col gap-3">
        <span className="text-sm md:text-base font-semibold uppercase tracking-wide text-gray-500">Design Direction</span>
        {DESIGN_DIRECTION_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-base md:text-lg ${
              design_direction === option.value ? 'border-accent bg-accent/5' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="design_direction"
              value={option.value}
              checked={design_direction === option.value}
              onChange={(event) => updateFields({ design_direction: event.target.value })}
              className="h-4 w-4 accent-accent"
            />
            {option.label}
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-1 text-sm md:text-base text-gray-700">
        Describe the look and feeling you'd like
        <textarea
          rows={3}
          value={vision_description}
          onChange={(event) => updateFields({ vision_description: event.target.value })}
          placeholder="Describe the mood, colors, personality, or overall impression you want your website to create."
          className="resize-none border-b border-gray-300 bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm md:text-base text-gray-700">
        Inspiration <span className="font-normal normal-case text-gray-400">(optional)</span>
        <textarea
          rows={2}
          value={inspiration_links}
          onChange={(event) => updateFields({ inspiration_links: event.target.value })}
          placeholder="Paste links to websites, brands, or other visual references you like."
          className="resize-none border-b border-gray-300 bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </label>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <label className="inline-flex w-fit cursor-pointer items-center rounded-full bg-primary px-5 py-2 text-sm md:text-base font-semibold text-white">
          {uploading ? 'Uploading…' : 'Upload Inspiration Images'}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            onChange={handleImageUpload}
            disabled={uploading}
          />
        </label>
        <span className="text-sm text-gray-500">
          {inspiration_image_urls.length} / {MAX_IMAGES} images uploaded
        </span>
        {uploadError && (
          <p className="text-sm text-red-600" role="alert">
            {uploadError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm md:text-base font-semibold uppercase tracking-wide text-gray-500">Suggested Style</span>
        {STYLE_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-base md:text-lg ${
              style_preference === option.value ? 'border-accent bg-accent/5' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="style_preference"
              value={option.value}
              checked={style_preference === option.value}
              onChange={(event) => updateFields({ style_preference: event.target.value })}
              className="h-4 w-4 accent-accent"
            />
            {option.label}
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-1 text-sm md:text-base text-gray-700">
        Special Features or Functionality <span className="font-normal normal-case text-gray-400">(optional)</span>
        <textarea
          rows={2}
          value={special_features}
          onChange={(event) => updateFields({ special_features: event.target.value })}
          placeholder="For example: booking, an online store, advanced forms, or another specialized request."
          className="resize-none border-b border-gray-300 bg-transparent py-2 focus:border-accent focus:outline-none"
        />
      </label>

      <div className="mt-4 flex justify-between">
        <button type="button" onClick={onBack} className="text-base font-semibold text-gray-500 hover:text-primary">
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-primary px-8 py-3 text-base font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
