import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { supabase } from '../../lib/supabaseClient'
import { useAuth } from '../../context/AuthContext'
import { ProjectFormModal } from '../ProjectForm'
import { ProjectCard } from './ProjectCard'

export const ClientDashboard = () => {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

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
      .channel('client-project-submissions')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'project_submissions', filter: `user_id=eq.${user.id}` },
        () => fetchSubmissions()
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id])

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">Your Projects</h1>
          <p className="mt-2 text-base md:text-lg leading-relaxed text-gray-600">
            Track the status of every project you've submitted to 845 Sites.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-semibold text-white"
        >
          <FiPlus aria-hidden="true" /> Start New Project
        </button>
      </div>

      {loading && <p className="text-base text-gray-500">Loading your projects…</p>}

      {!loading && submissions.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-base md:text-lg text-gray-600">You haven't submitted a project yet.</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {submissions.map((submission) => (
          <ProjectCard key={submission.id} submission={submission} />
        ))}
      </div>

      {showForm && (
        <ProjectFormModal
          onClose={() => setShowForm(false)}
          onSubmitted={() => {
            setShowForm(false)
            fetchSubmissions()
          }}
        />
      )}
    </section>
  )
}
