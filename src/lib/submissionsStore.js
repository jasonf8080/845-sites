import { hasSupabaseConfig, supabase } from './supabaseClient'

const SUBMISSIONS_STORAGE_KEY = '845sites_submissions'
const SUBMISSIONS_TABLE = 'submissions'

const readLocalSubmissions = () => {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = JSON.parse(localStorage.getItem(SUBMISSIONS_STORAGE_KEY) || '[]')
    return Array.isArray(saved) ? saved : []
  } catch (error) {
    return []
  }
}

const writeLocalSubmissions = (submissions) => {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submissions))
}

const normalizeEmail = (value) => String(value || '').trim().toLowerCase()

const normalizeStoredSubmission = (submission) => {
  if (!submission) {
    return null
  }

  return {
    ...submission,
    ownerEmail: submission.ownerEmail || submission.userEmail || submission.accountEmail || submission.email || '',
    userEmail: submission.userEmail || submission.ownerEmail || submission.email || '',
    accountEmail: submission.accountEmail || submission.ownerEmail || submission.email || '',
  }
}

const normalizeSupabaseRow = (row) => {
  if (!row) {
    return null
  }

  const payload = row.payload && typeof row.payload === 'object' ? row.payload : {}

  return {
    ...payload,
    id: row.id ?? payload.id ?? '',
    ownerEmail: row.owner_email ?? payload.ownerEmail ?? payload.owner_email ?? '',
    userEmail: row.user_email ?? payload.userEmail ?? payload.user_email ?? '',
    accountEmail: row.account_email ?? payload.accountEmail ?? payload.account_email ?? '',
    createdAt: row.created_at ?? payload.createdAt ?? '',
  }
}

const getSupabaseClient = () => {
  if (!hasSupabaseConfig || !supabase) {
    return null
  }

  return supabase
}

export const fetchSubmissions = async () => {
  const client = getSupabaseClient()

  if (!client) {
    return readLocalSubmissions().map(normalizeStoredSubmission).filter(Boolean)
  }

  const { data, error } = await client.from(SUBMISSIONS_TABLE).select('*').order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data || []).map(normalizeSupabaseRow).filter(Boolean)
}

export const fetchSubmissionById = async (id) => {
  if (!id) {
    return null
  }

  const client = getSupabaseClient()

  if (!client) {
    return fetchSubmissions().then((submissions) => submissions.find((submission) => String(submission.id) === String(id)) || null)
  }

  const { data, error } = await client.from(SUBMISSIONS_TABLE).select('*').eq('id', id).maybeSingle()

  if (error) {
    throw error
  }

  return normalizeSupabaseRow(data)
}

export const hasSubmissionForEmail = async (email) => {
  const normalizedEmail = normalizeEmail(email)

  if (!normalizedEmail) {
    return false
  }

  const submissions = await fetchSubmissions()

  return submissions.some((submission) => {
    const submissionEmails = [
      submission.ownerEmail,
      submission.userEmail,
      submission.email,
      submission.accountEmail,
    ].filter(Boolean)

    return submissionEmails.some((submissionEmail) => normalizeEmail(submissionEmail) === normalizedEmail)
  })
}

export const createSubmissionRecord = async (submission) => {
  const normalizedSubmission = normalizeStoredSubmission(submission)
  const client = getSupabaseClient()

  if (!client) {
    const localSubmissions = readLocalSubmissions()
    const storedSubmission = {
      ...normalizedSubmission,
      id: normalizedSubmission.id || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    }

    writeLocalSubmissions([storedSubmission, ...localSubmissions])
    return storedSubmission
  }

  const payload = {
    ...normalizedSubmission,
    ownerEmail: normalizedSubmission.ownerEmail || '',
    userEmail: normalizedSubmission.userEmail || '',
    accountEmail: normalizedSubmission.accountEmail || '',
  }

  const { data, error } = await client
    .from(SUBMISSIONS_TABLE)
    .insert([
      {
        owner_email: payload.ownerEmail || null,
        user_email: payload.userEmail || null,
        account_email: payload.accountEmail || null,
        payload,
      },
    ])
    .select('*')
    .single()

  if (error) {
    throw error
  }

  return normalizeSupabaseRow(data)
}