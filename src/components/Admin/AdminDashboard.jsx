import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { SubmissionList } from './SubmissionList'
import { SubmissionDetail } from './SubmissionDetail'

export const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState(null)

  const fetchSubmissions = async () => {
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setSubmissions(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSubmissions()

    const channel = supabase
      .channel('admin-project-submissions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'project_submissions' }, () => fetchSubmissions())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const selectedSubmission = submissions.find((submission) => submission.id === selectedId) || null

  const handleStatusChange = async (id, status) => {
    setSubmissions((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    await supabase.from('project_submissions').update({ status }).eq('id', id)
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-6xl flex-col gap-8 px-6 py-16">
      <div>
        <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">Project Submissions</h1>
        <p className="mt-2 text-base md:text-lg leading-relaxed text-gray-600">
          Review incoming project requests and update their status.
        </p>
      </div>

      {loading && <p className="text-base text-gray-500">Loading submissions…</p>}

      {!loading && submissions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-base md:text-lg text-gray-600">No project submissions yet.</p>
        </div>
      )}

      {!loading && submissions.length > 0 && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr]">
          <SubmissionList
            submissions={submissions}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onStatusChange={handleStatusChange}
          />
          {selectedSubmission && (
            <SubmissionDetail submission={selectedSubmission} onStatusChange={handleStatusChange} />
          )}
        </div>
      )}
    </section>
  )
}
